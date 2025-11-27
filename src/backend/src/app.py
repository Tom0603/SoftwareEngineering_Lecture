import os
from datetime import datetime, timedelta
import base64

from supabase import create_client, Client
from flask import Flask, request
from flask_cors import CORS
from rapidfuzz.fuzz import ratio


from apscheduler.schedulers.background import BackgroundScheduler


PORT: int = int(os.environ.get("PORT"))
FRONTEND_ENDPOINT: str = os.environ.get("FRONTEND_ENDPOINT")

SUPABASE_URL: str = os.environ.get("SUPABASE_URL")
SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app: Flask = Flask(__name__)
CORS(app, origins=[FRONTEND_ENDPOINT])

# Synonym dictionary for duplicate detection
SYNONYMS = {
    # Electronics
    "handy": ["smartphone", "telefon", "iphone", "android"],
    "smartphone": ["handy", "telefon"],
    "laptop": ["notebook", "rechner"],
    "tablet": ["ipad"],
    "kopfhörer": ["ohrhörer", "stöpsel"],
    "ladekabel": ["ladegerät", "netzteil"],

    # Bags & Luggage
    "geldbeutel": ["portemonnaie", "börse", "wallet"],
    "tasche": ["handtasche", "beutel"],

    # Clothing
    "jacke": ["mantel"],
    "schal": ["tuch"],
    "mütze": ["kappe"],
    "schuhe": ["sneaker"],

    # Accessories
    "brille": ["lesebrille", "sonnenbrille"],
    "sonnenbrille": ["brille"],
    "uhr": ["armbanduhr"],

    # Documents
    "ausweis": ["studentenausweis", "id"],
    "unterlagen": ["dokumente", "papiere"],
    "notizbuch": ["heft", "block"],

    # Jewelry
    "kette": ["halskette"],

    # Keys
    "schlüssel": ["schlüsselbund"],

    # Others
    "stift": ["kugelschreiber", "kuli"],
    "flasche": ["trinkflasche"]
}


@app.get("/listings")
def get_listings():
    """
    GET /listings
    
    Fetch all records from the "listings" table and attach according base64-encoded PNG image (if present) for each record.

    Response
    --------
    200 - list of listings objects:
    [
        {
            "uuid": (str),
            "type": (str),
            "created_at": (str),
            "title": (str),
            "description": (str),
            "room": (str),
            "category": (str),
            "contact_email": (str | null),
            "b64_image": (str | null)       # "data:image/png;base64,..."
        },
        ...
    ]
    """
    
    try:
        response_table = (
            supabase.table("listings")
            .select("*")
            .execute()
        )
        
        all_listings: list = response_table.data
        
        for listing in all_listings:
            listing["b64_image"] = None
            try:
                # Download according image and add to listing if present
                image_bin: bytes = (
                    supabase.storage
                    .from_("images")
                    .download(f"{listing['uuid']}.png")
                )
                listing["b64_image"] = "data:image/png;base64," + base64.b64encode(image_bin).decode('utf-8')
            except Exception:
                pass
            
    except Exception:
        return {"error": "Error while trying to read from database"}, 400

    return all_listings, 200


@app.get("/listings/<uuid>")
def get_listing_by_uuid(uuid: str):
    """
    GET /listings
    
    Fetch specific record from the "listings" table by uuid and attach according base64-encoded PNG image (if present).
    
    Parameters
    ----------
    uuid : str
        UUID of the listing to get.

    Response
    --------
    200 - listing object:
    {
        "uuid": (str),
        "type": (str),
        "created_at": (str),
        "title": (str),
        "description": (str),
        "room": (str),
        "category": (str),
        "contact_email": (str | null),
        "b64_image": (str | null)       # "data:image/png;base64,..."
    },
    """
    
    try:
        response_table = (
            supabase.table("listings")
            .select("*")
            .eq("uuid", uuid)
            .execute()
        )
        
        if len(response_table.data) == 0:
            return {"error": "listing does not exist"}, 404
        
        listing: list = response_table.data[0]
        listing["b64_image"] = None
        
        try:
            # Download according image and add to listing if present
            image_bin: bytes = (
                supabase.storage
                .from_("images")
                .download(f"{listing['uuid']}.png")
            )
            listing["b64_image"] = "data:image/png;base64," + base64.b64encode(image_bin).decode('utf-8')
        except Exception:
            pass
        
    except Exception:
        return {"error": "Error while trying to read from database"}, 400

    return listing, 200


@app.post("/listings")
def create_listing():
    """
    POST /listings
    
    
    Creates a new listing entry and optionally uploads an associated PNG image.
    Before insertion, the API checks for potential duplicates unless the request
    is forced via the query parameter `?force=true`.

    Duplicate Detection
    -------------------
    A listing is considered a potential duplicate if:

    - The **room** is identical, AND
    - The **category** is identical, AND
    - EITHER:
        • The title similarity (Levenshtein ratio) > 0.7, OR
        • The normalized and synonym-expanded word sets share at least one common term.

    If duplicates are detected and `force=true` is not provided,
    the operation is aborted and a 409 response is returned.

    Query Parameters
    ----------------
    force : bool (optional)
        - If set to true, skips the duplicate check.
        Example: POST /listings?force=true

    Request Body (application/json)
    -------
    JSON body (application/json)
    {
        "type": (str),
        "created_at": (str) - "YYYY-MM-DD",
        "title": (str),
        "description": (str),
        "room": (str),
        "category": (str),
        "contact_email": (str | null),
        "b64_image": (str | null)        # "data:image/png;base64,...."
    }

    Response
    ---------
    201 - the newly created listing object:
    {
        "uuid": (str)
        "type": (str),
        "created_at": (str),
        "title": (str),
        "description": (str),
        "room": (str),
        "category": (str),
        "contact_email": (str | null)
    }

    400 Bad Request:
    {
        "error": "Missing required fields"
    }
    OR
    {
        "error": "Error while trying to add to database"
    }

    409 Conflict – Duplicate detected:
    {
        "duplicate": true,
        "matches": [ ... existing listings ... ]
    }
    """
    
    data_body: dict = request.get_json()

    type: str | None = data_body.get("type")

    created_at: str | None = data_body.get("created_at")
    if created_at:
        created_at = datetime.strptime(created_at, "%Y-%m-%d").isoformat()
    
    title: str | None = data_body.get("title")
    description: str | None = data_body.get("description")
    room: str | None = data_body.get("room")
    category: str | None = data_body.get("category")
    contact_email: str | None = data_body.get("contact_email")
    b64_image: str | None = data_body.get("b64_image")

    if not all([type, created_at, title, description, room, category]):
        return {"error": "Missing required fields"}, 400
    
    
    # duplikates check
    # if force query param is not set to true, check for potential duplicates. If any found, stop execution and return them.
    force = request.args.get("force") == "true"

    if not force:
        # get all existing listings
        existing = supabase.table("listings").select("*").execute().data

        duplicates = []
        # check for potential duplicates
        for ex in existing:
            if is_potential_duplicate(data_body, ex):
                duplicates.append(ex)

        if duplicates:
            # stop execution and return found duplicates
            return {
                "duplicate": True,
                "matches": duplicates
            }, 409
        
        
    # try publishing new listing
    try:
        # Insert new listing
        response_table = (
            supabase.table("listings")
            .insert({
                "created_at": created_at,
                "type": type,
                "title": title,
                "description": description,
                "room": room,
                "category": category,
                "contact_email": contact_email
            })
            .execute()
        )
    except Exception:
        return {"error": "Error while trying to add to database"}, 400
    
    new_listing: dict = response_table.data[0]
    
    try:
        if b64_image:
            # Upload image to storage with uuid as name
            supabase.storage.from_("images") \
                .upload(
                    file=base64.b64decode(b64_image.split("base64,")[1]),
                    path=f"{new_listing['uuid']}.png",
                    file_options={"content-type": "image/png"}
                )
    except Exception:
        return {"error": "Error while trying to upload image to database"}, 400

    return new_listing, 201


# helpers for duplicate detection
# checks if two titles are similar enough to be considered duplicates
# using Levenshtein distance and word matching with synonyms
def is_potential_duplicate(new, existing):

    # Exact match on room and category required
    if new.get("room") != existing.get("room"):
        return False
    if new.get("category") != existing.get("category"):
        return False

    # check Levenshtein ratio between titles
    score = ratio(new["title"].lower(), existing["title"].lower())

    # check wether similarity score is above threshold
    if score > 0.7:
        return True

    # compare words in titles with synonyms
    new_words = expand_synonyms(normalize_words(new["title"]))
    ex_words = expand_synonyms(normalize_words(existing["title"]))

    if new_words.intersection(ex_words):
        return True

    return False


# helperfunktions for duplicate detection
# split text into words and normalize them (lowercase)
def normalize_words(text: str):
    return [w.lower() for w in text.split()]


# helperfunktions for duplicate detection
# adds synonyms to a set of words using a predefined synonym dictionary
# this helps to catch duplicates that use different words with similar meanings
def expand_synonyms(words):
    expanded = set(words)
    for w in words:
        if w in SYNONYMS:
            expanded.update(SYNONYMS[w])
    return expanded



@app.delete("/listings/<uuid>")
def delete_listing(uuid: str):
    """
    DELETE /listings/<uuid>

    Delete a single listing row by its uuid and remove its associated PNG image from storage (if present).

    Parameters
    ----------
    uuid : str
        UUID of the listing to delete.

    Responses
    ---------
    200
    """
    
    try:
        # Delete listing row from table
        supabase.table("listings").delete().eq("uuid", uuid).execute()
    except Exception:
        return {"error": "Error while trying to delete from database"}, 400
        
    try:
        # Delete according image from storage
        supabase.storage.from_("images").remove([f"{uuid}.png"])
    except Exception:
        return {"error": "Error while trying to delete image from database"}, 400

    return {}, 200


def delete_old_listings(older_than_days: int = 14):
    """
    Delete all listings, older than given number of days.
    
    Parameters
    ----------
    older_than_days : int
    """
    
    try:
        cutoff_date = (datetime.now() - timedelta(days=older_than_days)).isoformat()
        # Delete rows created before from table
        supabase.table("listings").delete().lt("created_at", cutoff_date).execute()
        print(f"[INFO] {datetime.now().isoformat()} : Deleted listings older than {older_than_days} days.")
    except Exception:
        pass
    
    
if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    scheduler.add_job(delete_old_listings, "cron", hour=7, minute=00, timezone="Europe/Berlin")
    scheduler.start()
    
    app.run(host="0.0.0.0", port=PORT)
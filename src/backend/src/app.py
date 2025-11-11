import os
from datetime import datetime, timedelta
import base64

from supabase import create_client, Client
from flask import Flask, request
from flask_cors import CORS

from apscheduler.schedulers.background import BackgroundScheduler


PORT: int = int(os.environ.get("PORT"))
FRONTEND_ENDPOINT: str = os.environ.get("FRONTEND_ENDPOINT")

SUPABASE_URL: str = os.environ.get("SUPABASE_URL")
SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app: Flask = Flask(__name__)
CORS(app, origins=[FRONTEND_ENDPOINT])


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
    
    Create a new record in the "listings" table and optionally upload a PNG image to storage.
    `
    Request
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
    """
    
    data_body: dict = request.get_json()

    type: str | None = data_body.get("type")

    created_at: str | None = data_body.get("created_at")
    if created_at: created_at: str | None = datetime.strptime(created_at, "%Y-%m-%d").isoformat()
    
    title: str | None = data_body.get("title")
    description: str | None = data_body.get("description")
    room: str | None = data_body.get("room")
    category: str | None = data_body.get("category")
    contact_email: str | None = data_body.get("contact_email")
    b64_image: str | None = data_body.get("b64_image")

    if not all([type, created_at, title, description, room, category]):
        return {"error": "Missing required fields"}, 400

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
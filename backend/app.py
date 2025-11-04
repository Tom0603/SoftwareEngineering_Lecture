import os
from datetime import datetime
import base64
from dotenv import load_dotenv

from supabase import create_client, Client
from flask import Flask, request
from flask_cors import CORS


load_dotenv()
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app: Flask = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])


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
        "type": str,
        "created_at": "YYYY-MM-DD",
        "title": str,
        "description": str,
        "room": str,
        "category": (str),
        "contact_email": (str | null),
        "image_b64": (str | null)        # "data:image/png;base64,...."
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
    created_at: str | None = datetime.strptime(data_body.get("created_at"), "%Y-%m-%d").isoformat()
    title: str | None = data_body.get("title")
    description: str | None = data_body.get("description")
    room: str | None = data_body.get("room")
    category: str | None = data_body.get("category")
    contact_email: str | None = data_body.get("contact_email")
    image_b64: str | None = data_body.get("image_b64")

    if not any([type, created_at, title, description, room, category]):
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
        if image_b64:
            # Upload image to storage with uuid as name
            supabase.storage.from_("images") \
                .upload(
                    file=base64.b64decode(image_b64.split("base64,")[1]),
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
    200:
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
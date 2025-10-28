import os
from datetime import datetime
import base64
from dotenv import load_dotenv

from supabase import create_client, Client
from flask import Flask, request


load_dotenv()
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app: Flask = Flask(__name__)


@app.get("/anzeigen")
def get_anzeigen():
    """
    GET /anzeigen
    
    Fetch all records from the "anzeigen" table and attach a base64-encoded PNG image (if present) for each record.

    Response
    --------
    200 - list of anzeigen objects:
    [
        {
            "uuid": (str),
            "art": (str),
            "aufgegeben_am": (str),
            "titel": (str),
            "beschreibung": (str),
            "raum": (str),
            "kategorie": (str | null),
            "kontakt_email": (str | null),
            "b64_bild": Optional[str]       # "data:image/png;base64,...", or None if not available
        },
        ...
    ]
    """
    
    try:
        response_table = (
            supabase.table("anzeigen")
            .select("*")
            .execute()
        )
        
        all_anzeigen: list = response_table.data
        
        for anzeige in all_anzeigen:
            anzeige["b64_bild"] = None
            try:
                image_bin: bytes = (
                    supabase.storage
                    .from_("images")
                    .download(f"{anzeige['uuid']}.png")
                )
                anzeige["b64_bild"] = "data:image/png;base64," + base64.b64encode(image_bin).decode('utf-8')
            except Exception:
                pass
    except Exception:
        return {"error": "Error while trying to read from database", "response": response_table}, 400

    return all_anzeigen, 200


@app.post("/anzeigen")
def create_anzeige():
    """
    POST /anzeigen
    
    Create a new record in the "anzeigen" table and optionally upload a PNG image to storage.
    
    Request
    -------
    JSON body (application/json)
    {
        "art": str,
        "aufgegeben_am": "YYYY-MM-DD",
        "titel": str,
        "beschreibung": str,
        "raum": str,
        "kategorie": (str | null),
        "kontakt_email": (str | null),  # optional
        "bild_b64": (str | null)        # optional; expected as data URL "data:image/png;base64,...."
    }

    Response
    ---------
    201 - the newly created anzeige object:
    {
        "uuid": (str)
        "art": (str),
        "aufgegeben_am": (str),
        "titel": (str),
        "beschreibung": (str),
        "raum": (str),
        "kategorie": (str | null),
        "kontakt_email": (str | null)
    }
    """
    
    data_body: dict = request.get_json()

    art: str | None = data_body.get("art")
    aufgegeben_am: str | None = datetime.strptime(data_body.get("aufgegeben_am"), "%Y-%m-%d").isoformat()
    titel: str | None = data_body.get("titel")
    beschreibung: str | None = data_body.get("beschreibung")
    raum: str | None = data_body.get("raum")
    kategorie: str | None = data_body.get("kategorie")
    kontakt_email: str | None = data_body.get("kontakt_email")
    bild_b64: str | None = data_body.get("bild_b64")

    if not any([art, aufgegeben_am, titel, beschreibung, raum]):
        return {"error": "Missing required fields"}, 400

    try:
        # Insert new anzeige
        response_table = (
            supabase.table("anzeigen")
            .insert({
                "aufgegeben_am": aufgegeben_am,
                "art": art,
                "titel": titel,
                "beschreibung": beschreibung,
                "raum": raum,
                "kategorie": kategorie,
                "kontakt_email": kontakt_email
            })
            .execute()
        )
    except Exception:
        return {"error": "Error while trying to add to database", "response": response_table}, 400
    
    new_anzeige: dict = response_table.data[0]
    
    try:
        if bild_b64:
            # Upload image to storage with uuid as name
            response_storage = (
                supabase.storage
                .from_("images")
                .upload(
                    file=base64.b64decode(bild_b64.split("base64,")[1]),
                    path=f"{new_anzeige['uuid']}.png",
                    file_options={"content-type": "image/png"}
                )
            )
    except Exception:
        return {"error": "Error while trying to upload image to database", "response": response_storage}, 400

    return new_anzeige, 201


@app.delete("/anzeigen/<uuid>")
def delete_anzeige(uuid):
    """
    DELETE /anzeigen/<uuid>

    Delete a single anzeige row by its uuid and remove its associated PNG image from storage (if present).

    Parameters
    ----------
    uuid : str
        UUID of the anzeige to delete.

    Responses
    ---------
    200 - the deleted anzeige object:
    {
        "uuid": (str)
        "art": (str),
        "aufgegeben_am": (str),
        "titel": (str),
        "beschreibung": (str),
        "raum": (str),
        "kategorie": (str | null),
        "kontakt_email": (str | null)
    }
    """
    
    try:
        # Delete anzeige row from table
        response_table = (
            supabase.table("anzeigen")
            .delete()
            .eq("uuid", uuid)
            .execute()
        )
    except Exception:
        return {"error": "Error while trying to delete from database", "response": response_table}, 400
        
    try:
        # Delete according image from storage
        response_storage = supabase.storage.from_("images").remove([f"{uuid}.png"])
    except Exception:
        return {"error": "Error while trying to delete image from database", "response": response_storage}, 400

    return response_table.data, 200
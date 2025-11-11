# Lost & Found Backend

## Developer
### Environment

Add `.env` file and replace placeholders:
```sh
SUPABASE_URL=https://<SUPABASE_PROJECT_ID>.supabase.co
SUPABASE_KEY=<SUPABASE_API_SECRET_KEY>

PORT=<PORT>

FRONTEND_ENDPOINT=<FRONTEND_ENDPOINT>
```

### Commands

```sh
# Create virtual envireonment
python3 -m venv venv

# Activate virtual envireonment
source venv/bin/activate

# Install all dependencies from requirements.txt
pip3 install -r requirements.txt

# Update requirements.txt
pip3 freeze > requirements.txt

# Run
python3 app.py
```


### Supabase

listings: {[
    <u>uuid</u>: uuid,
    created_at: date,
    title: string,
    description
    room: string
    contact_email: string | null
    type: string
    category: string
]}

Images are stored as PNG in the "images" bucket with the UUID of the listing as name (`<uuid>.png`).


## API Reference

Format of base64 image: `data:image/png;base64,...`

<details>
<summary><strong>Get all listings</strong></summary>
    `GET /listings`  
    JSON response:
    ```json
    [
        {
            "uuid": "(str)",
            "type": "(str)",
            "created_at": "(str)",
            "title": "(str)",
            "description": "(str)",
            "room": "(str)",
            "category": "(str)",
            "contact_email": "(str | null)",
            "b64_image": "(str | null)"
        },
    ]
    ```
</details> 

<details>
<summary><strong>Get listing with uuid</strong></summary>
    `GET /listings/<uuid>`  
    JSON response:
    ```json
    {
        "uuid": "(str)",
        "type": "(str)",
        "created_at": "(str)",
        "title": "(str)",
        "description": "(str)",
        "room": "(str)",
        "category": "(str)",
        "contact_email": "(str | null)",
        "b64_image": "(str | null)"
    }
    ```
</details> 

<details>
<summary><strong>Create listing</strong></summary>  
    `POST /listings`  
    JSON body (application/json):
    ```json
    {
        "type": "(str)",
        "created_at": "(str) - YYYY-MM-DD",
        "title": "(str)",
        "description": "(str)",
        "room": "(str)",
        "category": "(str)",
        "contact_email": "(str | null)",
        "image_b64": "(str | null)"
    }
    ```
</details> 

<details>
<summary><strong>Delete listing</strong></summary>  
    `DELETE /listings/<uuid>`  
</details> 

## Tests

This project includes automated tests to ensure that the core API functionality works as expected.  
The tests focus on verifying the behavior of the main endpoints responsible for creating, retrieving, listing, and deleting listings, as well as the scheduled cleanup function for removing outdated entries.

<details>
<summary><strong>What is being tested?</strong></summary>

The tests cover:
- Fetching all listings (`GET /listings`)
- Creating new listings (`POST /listings`)
- Retrieving a listing by its UUID (`GET /listings/<uuid>`)
- Handling non-existing or malformed UUID queries
- Marking and deleting expired listings (`delete_old_listings()`)
- Deleting a listing by UUID (`DELETE /listings/<uuid>`)

These tests run **without starting a real server** and execute directly against the Flask application.
</details> 

<details>
<summary><strong>How to run the tests</strong></summary>

Make sure your virtual environment is activated:

```bash
source venv/bin/activate
```
Navigate to the backend directory and run the test suite:

```bash
python -m pytest -q
```
</details> 

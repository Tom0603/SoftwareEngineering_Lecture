# Lost & Found Backend

## Developer
### Commands

```sh
# Create virtual envireonment
python3 -m venv venv

# Activate virtual envireonment
source venv/bin/activate

# Update requirements.txt
pip3 freeze > requirements.txt

# Run
flask run
flask run --debug
```

### Environment

Add `.env` file:
```sh
SUPABASE_URL=https://<PROJECT_ID>.supabase.co
SUPABASE_KEY={SUPABASE_API_SECRET_KEY}
```

## API Reference

Format of base64 image: `data:image/png;base64,...`

- **GET listings:**  
    `GET /listings`  
    JSON response:
    ```json
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
            "b64_image": (str | null)
        },
        ...
    ]
    ```

- **GET listing:**  
    `GET /listings/<uuid>`  
    JSON response:
    ```json
    {
        "uuid": (str),
        "type": (str),
        "created_at": (str),
        "title": (str),
        "description": (str),
        "room": (str),
        "category": (str),
        "contact_email": (str | null),
        "b64_image": (str | null)
    }
    ```

- **Create listing:**  
    `POST /listings`  
    JSON body (application/json):
    ```json
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
    ```

- **DELETE listing:**  
    `DELETE /listings/<uuid>`  
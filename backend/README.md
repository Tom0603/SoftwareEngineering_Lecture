# Lost & Found Backend

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

## Environment
Add `.env` file:
```sh
SUPABASE_URL={SUPABASE_URL}
SUPABASE_KEY={SUPABASE_KEY}
```
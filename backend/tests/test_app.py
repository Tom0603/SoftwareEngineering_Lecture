import re
from datetime import datetime
import pytest

from app import app, delete_old_listings


@pytest.fixture(autouse=True)
def _testing():
    # Enable Flask testing mode so errors propagate and no real server is needed
    app.config["TESTING"] = True


def test_get_listings():
    # Checks that the listings endpoint returns a valid list of listings
    with app.test_client() as client:
        resp = client.get("/listings")
        assert resp.status_code == 200
        listings = resp.get_json()
        assert isinstance(listings, list)
        # Each listing should contain all required fields
        for listing in listings:
            for key in ["uuid","type","created_at","title","description","room","category","contact_email","b64_image"]:
                assert key in listing


def test_create_listing_missing_fields():
    # Sending incomplete data should result in a 400 Bad Request response
    with app.test_client() as client:
        data = {"type": "offer", "title": "Test Listing"}
        resp = client.post("/listings", json=data)
        assert resp.status_code == 400


def test_create_listing_and_get_listing_by_uuid():
    # Create a valid listing and then ensure it can be retrieved via its UUID
    with app.test_client() as client:
        new_listing = {
            "type": "offer",
            "created_at": "2024-06-01",
            "title": "Test Listing for Fetch",
            "description": "This is a test listing for fetching by UUID.",
            "room": "Room B",
            "category": "Test",
            "contact_email": None,
            "b64_image": None
        }
        post = client.post("/listings", json=new_listing)
        assert post.status_code == 201
        uuid = post.get_json()["uuid"]

        # Retrieve the created listing
        getr = client.get(f"/listings/{uuid}")
        assert getr.status_code == 200
        listing = getr.get_json()
        # Ensure fields match the created data
        assert listing["uuid"] == uuid
        assert listing["type"] == new_listing["type"]
        assert listing["created_at"] == listing["created_at"]
        assert listing["title"] == new_listing["title"]
        assert listing["description"] == new_listing["description"]
        assert listing["room"] == new_listing["room"]
        assert listing["category"] == new_listing["category"]
        assert listing["contact_email"] == new_listing["contact_email"]


def test_get_listing_by_invalid_uuid():
    # Requesting an invalid UUID should return an error status
    with app.test_client() as client:
        resp = client.get("/listings/non-existent-uuid")
        assert resp.status_code == 400


def test_get_listing_by_uuid_missing_uuid():
    # Accessing the endpoint without a UUID should return 404 (no matching route)
    with app.test_client() as client:
        resp = client.get("/listings/")
        assert resp.status_code == 404


def test_delete_old_listings():
    # Create an "old" listing and trigger age-based deletion
    with app.test_client() as client:
        old = {
            "type": "offer",
            "created_at": "2024-06-01",
            "title": "Old Listing",
            "description": "Should be deleted by age.",
            "room": "Room C",
            "category": "Test",
            "contact_email": None,
            "b64_image": None
        }
        post = client.post("/listings", json=old)
        assert post.status_code in (200, 201)
        uuid = post.get_json()["uuid"]

        # Run scheduled deletion manually
        delete_old_listings()

        # Listing should no longer exist
        getr = client.get(f"/listings/{uuid}")
        assert getr.status_code == 404


def test_delete_listing():
    # Create a listing and ensure it can be deleted explicitly
    with app.test_client() as client:
        new_listing = {
            "type": "offer",
            "created_at": "2024-06-01",
            "title": "To Delete",
            "description": "Delete me.",
            "room": "Room C",
            "category": "Test",
            "contact_email": None,
            "b64_image": None
        }
        post = client.post("/listings", json=new_listing)
        assert post.status_code in (200, 201)
        uuid = post.get_json()["uuid"]

        deleter = client.delete(f"/listings/{uuid}")
        assert deleter.status_code == 200

        # Confirm the listing is gone
        getr = client.get(f"/listings/{uuid}")
        assert getr.status_code == 404


def test_delete_listing_wrong_uuid():
    # Deleting a non-existent listing should return an error
    with app.test_client() as client:
        resp = client.delete("/listings/non-existent-uuid")
        assert resp.status_code == 400

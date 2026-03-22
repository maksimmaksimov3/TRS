#!/usr/bin/env python3
"""
Google Drive Project Folder Setup
Connects to Google Drive as therightstreetprojects@gmail.com,
finds the TRS-Projects folder, and creates a new client/project folder
with standard subfolders: Working, Brief, Finals, Reports
"""

import os
import sys
import argparse
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# OAuth2 scopes required
SCOPES = ["https://www.googleapis.com/auth/drive"]

# Token file stores user access/refresh tokens after first auth
TOKEN_FILE = "token.json"
# Credentials file downloaded from Google Cloud Console
CREDENTIALS_FILE = "credentials.json"

# Top-level Drive folder to search for
TRS_PROJECTS_FOLDER = "TRS-Projects"

# Standard subfolders to create inside each new project folder
PROJECT_SUBFOLDERS = ["Working", "Brief", "Finals", "Reports"]


def authenticate() -> Credentials:
    """Authenticate with Google Drive and return credentials."""
    creds = None

    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_FILE):
                print(f"ERROR: '{CREDENTIALS_FILE}' not found.")
                print(
                    "Download OAuth2 credentials from Google Cloud Console:\n"
                    "  1. Go to https://console.cloud.google.com/\n"
                    "  2. Select your project and go to APIs & Services > Credentials\n"
                    "  3. Create OAuth 2.0 Client ID (Desktop app)\n"
                    "  4. Download JSON and save as 'credentials.json' in this directory\n"
                    "  Make sure the authorized account is therightstreetprojects@gmail.com"
                )
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())
        print("Authentication successful. Token saved.")

    return creds


def find_folder(service, name: str, parent_id: str = None) -> str | None:
    """Find a folder by name, optionally within a parent folder. Returns folder ID or None."""
    query = f"name = '{name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false"
    if parent_id:
        query += f" and '{parent_id}' in parents"

    results = service.files().list(
        q=query,
        spaces="drive",
        fields="files(id, name)",
    ).execute()

    files = results.get("files", [])
    if files:
        return files[0]["id"]
    return None


def create_folder(service, name: str, parent_id: str) -> str:
    """Create a folder inside a parent folder. Returns the new folder ID."""
    metadata = {
        "name": name,
        "mimeType": "application/vnd.google-apps.folder",
        "parents": [parent_id],
    }
    folder = service.files().create(body=metadata, fields="id, name").execute()
    return folder["id"]


def setup_project_folder(client_name: str, project_name: str = None) -> None:
    """
    Main function: find TRS-Projects, create client/project folder with subfolders.

    Args:
        client_name: Name of the client (e.g. "ACME Corp")
        project_name: Optional project name. If provided, creates client/project hierarchy.
                      If omitted, creates a single folder for the client.
    """
    print("Authenticating with Google Drive...")
    creds = authenticate()
    service = build("drive", "v3", credentials=creds)

    # Find TRS-Projects root folder
    print(f"Searching for '{TRS_PROJECTS_FOLDER}' folder in Drive...")
    trs_folder_id = find_folder(service, TRS_PROJECTS_FOLDER)
    if not trs_folder_id:
        print(f"ERROR: '{TRS_PROJECTS_FOLDER}' folder not found in Google Drive.")
        print("Make sure the folder exists and is accessible to therightstreetprojects@gmail.com")
        sys.exit(1)
    print(f"Found '{TRS_PROJECTS_FOLDER}' (id: {trs_folder_id})")

    # Determine the target parent and folder to create
    if project_name:
        # Create client folder if it doesn't already exist
        client_folder_id = find_folder(service, client_name, parent_id=trs_folder_id)
        if client_folder_id:
            print(f"Client folder '{client_name}' already exists (id: {client_folder_id})")
        else:
            client_folder_id = create_folder(service, client_name, trs_folder_id)
            print(f"Created client folder '{client_name}' (id: {client_folder_id})")

        # Create the project folder under the client
        project_folder_id = find_folder(service, project_name, parent_id=client_folder_id)
        if project_folder_id:
            print(f"Project folder '{project_name}' already exists (id: {project_folder_id})")
        else:
            project_folder_id = create_folder(service, project_name, client_folder_id)
            print(f"Created project folder '{project_name}' (id: {project_folder_id})")

        target_id = project_folder_id
        target_label = f"{client_name} / {project_name}"
    else:
        # Single client folder directly under TRS-Projects
        client_folder_id = find_folder(service, client_name, parent_id=trs_folder_id)
        if client_folder_id:
            print(f"Folder '{client_name}' already exists (id: {client_folder_id})")
        else:
            client_folder_id = create_folder(service, client_name, trs_folder_id)
            print(f"Created folder '{client_name}' (id: {client_folder_id})")

        target_id = client_folder_id
        target_label = client_name

    # Create standard subfolders
    print(f"\nSetting up subfolders inside '{target_label}':")
    for subfolder in PROJECT_SUBFOLDERS:
        existing = find_folder(service, subfolder, parent_id=target_id)
        if existing:
            print(f"  - '{subfolder}' already exists (skipped)")
        else:
            new_id = create_folder(service, subfolder, target_id)
            print(f"  - '{subfolder}' created (id: {new_id})")

    print(f"\nDone! Project structure ready in TRS-Projects / {target_label}")


def main():
    parser = argparse.ArgumentParser(
        description="Set up a client/project folder in the TRS Google Drive."
    )
    parser.add_argument("client", help="Client name (e.g. 'ACME Corp')")
    parser.add_argument(
        "project",
        nargs="?",
        default=None,
        help="Project name (optional). If provided, creates TRS-Projects/Client/Project/subfolders",
    )
    args = parser.parse_args()

    try:
        setup_project_folder(args.client, args.project)
    except HttpError as e:
        print(f"Google Drive API error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

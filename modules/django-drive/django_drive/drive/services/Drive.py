import apiclient
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from googleapiclient import discovery


class DriveService:

    def __init__(self, access_token=None, credential_file_path=None):
        """
        The method authorizes a user and creates an access point to interact with Google Drive.
        Gives access to the user to access the files and folders of the drive
        """
        try:
            credentials = None
            if access_token:
                credentials = Credentials(token=access_token)
            elif credential_file_path:
                credentials = service_account.Credentials.from_service_account_file(credential_file_path)
            self.drive_service = discovery.build('drive', 'v3', credentials=credentials)
        except Exception:
            raise

    def get_drive_files(self, query=None, page_token=None, page_size=None):
        try:
            files = self.drive_service.files().list(
                q=query,
                pageToken=page_token,
                pageSize=page_size
            ).execute()
            return files
        except Exception:
            raise

    def create_drive_folder(self, folder_name, share_with=None):
        try:
            file_metadata = {
                "name": folder_name,
                "mimeType": 'application/vnd.google-apps.folder'
            }
            file = self.drive_service.files().create(
                body=file_metadata,
                fields='id,name,mimeType,webViewLink',
            ).execute()

            if share_with:
                self.share_drive_file(file.get('id'), share_with, 'writer', 'user')

            return file
        except Exception:
            raise

    def upload_drive_file(self, file, parent_folder_id=None):
        try:
            file_metadata = {
                "name": file.name,
                "parents": [parent_folder_id]
            }
            media = apiclient.http.MediaInMemoryUpload(
                body=file.read(),
                mimetype=file.content_type)
            file = self.drive_service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id').execute()
            return file
        except Exception:
            raise

    def share_drive_file(self, file_id, emails, role, user_type):
        try:
            for email in emails:
                self.drive_service.permissions().create(
                    fileId=file_id,
                    body={
                        "role": role,
                        "type": user_type,
                        "emailAddress": email
                    }
                ).execute()

            share_link = self.drive_service.files().get(
                fileId=file_id,
                fields="id, name, webViewLink",
            ).execute()
            return share_link
        except Exception:
            raise

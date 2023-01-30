import os

from google.oauth2 import service_account
from googleapiclient import discovery
from google.oauth2.credentials import Credentials
import apiclient


class DriveService:

    def __init__(self, access_token=None, credential_file_path=None):
        """
        The method authorizes a user and creates an access point to interact with Google Drive.
        Gives access to the user to access the files and folders of the drive
        """
        try:
            credentials = Credentials(token=access_token)
            if credential_file_path:
                credentials = service_account.Credentials.from_service_account_file(credential_file_path)
            self.drive_service = discovery.build('drive', 'v3', credentials=credentials)
        except Exception:
            raise

    def get_drive_files(self, query=None, page_token=None, page_size=None):
        """
            :query_param str query: To search for a specific set of files or folders, use the query.
            :query_param num page_size: The maximum number of files to return per page
            :query_param str page_token: The token for continuing a previous list request on the next page.
                This should be set to the value of 'nextPageToken' from the previous response.
            :return: Returns list of the files and folder from user's Google Drive.
        """
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
        """
            :param folder_name: Folder will be created with this name in Google Drive
            :return: Creates the folder and returns folder id.
        """
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
        """
            :param file: The file sent needs to be uploaded on the Google Drive. File must be sent as
            multipart/form-data
            :param parent_folder_id: Use if user wants to add file inside the specific folder
            :return: Uploads the file to the specified folder and returns file id.
        """
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
        """
            :param str file_id: ID of the file/folder that will be shared with the user
            :param str emails: A list of emails which user wants to share file
            :param str role: Object containing the `role`, `type` and `email` of the user sharing file with
            :param str user_type: "user" or "group"
            :return: Shares file/folder with the user and returns the shared file/folder detail object
        """
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

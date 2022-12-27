from googleapiclient import discovery
from google.oauth2.credentials import Credentials
import apiclient


class DriveService:

    def __init__(self, access_token):
        """
        The method authorizes a user and creates an access point to interact with Google Drive.
        Gives access to the user to access the files and folders of the drive
        """
        try:
            creds = Credentials(token=access_token)
            self.drive_service = discovery.build('drive', 'v3', credentials=creds)
        except Exception:
            raise

    def get_drive_files(self, query=None, page_token=None, page_size=None):
        """
            :param str query: To search for a specific set of files or folders, use the query.
            :param num page_size: The maximum number of files to return per page
            :param str page_token: The token for continuing a previous list request on the next page.
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

    def create_drive_folder(self, folder_name):
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
                 fields='id',
            ).execute()
            return file
        except Exception:
            raise

    def upload_drive_file(self, uploaded_file, parent_folder_id=None):
        """
            :param uploaded_file: The file sent needs to be uploaded on the Google Drive. File must be sent as
            multipart/form-data
            :param parent_folder_id: Use if user wants to add file inside the specific folder
            :return: Uploads the file to the specified folder and returns file id.
        """
        try:
            uploaded_file = uploaded_file
            file_metadata = {
                "name": uploaded_file.name,
                "parents": [parent_folder_id]
            }
            media = apiclient.http.MediaInMemoryUpload(
                body=uploaded_file.read(),
                mimetype=uploaded_file.content_type)
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

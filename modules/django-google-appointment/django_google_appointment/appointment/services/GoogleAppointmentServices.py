
from googleapiclient import discovery
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials


class GoogleAppointmentService:

    def __init__(self, access_token=None, credential_file_path=None):
        """
        The method authorizes a user and creates an access point to interact with Google Calendar.
        Gives access to the user to create, delete and retrieve events from the Google Calendar.
        """
        try:
            credentials = Credentials(token=access_token)
            if credential_file_path:
                credentials = service_account.Credentials.from_service_account_file(
                    credential_file_path,
                )
            self.google_appointment_service = discovery.build('calendar', 'v3', credentials=credentials)
        except Exception:
            raise

    def appointment_list(self, max_results=None, order_by=None, time_max=None, time_min=None, page_token=None, show_deleted=None, single_events=None):
        try:
            events_list = self.google_appointment_service.events().list(calendarId='primary', maxResults=max_results,
                                                                        orderBy=order_by, timeMax=time_max,
                                                                        timeMin=time_min, pageToken=page_token,
                                                                        showDeleted=show_deleted, singleEvents=single_events). \
                execute()
            return events_list
        except Exception:
            raise

    def single_appointment(self, eventId):
        try:
            event = self.google_appointment_service.events().get(calendarId='primary', eventId=eventId).execute()
            return event
        except Exception:
            raise

    def create_appointment(self, payload):
        try:
            event = self.google_appointment_service.events().insert(calendarId='primary', body=payload, conferenceDataVersion=1). \
                execute()
            return event
        except Exception:
            raise

    def delete_appointment(self, eventId):
        try:
            self.google_appointment_service.events().delete(calendarId='primary', eventId=eventId).execute()
            response = {"message": "Item deleted successfully"}
            return response
        except Exception:
            raise

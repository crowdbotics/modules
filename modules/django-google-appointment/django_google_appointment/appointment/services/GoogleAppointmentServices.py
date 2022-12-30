from google.oauth2 import service_account
from googleapiclient import discovery


class GoogleAppointmentService:

    def __init__(self, credential_file_path):
        
        try:
            credentials = service_account.Credentials.from_service_account_file(
                credential_file_path,
            )
            self.google_appointment_service = discovery.build('calendar', 'v3', credentials=credentials)
        except Exception:
            raise

    def appointment_list(self):

        try:
            events_list = self.google_appointment_service.events().list(calendarId='primary'). \
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
            event = self.google_appointment_service.events().insert(calendarId='primary', body=payload). \
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

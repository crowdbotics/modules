
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
        """
        Returns a list of the all the events scheduled in past and for the future
        :query_params int max_results: Maximum number of events returned on one result page
        :query_params str order_by: The order of the events returned in the result. Supported values are 'startTime' and 'updated'
        :query_params str time_max: An event's start time to filter by. Supported format is '2011-06-03T10:00:00-07:00'
        :query_params str time_min: An event's end time to filter by. Supported format is '2011-06-03T10:00:00-07:00'
        :query_params str page_token: Token specifying which result page to return
        :query_params bool show_deleted: Whether to include deleted events (with status equals "cancelled") in the result
        :query_params bool single_events: Whether to expand recurring events into instances and only return single one-off events and instances of recurring events
        :return: Returns events on the according to the specified queries if are provided.
        """
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
        """
        Retrieves a single event from the calendar
        :path_param eventId: The id of the scheduled event
        :return: Returns a single event object 
        """
        try:
            event = self.google_appointment_service.events().get(calendarId='primary', eventId=eventId).execute()
            return event
        except Exception:
            raise

    def create_appointment(self, payload):
        """
        Creates a new event of the calendar.
        :param str summary: The title for the appointment
        :param str description: Description for the appointment
        :param str location: Location where meeting will be held
        :param obj start: Object containing the starting `dateTime` for the appointment 
        :param obj end: Object containing the ending `dateTime` for the appointment 
        :param arr attendees: Array/List containing objects. Each object has the attendees `email` 
        :param obj conferenceData: Object containing details if the user wants to create the meeting hangoutLink.
        :return: Creates a new event/appointment on the calendar and returns event object.
        """
        try:
            event = self.google_appointment_service.events().insert(calendarId='primary', body=payload, conferenceDataVersion=1). \
                execute()
            return event
        except Exception:
            raise

    def delete_appointment(self, eventId):
        """
        Deletes a single event from the calendar
        :path_param eventId: The id of the scheduled event
        :return: Removes a single event object from the calendar. 
        """
        try:
            self.google_appointment_service.events().delete(calendarId='primary', eventId=eventId).execute()
            response = {"message": "Item deleted successfully"}
            return response
        except Exception:
            raise

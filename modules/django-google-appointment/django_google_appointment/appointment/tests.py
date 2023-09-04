from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.urls import reverse
import mock
from rest_framework import status
from .models import Meetings, MeetingAttendees
from django.contrib.auth import get_user_model

User = get_user_model()


class GoogleAppointmentTestCases(APITestCase):
    def setUp(self):
        self.token = "ya29.a0AX9GBdVKK5W7bXLwPEkMPdFYLMBsBtuGz_7KmkOzQ_P6eRA-WW_SU7YVfrav-0LvjL7LEHr4oh0i6sLbxns7qEVNs1dfZae9RTpaucWk_dbhiTXWpvxgJf5orCfnx1Xjc3j3paLIgZKTqudu62fuHU9R3t2xaCgYKAT4SARASFQHUCsbCaremy2Rfo4zscwCF_xnCAA0163"
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        self.expired_token = "gdfghdsg7837dvh"

    @mock.patch('modules.django_google_appointment.appointment.services.GoogleAppointmentServices.GoogleAppointmentService.appointment_list')
    def test_get_appointment_list(self, appointment_list_mock):
        responses = {'kind': 'calendar#events', 'etag': '"p32cb5mvchjevo0g"', 'summary': 'johny1122@gmail.com',
                     'updated': '2023-01-23T06:49:39.103Z', 'timeZone': 'Asia/Karachi', 'accessRole': 'owner',
                     'defaultReminders': [{'method': 'popup', 'minutes': 30}],
                     'nextSyncToken': 'CJiy2-yM3fwCEJiy2-yM3fwCGAUg7JnJ7wE=', 'items': [
                {'kind': 'calendar#event', 'etag': '"3301560614520000"',
                 'id': '_6tlnaqrle5p6cpb4dhmj4phpegs6acb8dson0rb66loj0cb56hn70spl6cr30qpodlh34shh6tk3aob9dhq32dhndlr7cdj865gjcshgdll6e',
                 'status': 'confirmed',
                 'htmlLink': 'https://www.google.com/calendar/event?eid=XzZ0bG5hcXJsZTVwNmNwYjRkaG1qNHBocGVnczZhY2I4ZHNvbjByYjY2bG9qMGNiNTZobjcwc3BsNmNyMzBxcG9kbGgzNHNoaDZ0azNhb2I5ZGhxMzJkaG5kbHI3Y2RqODY1Z2pjc2hnZGxsNmUgamFtZ2hhZm9vcjExMjJAbQ',
                 'created': '2022-04-24T06:05:07.000Z', 'updated': '2022-04-24T06:05:07.260Z',
                 'summary': 'Webinar on "Intro to Metaverse"',
                 'description': 'To see detailed information for automatically created events like this one, use the official Google Calendar app. https://g.co/calendar\n\nThis event was created from an email you received in Gmail. https://mail.google.com/mail?extsrc=cal&plid=ACUX6DMqR_w8yE5HVbKgP6xsHXyU648brFEseOA\n',
                 'location': 'https://www.linkedin.com/events/introtometaverse6923312187436335105',
                 'creator': {'email': 'johny1122@gmail.com', 'self': True},
                 'organizer': {'email': 'unknownorganizer@calendar.google.com', 'displayName': 'Unknown Organizer'},
                 'start': {'dateTime': '2022-04-25T22:00:00+05:00', 'timeZone': 'Asia/Karachi'},
                 'end': {'dateTime': '2022-04-25T23:00:00+05:00', 'timeZone': 'Asia/Karachi'},
                 'transparency': 'transparent', 'visibility': 'private',
                 'iCalUID': '7kukuqrfedlm2f9t8e1ho1pmf5q01e4nps5360k8mb2r17h5ailt167mvv6h1a6r0mjg', 'sequence': 0,
                 'attendees': [{'email': 'johny1122@gmail.com', 'self': True, 'responseStatus': 'accepted'}],
                 'guestsCanInviteOthers': False, 'privateCopy': True, 'reminders': {'useDefault': True}, 'source': {
                    'url': 'https://mail.google.com/mail?extsrc=cal&plid=ACUX6DMqR_w8yE5HVbKgP6xsHXyU648brFEseOA',
                    'title': ''}, 'eventType': 'default'}]}
        appointment_list_mock.return_value = responses
        url = reverse('appointment_service-appointment-list')
        response = self.client.get(url)
        self.assertEqual(responses['items'], response.data['items'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        appointment_list_mock.assert_called_once()

    def test_get_appointment_list_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.expired_token)
        url = reverse('appointment_service-appointment-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_google_appointment.appointment.services.GoogleAppointmentServices.GoogleAppointmentService.single_appointment')
    def test_get_single_appointment(self, single_appointment_mock):
        responses = {'kind': 'calendar#event', 'etag': '"3343249581594000"', 'id': 'flp51c1hgj5l62389rh7cj763c',
                     'status': 'confirmed',
                     'htmlLink': 'https://www.google.com/calendar/event?eid=ZmxwNTFjMWhnajVsNjIzODlyaDdjajc2M2MgamFtZ2hhZm9vcjExMjJAbQ',
                     'created': '2022-12-21T12:13:10.000Z', 'updated': '2022-12-21T12:13:10.797Z', 'summary': 'Demo 2',
                     'description': 'Demo 2 meeting description',
                     'creator': {'email': 'johny1122@gmail.com', 'self': True},
                     'organizer': {'email': 'johny1122@gmail.com', 'self': True},
                     'start': {'dateTime': '2022-12-21T18:00:00+05:00', 'timeZone': 'Asia/Karachi'},
                     'end': {'dateTime': '2022-12-21T18:30:00+05:00', 'timeZone': 'Asia/Karachi'},
                     'iCalUID': 'flp51c1hgj5l62389rh7cj763c@google.com', 'sequence': 0,
                     'reminders': {'useDefault': True}, 'eventType': 'default'}
        single_appointment_mock.return_value = responses
        url = reverse('appointment_service-single-appointment', kwargs={'pk': "flp51c1hgj5l62389rh7cj763c"})
        response = self.client.get(url)
        self.assertEqual(responses['id'], response.data['id'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        single_appointment_mock.assert_called_once()

    def test_get_single_appointment_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.expired_token)
        url = reverse('appointment_service-single-appointment', kwargs={'pk': "flp51c1hgj5l62389rh7cj763c"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_google_appointment.appointment.services.GoogleAppointmentServices.GoogleAppointmentService.create_appointment')
    def test_create_appointment(self, create_appointment_mock):
        responses = {'kind': 'calendar#event', 'etag': '"3348921118430000"', 'id': 'tv086jumcnlalu0df8npr9afck', 'status': 'confirmed', 'htmlLink': 'https://www.google.com/calendar/event?eid=dHYwODZqdW1jbmxhbHUwZGY4bnByOWFmY2sgamFtZ2hhZm9vcjExMjJAbQ', 'created': '2023-01-23T07:55:59.000Z', 'updated': '2023-01-23T07:55:59.215Z', 'summary': 'Google I/O 2019', 'description': "A chance to hear more about Google's developer products.", 'location': '800 Howard St., San Francisco, CA 94103', 'creator': {'email': 'johny1122@gmail.com', 'self': True}, 'organizer': {'email': 'johny1122@gmail.com', 'self': True}, 'start': {'dateTime': '2023-06-28T21:00:00+05:00', 'timeZone': 'Asia/Karachi'}, 'end': {'dateTime': '2023-06-29T05:00:00+05:00', 'timeZone': 'Asia/Karachi'}, 'iCalUID': 'tv086jumcnlalu0df8npr9afck@google.com', 'sequence': 0, 'attendees': [{'email': 'johi@gmail.com', 'responseStatus': 'needsAction'}, {'email': 'david@gmail.com', 'responseStatus': 'needsAction'}], 'reminders': {'useDefault': True}, 'eventType': 'default'}
        create_appointment_mock.return_value = responses
        url = reverse('appointment_service-create-appointment')
        data = {
            "summary": "Google I/O 2015",
            "location": "800 Howard St., San Francisco, CA 94103",
            "description": "A chance to hear more about Google's developer products.",
            "start": {
                "dateTime": "2023-05-28T09:00:00-07:00"
            },
            "end": {
                "dateTime": "2023-05-28T17:00:00-07:00"
            }, "attendees": [
                {"email": "john12@gmail.com"},
                {"email": "david23@gmail.com"}
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['id'], response.data['id'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_appointment_mock.assert_called_once()

    def test_create_appointment_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.expired_token)
        url = reverse('appointment_service-create-appointment')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_google_appointment.appointment.services.GoogleAppointmentServices.GoogleAppointmentService.delete_appointment')
    def test_delete_appointment(self, delete_appointment_mock):
        responses = {'message': 'Item deleted successfully'}
        delete_appointment_mock.return_value = responses
        url = reverse('appointment_service-delete-appointment', kwargs={"pk":"j64tek13uvml1kf3pp9foi3ijc"})
        response = self.client.delete(url)
        self.assertEqual(response.data, {'message': 'Item deleted successfully'})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_appointment_mock.assert_called_once()

    def test_delete_appointment_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.expired_token)
        url = reverse('appointment_service-delete-appointment', kwargs={"pk":"j64tek13uvml1kf3pp9foi3ijc"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_google_appointment.appointment.viewsets.GoogleAppointmentService.appointment_list')
    def test_sync_appointment(self, appointment_list_mock):
        responses = {'kind': 'calendar#events', 'etag': '"p32ccnjk0jrevo0g"', 'summary': 'johny1122@gmail.com', 'updated': '2023-01-23T08:06:24.239Z', 'timeZone': 'Asia/Karachi', 'accessRole': 'owner', 'defaultReminders': [{'method': 'popup', 'minutes': 30}], 'nextSyncToken': 'CJjLzoCe3fwCEJjLzoCe3fwCGAUg7JnJ7wE=', 'items': [{'kind': 'calendar#event', 'etag': '"3301560614520000"', 'id': '_6tlnaqrle5p6cpb4dhmj4phpegs6acb8dson0rb66loj0cb56hn70spl6cr30qpodlh34shh6tk3aob9dhq32dhndlr7cdj865gjcshgdll6e', 'status': 'confirmed', 'htmlLink': 'https://www.google.com/calendar/event?eid=XzZ0bG5hcXJsZTVwNmNwYjRkaG1qNHBocGVnczZhY2I4ZHNvbjByYjY2bG9qMGNiNTZobjcwc3BsNmNyMzBxcG9kbGgzNHNoaDZ0azNhb2I5ZGhxMzJkaG5kbHI3Y2RqODY1Z2pjc2hnZGxsNmUgamFtZ2hhZm9vcjExMjJAbQ', 'created': '2022-04-24T06:05:07.000Z', 'updated': '2022-04-24T06:05:07.260Z', 'summary': 'Webinar on "Intro to Metaverse"', 'description': 'To see detailed information for automatically created events like this one, use the official Google Calendar app. https://g.co/calendar\n\nThis event was created from an email you received in Gmail. https://mail.google.com/mail?extsrc=cal&plid=ACUX6DMqR_w8yE5HVbKgP6xsHXyU648brFEseOA\n', 'location': 'https://www.linkedin.com/events/introtometaverse6923312187436335105', 'creator': {'email': 'johny1122@gmail.com', 'self': True}, 'organizer': {'email': 'unknownorganizer@calendar.google.com', 'displayName': 'Unknown Organizer'}, 'start': {'dateTime': '2022-04-25T22:00:00+05:00', 'timeZone': 'Asia/Karachi'}, 'end': {'dateTime': '2022-04-25T23:00:00+05:00', 'timeZone': 'Asia/Karachi'}, 'transparency': 'transparent', 'visibility': 'private', 'iCalUID': '7kukuqrfedlm2f9t8e1ho1pmf5q01e4nps5360k8mb2r17h5ailt167mvv6h1a6r0mjg', 'sequence': 0, 'attendees': [{'email': 'johny1122@gmail.com', 'self': True, 'responseStatus': 'accepted'}], 'guestsCanInviteOthers': False, 'privateCopy': True, 'reminders': {'useDefault': True}, 'source': {'url': 'https://mail.google.com/mail?extsrc=cal&plid=ACUX6DMqR_w8yE5HVbKgP6xsHXyU648brFEseOA', 'title': ''}, 'eventType': 'default'}]}
        appointment_list_mock.return_value = responses
        url = reverse('appointment_service-sync-appointment')
        data = {}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {'message': 'Synced successfully'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        appointment_list_mock.assert_called_once()

    def test_sync_appointment_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.expired_token)
        url = reverse('appointment_service-sync-appointment')
        data = {}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_synced_appointment_list(self):
        user = User.objects.create(username='david', email='david77@gmail.com', password='david123@')
        tokens = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        url = reverse('appointment_service-synced-appointment-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_meetings_model_str_return(self):
            """
            Method `__str__` should be equal to field `summary`
            """
            meeting = Meetings.objects.create(timezone="time.now", summary="helooo")
            self.assertEqual(str(meeting), meeting.summary)

    def test_meetings_attendees_model_str_return(self):
            """
            Method `__str__` should be equal to field `email`
            """
            meeting = MeetingAttendees.objects.create(email="time23@gmail.com")
            self.assertEqual(str(meeting), meeting.email)
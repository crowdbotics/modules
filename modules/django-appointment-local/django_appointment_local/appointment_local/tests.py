from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from .models import MeetingInformation, Appointment
from django.contrib.auth import get_user_model
from .serializers import AppointmentSerializer, MeetingInformationSerializer
from .viewsets import AppointmentViewSet
from datetime import date

User = get_user_model()


class MeetingsInformationTestCases(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.today = date.today()
        self.client_user = User.objects.create_user(
            username='client', email='clientjohn@doe.com', password='Pass@123')
        self.service_user = User.objects.create_user(
            username='service', email='projohn@doe.com', password='Pass@123')
        self.meeting = MeetingInformation.objects.create(service_provider=self.service_user, meeting_type="message",
                                                         meeting_type_detail="for sick", fees=22.0)
        self.service_token = Token.objects.create(user=self.service_user)
        self.client_token = Token.objects.create(user=self.client_user)

    def test_create_meeting_information(self):
        data = {
            "service_provider": self.service_user.id,
            "meeting_type": "Message",
            "meeting_type_detail": "for sick",
            "fees": 22.0
        }
        url = reverse('meetings-information-list')
        response = self.client.post(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token), data=data,
                                    format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_meeting_information_list(self):
        url = reverse('meetings-information-list')
        response = self.client.get(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        meetings_information = MeetingInformation.objects.all()
        serializer = MeetingInformationSerializer(meetings_information, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_meeting_information(self):
        url = reverse('meetings-information-detail', kwargs={'pk': self.meeting.id})
        response = self.client.get(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_meeting_information(self):
        url = reverse('meetings-information-detail', kwargs={'pk': self.meeting.id})
        response = self.client.delete(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_meeting_information(self):
        url = reverse('meetings-information-detail', kwargs={'pk': self.meeting.id})
        data = {
            "service_provider": self.service_user.id,
            "meeting_type": "Message",
            "meeting_type_detail": "for sick",
            "fees": 22.0
        }
        response = self.client.put(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token), data=data,
                                   format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_meeting_information(self):
        url = reverse('meetings-information-detail', kwargs={'pk': self.meeting.id})
        data = {
            "service_provider": self.service_user.id,
            "meeting_type": "Message",
            "meeting_type_detail": "for sick",
            "fees": 22.0
        }
        response = self.client.patch(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token), data=data,
                                     format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_str_is_equal_to_meeting_information_title(self):
        """
        Method `__str__` should be equal to field `title`
        """
        meeting = MeetingInformation.objects.get(pk=1)
        self.assertEqual(str(meeting), meeting.meeting_type)


class AppointmentTestCases(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.today = date.today()
        self.client_user = User.objects.create_user(
            username='client', email='clientjohn@doe.com', password='Pass@123')
        self.service_user = User.objects.create_user(
            username='service', email='projohn@doe.com', password='Pass@123')
        self.meeting = MeetingInformation.objects.create(service_provider=self.service_user, meeting_type="message",
                                                         meeting_type_detail="for sick", fees=22.0)
        self.appointment = Appointment.objects.get_or_create(service_provider=self.service_user,
                                                             client=self.client_user,
                                                             selected_date=date.today(), start_time="10:51:00",
                                                             end_time="11:51:00", email="john123@doe.com", age=21,
                                                             name='john', gender="male", add_note="dr john",
                                                             appointment_type__in=[self.meeting.id])
        self.service_token = Token.objects.create(user=self.service_user)
        self.client_token = Token.objects.create(user=self.client_user)

    def test_create_appointment(self):
        url = reverse('appointment-list')
        data = {
            "service_provider": self.service_user.id,
            "client": self.client_user.id,
            "selected_date": date.today(),
            "session": "Morning",
            "start_time": "10:51:00",
            "end_time": "11:51:00",
            "name": "john-doe",
            "email": "john@doe.com",
            "age": "21",
            "gender": "Male",
            "add_note": "appointment for discussion",
            "appointment_type": [self.meeting.id],
        }
        response = self.client.post(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token), data=data, format="json")
        self.assertEqual(len(response.data), 21)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_appointment(self):
        url = reverse('appointment-list')
        response = self.client.get(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        appointment = Appointment.objects.filter(selected_date__gte=self.today)
        serializer = AppointmentSerializer(appointment, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_appointment(self):
        url = reverse('appointment-detail', kwargs={'pk': self.appointment[0].id})
        response = self.client.get(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_client_appointment(self):
        request = self.factory.get('appointment-list', HTTP_AUTHORIZATION='Token {}'.format(self.client_token))
        force_authenticate(request, user=self.client_user)
        view = AppointmentViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_service_appointment(self):
        request = self.factory.get('appointment-list', HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        force_authenticate(request, user=self.service_user)
        view = AppointmentViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_appointment(self):
        url = reverse("appointment-detail", kwargs={'pk': self.appointment[0].id})
        response = self.client.delete(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_appointment(self):
        url = reverse("appointment-detail", kwargs={'pk': self.appointment[0].id})
        data = {
            "service_provider": self.service_user.id,
            "client": self.client_user.id,
            "selected_date": "2023-01-20",
            "session": "Morning",
            "start_time": "10:51:00",
            "end_time": "11:51:00",
            "name": "john-doe",
            "email": "john@doe.com",
            "age": "21",
            "gender": "Male",
            "add_note": "appointment for discussion",
            "appointment_type": [self.meeting.id],
        }
        response = self.client.put(url,  HTTP_AUTHORIZATION='Token {}'.format(self.service_token), data=data,
                                   format="json")
        self.assertEqual(len(response.data), 21)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_appointment(self):
        url = reverse("appointment-detail", kwargs={'pk': self.appointment[0].id})
        data = {
            "session": "Morning",
            "start_time": "10:51:00",
            "end_time": "11:51:00",
            "name": "john-doe",
            "gender": "Male",
            "add_note": "appointment for discussion",
        }
        response = self.client.patch(url, HTTP_AUTHORIZATION='Token {}'.format(self.service_token), data=data,
                                     format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_str_is_equal_to_appointment_title(self):
        """
        Method `__str__` should be equal to field `title`
        """
        appointment = Appointment.objects.get(pk=1)
        self.assertEqual(str(appointment), appointment.name)
from datetime import date

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate

from .models import MeetingInformation, Appointment, AppointmentSession
from .serializers import AppointmentSerializer, MeetingInformationSerializer
from .viewsets import AppointmentViewSet

User = get_user_model()


class MeetingsInformationTestCases(APITestCase):
    def setUp(self):
        self.client_user = User.objects.create_user(
            username="client", email="clientjohn@doe.com", password="Pass@123"
        )
        self.service_user = User.objects.create_user(
            username="service", email="projohn@doe.com", password="Pass@123"
        )
        self.meeting = MeetingInformation.objects.create(
            service_provider=self.service_user,
            meeting_type="message",
            meeting_type_detail="for sick",
            fees=22.0,
        )
        self.service_token = Token.objects.create(user=self.service_user)
        self.client_token = Token.objects.create(user=self.client_user)

    def test_create_meeting_information(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        data = {
            "service_provider": self.service_user.id,
            "meeting_type": "Message",
            "meeting_type_detail": "for sick",
            "fees": 22.0,
        }
        url = reverse("meetings-information-list")
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.data["meeting_type"], "Message")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_meeting_information_list(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("meetings-information-list")
        response = self.client.get(url, format="json")
        meetings_information = MeetingInformation.objects.all()
        serializer = MeetingInformationSerializer(meetings_information, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_meeting_information(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("meetings-information-detail", kwargs={"pk": self.meeting.id})
        response = self.client.get(url, format="json")
        self.assertEqual(response.data["meeting_type_detail"], "for sick")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_meeting_information(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("meetings-information-detail", kwargs={"pk": self.meeting.id})
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_meeting_information_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("meetings-information-detail", kwargs={"pk": self.meeting.id})
        data = {
            "service_provider": self.service_user.id,
            "meeting_type": "Message",
            "meeting_type_detail": "for checkup",
            "fees": 22.0,
        }
        response = self.client.put(url, data=data, format="json")
        self.assertEqual(response.data["meeting_type_detail"], "for checkup")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_meeting_information_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("meetings-information-detail", kwargs={"pk": self.meeting.id})
        data = {"fees": 10.00}
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.data["fees"], "10.00")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_str_is_equal_to_meeting_information_meeting_type(self):
        """
        Method `__str__` should be equal to field `meeting_type`
        """
        meeting = MeetingInformation.objects.get(pk=1)
        self.assertEqual(str(meeting), meeting.meeting_type)


class AppointmentTestCases(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.today = date.today()
        self.client_user = User.objects.create_user(
            username="client", email="clientjohn@doe.com", password="Pass@123"
        )
        self.service_user = User.objects.create_user(
            username="service", email="projohn@doe.com", password="Pass@123"
        )
        self.meeting = MeetingInformation.objects.create(
            service_provider=self.service_user,
            meeting_type="message",
            meeting_type_detail="for sick",
            fees=22.0,
        )
        self.session = AppointmentSession.objects.create(type="Morning")
        self.session.save()
        self.appointment = Appointment.objects.get_or_create(
            service_provider=self.service_user,
            client=self.client_user,
            selected_date=date.today(),
            start_time="10:51:00",
            session=self.session,
            end_time="11:51:00",
            email="john123@doe.com",
            age=21,
            name="john",
            gender="male",
            add_note="dr john",
            address="address",
            appointment_type__in=[self.meeting.id],
        )
        self.service_token = Token.objects.create(user=self.service_user)
        self.client_token = Token.objects.create(user=self.client_user)
        self.session = AppointmentSession.objects.create(type="Morning")

    def test_create_appointment(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("appointment-list")
        data = {
            "service_provider": self.service_user.id,
            "client": self.client_user.id,
            "selected_date": date.today(),
            "session": self.session.id,
            "start_time": "05:51:00",
            "end_time": "6:51:00",
            "name": "john-doe",
            "email": "john@doe.com",
            "age": "21",
            "address": "address",
            "gender": "Male",
            "add_note": "appointment for discussion",
            "appointment_type": [self.meeting.id],
        }
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(len(response.data), 22)
        self.assertEqual(response.data["name"], "john-doe")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_validation_at_booked_appointment(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("appointment-list")
        data = {
            "service_provider": self.service_user.id,
            "client": self.client_user.id,
            "selected_date": date.today(),
            "session": self.session.id,
            "start_time": "10:51:00",
            "end_time": "11:51:00",
            "name": "john-doe",
            "email": "john@doe.com",
            "age": "21",
            "gender": "Male",
            "add_note": "appointment for discussion",
            "appointment_type": [self.meeting.id],
        }
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_appointments(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("appointment-list")
        response = self.client.get(url, format="json")
        appointment = Appointment.objects.filter(selected_date__gte=self.today)
        serializer = AppointmentSerializer(appointment, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_appointment(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("appointment-detail", kwargs={"pk": self.appointment[0].id})
        response = self.client.get(url, format="json")
        self.assertEqual(response.data["email"], "john123@doe.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_client_appointments_list(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.client_token.key)
        request = self.factory.get("appointment-list", format="json")
        force_authenticate(request, user=self.client_user)
        view = AppointmentViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.data[0]["email"], "john123@doe.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_service_appointments_list(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        request = self.factory.get("appointment-list", format="json")
        force_authenticate(request, user=self.service_user)
        view = AppointmentViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.data[0]["start_time"], "10:51:00")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_appointment(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("appointment-detail", kwargs={"pk": self.appointment[0].id})
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_appointment(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.service_token.key)
        url = reverse("appointment-detail", kwargs={"pk": self.appointment[0].id})
        data = {
            "service_provider": self.service_user.id,
            "client": self.client_user.id,
            "selected_date": "2023-01-20",
            "session": self.session.id,
            "start_time": "09:30:00",
            "end_time": "10:30:00",
            "name": "david-doe",
            "email": "john@doe.com",
            "age": "22",
            "address": "address",
            "gender": "Male",
            "add_note": "appointment for regular checkup",
            "appointment_type": [self.meeting.id],
        }
        response = self.client.put(url, data=data, format="json")
        self.assertEqual(len(response.data), 22)
        self.assertEqual(response.data["add_note"], "appointment for regular checkup")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_str_is_equal_to_appointment_name(self):
        """
        Method `__str__` should be equal to field `name`
        """
        appointment = Appointment.objects.get(pk=1)
        self.assertEqual(str(appointment), appointment.name)


class AppointmentSessionTestCase(APITestCase):
    def setUp(self):
        self.session_user = User.objects.create_user(
            username="session_user", email="prohn@doe.com", password="Pass@123"
        )
        self.session_user_token = Token.objects.create(user=self.session_user)
        self.session_user_token.save()
        self.session = AppointmentSession.objects.create(type="Morning")

    def test_create_appointment_session(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.session_user_token.key
        )
        url = reverse("appointment_session-list")
        data = {"type": "Evening"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.data["type"], "Evening")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_appointment_session_list(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.session_user_token.key
        )
        url = reverse("appointment_session-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_appointment_session(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.session_user_token.key
        )
        url = reverse("appointment_session-detail", kwargs={"pk": self.session.id})
        response = self.client.get(url, format="json")
        self.assertEqual(response.data["type"], "Morning")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_appointment_session(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.session_user_token.key
        )
        url = reverse("appointment_session-detail", kwargs={"pk": self.session.id})
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_str_is_equal_to_appointment_session_type(self):
        """
        Method `__str__` should be equal to field `type`
        """
        appointment_session = AppointmentSession.objects.get(pk=1)
        self.assertEqual(str(appointment_session), appointment_session.type)

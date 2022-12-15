from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import json

CALENDLY_URL = 'https://api.calendly.com/'


class CalendlyAPIView(APIView):
    endpoint = None

    def get_post_data(self):
        return {}

    def get_data(self):
        return {}

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(self.endpoint, params=self.get_data(), headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.post(self.endpoint, json=self.get_post_data(), params=self.get_data(),
                                headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateUserIdView(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}/users/me"


class ListUserEventsView(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}event_types"

    def get_data(self):
        return self.request.data


class UserEventView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'event_types/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListEventsAvailableTimesView(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}event_type_available_times"

    def get_data(self):
        return self.request.data


class UserBusyTime(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}user_busy_times"

    def get_data(self):
        return self.request.data


class UserAvailabilitySchedules(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}user_availability_schedules"

    def get_post_data(self):
        return self.request.data


class UserAvailabilitySchedule(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'user_availability_schedules/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class DeleteInviteeData(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}data_compliance/deletion/invitees"

    def get_post_data(self):
        return self.request.data.get("email")


class ListOrganizationInvitation(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'organizations/' + request.data.get('uuid') + '/invitations',
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class InviteUserToOrganizations(APIView):

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.post(CALENDLY_URL + 'organizations/' + request.data.get('uuid') + '/invitations',
                                json=request.data,
                                headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class RevokeUserOrganizationInvitation(APIView):

    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.delete(
                CALENDLY_URL + 'organizations/' + request.data.get('org-uuid') + '/invitations/' + request.data.get(
                    'uuid'),
                headers=headers)
            return Response(req, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GetOrganizationInvitation(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(
                CALENDLY_URL + 'organizations/' + request.data.get('org-uuid') + '/invitations/' + request.data.get(
                    'uuid'),
                headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GetOrganizationMembership(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'organization_memberships/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListOrganizationMembership(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}organization_memberships"

    def get_data(self):
        return self.request.data


class RemoveUserFromOrganization(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.delete(CALENDLY_URL + 'organization_memberships/' + request.data.get('uuid'),
                                  headers=headers)
            return Response(req, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListScheduleEventInvitee(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'scheduled_events/' + request.data.get('uuid') + '/invitees',
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListScheduleEvent(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}scheduled_events"

    def get_data(self):
        return self.request.data


class GetScheduleEvent(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'scheduled_events/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateInviteeNoShow(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}invitee_no_shows"

    def get_post_data(self):
        return self.request.data


class GetInviteeNoShow(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(CALENDLY_URL + 'invitee_no_shows/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class DeleteInviteeNoShow(APIView):

    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.delete(CALENDLY_URL + 'invitee_no_shows/' + request.data.get('uuid'),
                                  headers=headers)
            return Response(req, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CancelScheduleEvent(APIView):

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.post(CALENDLY_URL + 'scheduled_events/' + request.data.get('uuid') + '/cancellation',
                                json=request.data.get('reason'),
                                headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateWebhookSubscription(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}webhook_subscriptions"

    def get_post_data(self):
        return self.request.data


class ListWebhookSubscriptions(CalendlyAPIView):
    endpoint = f"{CALENDLY_URL}webhook_subscriptions"

    def get_data(self):
        return self.request.data


class GetWebhookSubscriptions(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get(CALENDLY_URL + 'webhook_subscriptions/' + request.data.get('webhook-uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class DeleteWebhookSubscriptions(APIView):

    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.delete(CALENDLY_URL + 'webhook_subscriptions/' + request.data.get('webhook-uuid'),
                                  headers=headers)
            return Response(req, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import json


class CreateUserIdView(APIView):

    def get(self, request, *args, **kwargs):
        try:

            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/users/me', headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListEventsView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                 "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/event_types', params=request.data, headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class UserEventView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                 "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/event_types/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListEventsAvailableTimesView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                 "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/event_type_available_times/', params=request.data, headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)



class UserBusyTime(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                 "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/user_busy_times', params=request.data, headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)



class UserAvailabilitySchedules(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get('https://api.calendly.com/user_availability_schedules', params=request.data, headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)



class UserAvailabilitySchedule(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                 "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/user_availability_schedules/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class DeleteInviteeData(APIView):
    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.post('https://api.calendly.com/data_compliance/deletion/invitees', json=request.data.get('email'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)



class ListOrganizationInvitation(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                 "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/organizations/' + request.data.get('uuid') + '/invitations',                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class InviteUserToOrganizations(APIView):
    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            jsons = {
                "email" : request.data.get('email')
            }
            req = requests.post(
                'https://api.calendly.com/organizations/' + request.data.get('uuid') + '/invitations', json=jsons,
                headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class RevokeUserOrganizationInvitation(APIView):

    def delete(self, request, *args, **kwargs):
            try:
                headers = {
                    "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
                }
                req = requests.delete('https://api.calendly.com/organizations/'+request.data.get('org-uuid')+'/invitations/'+request.data.get('uuid'),
                                   headers=headers)
                load = json.loads(req.text)
                return Response(load, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)



class GetOrganizationInvitation(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/organizations/'+request.data.get('org-uuid')+'/invitations/'+request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GetOrganizationMembership(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/organization_memberships/'+request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListOrganizationMembership(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/organization_memberships',params=request.data,
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class RemoveUserFromOrganization(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.delete("https://api.calendly.com/organization_memberships/"+request.data.get('uuid'), headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListScheduleEventInvitee(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/scheduled_events/'+request.data.get('uuid')+'/invitees',
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListScheduleEvent(APIView):
    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION', '')
            }
            req = requests.get('https://api.calendly.com/scheduled_events', params=request.data,
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

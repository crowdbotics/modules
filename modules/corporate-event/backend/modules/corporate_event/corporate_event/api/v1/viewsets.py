import os
from django.db.models import F
from django.http import HttpResponseRedirect
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView

from .serializers import (
    UserSessionSerializer, EventsActivitySerializer, UserRequestSerializer, ConnectProfileSerializer,
    AboutTeamAndBoardSerializer, OfferigsPageSerializer, HomeSessionSerializer, HomeActivitiesSerializer
)
from modules.corporate_event.corporate_event.models import UserSession, Activities, UserConnectRequest, ConnectProfile, AboutTeamAndBoardMember, \
    UserActivities, Session, OfferigsPage, SessionAttachment, ActivitiesAttachment, MetaLink

from modules.corporate_event.corporate_event.utils import send_invitation_email



class UserSessionViewset(ModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    serializer_class = UserSessionSerializer

    def get_queryset(self):
        return Session.objects.filter().all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SessionActivitiesViewset(ModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    serializer_class = EventsActivitySerializer

    def get_queryset(self):
        return Activities.objects.all()


class HomeViewSets(ModelViewSet):
    queryset = UserSession.objects.all()
    http_method_names = ['get']
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    def list(self, request, *args, **kwargs):
        event_dates = self.get_queryset().values('session__date').distinct()
        activity_dates = UserActivities.objects.filter(user=self.request.user).values('activity__date').distinct()
        event_dates = event_dates.union(activity_dates)
        data = {
            'user': self.request.user.first_name,
            'data': []
        }
        all_session_attachments = SessionAttachment.objects.all()
        all_activity_attachments = ActivitiesAttachment.objects.all()
        if event_dates:
            for date in event_dates:
                # add session and activity attachments lists
                sessions = self.get_queryset().filter(
                    session__date=date.get('session__date')
                ).select_related('session').prefetch_related('session__session_attachment')
                s_data = HomeSessionSerializer(sessions, many=True, context={
                    "request": request, "all_session_attachments": all_session_attachments,
                }).data

                activities = UserActivities.objects.filter(
                    activity__date=date.get('session__date'), user=self.request.user
                ).select_related('activity').prefetch_related('activity__activity_attachment')
                a_data = HomeActivitiesSerializer(activities, many=True, context={
                    "request": request, "all_activity_attachments": all_activity_attachments,
                }).data

                all_sessions = s_data + a_data

                # sort sessions by date
                all_sessions = sorted(all_sessions, key=lambda k: k['start_time_stamp'])

                data['data'].append({
                    "date": str(date.get('session__date')),
                    "datestamp": date.get('session__date'),
                    "session_data": all_sessions
                })
            # sort data by date
            data['data'] = sorted(data['data'], key=lambda k: k['date'])
        return Response(data)


class UserConnectViewSet(ModelViewSet):
    queryset = ConnectProfile.objects.all()
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    serializer_class = ConnectProfileSerializer


    def get_queryset(self):
        return ConnectProfile.objects.filter(
            show_profile=True
        ).order_by(
            # alphabetical order of last name ascending
            F('user__last_name').asc(nulls_last=True)
        )

    @action(methods=['post'], detail=False)
    def send_request(self, request):
        ADMIN_EMAIL_RECEIVERS = os.environ.get('ADMIN_EMAIL_RECEIVERS', "")
        ADMIN_EMAIL_RECEIVERS = ADMIN_EMAIL_RECEIVERS.split(',')
        try:
            user = self.request.user
            requestee = request.data.get('email')
            requestee_user = self.queryset.get(user__email=requestee)
            if requestee_user:
                try:
                    if UserConnectRequest.objects.filter(requester=user, requestee__user__email=requestee,
                                                         status="Pending").exists():
                        return Response({"message": "Invitation is already sent to this user"}, status=status.HTTP_400_BAD_REQUEST)
                    serializer = UserRequestSerializer(data={"requester": user.id, "requestee": requestee_user.id})
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    send_invitation_email(
                        recipient_email=ADMIN_EMAIL_RECEIVERS,
                        sender_email=user.email,
                        requestee_user=requestee_user.user,
                        sender=user,
                        host=request.get_host()
                    )
                except Exception as e:
                    return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

                return Response(
                    {'message': "your request has been submitted to the 3Seven Concierge Team", 'status': status.HTTP_200_OK},
                    status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args, "status": status.HTTP_400_BAD_REQUEST})


class UserRequestViewSet(ModelViewSet):
    queryset = UserConnectRequest.objects.all()
    serializer_class = UserRequestSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(requestee__user=user)

    def perform_update(self, serializer):
        serializer.save(status=self.request.data['status'])


class AboutTeamAndBoardViewSet(ModelViewSet):
    queryset = AboutTeamAndBoardMember.objects.all()
    serializer_class = AboutTeamAndBoardSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        return self.queryset

    @action(methods=['get'], detail=False)
    def team_members(self, request):
        response = self.get_queryset().filter(select='Team')
        serializer = AboutTeamAndBoardSerializer(data=list(response), many=True, context={"request": request})
        serializer.is_valid()
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def board_members(self, request):
        response = self.get_queryset().filter(select='Board')
        serializer = AboutTeamAndBoardSerializer(data=list(response), many=True, context={"request": request})
        serializer.is_valid()
        return Response(serializer.data)


def confirm_view(request):
    email = request.GET.get('email')
    if user_connect := UserConnectRequest.objects.filter(requestee__user__email=email, status='Pending'):
        user_connect.update(status="Accepted")

    return render(request, 'confirm.html')


class OfferigsPageViewSet(ModelViewSet):
    serializer_class = OfferigsPageSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        return OfferigsPage.objects.all()


class MetaLinkAPIView(APIView):
    def get(self, request):
        slug = request.GET.get('slug')
        link = MetaLink.objects.filter(slug=slug).first()
        if link:
            if link.file:
                return HttpResponseRedirect(link.file.url)
            else:
                return HttpResponseRedirect(link.link)
        else:
            return Response({"message": "Not found"}, status=status.HTTP_404_NOT_FOUND)
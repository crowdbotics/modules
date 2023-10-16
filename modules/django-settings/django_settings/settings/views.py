from rest_framework import permissions, status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserAppSetting
from .serializers import UserAppSettingsSerializer


class GetUserAppSettingsView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Get User app settings.
        Authentication: (Token) Required.
        Return: Return all User app settings.
        """
        queryset = UserAppSetting.objects.filter(user=self.request.user)
        serializer = UserAppSettingsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateUserSettingsView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, setting_id):
        return UserAppSetting.objects.get(user=self.request.user, setting_id=setting_id)

    def patch(self, request):
        """
        Update user requested app settings.
        body_param: "setting" : setting_id that have to be updated
        body_param: "selected_state" : state_id that have to be select
        Authentication: (Token) Required.
        Return: Return Updated setting object related to user.
        """
        queryset = self.get_object(setting_id=request.data.get('setting'))
        if not queryset.setting.type == 'MULTI_SELECT' and len(request.data['current_choices']) > 1:
            return Response({"error": "Can't send multiple selected_state id's for selected setting"},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = UserAppSettingsSerializer(queryset, data=self.request.data, partial=True,
                                               context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

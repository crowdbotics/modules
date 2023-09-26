from rest_framework import permissions, status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Report, ContentType, Choices
from .serializers import ReportSerializer


class CreateReportView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Create a report for content.
        Authentication: (Token) Required.
        body_params: "model_name", "reported_id", "reason", "other"
        Return: Created reported detail with content id.
        """
        content_type = ContentType.objects.get(model=request.data.get('model_name')).id
        self.request.data['model_name'] = content_type
        serializer = ReportSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Content reported successfully",
                         "report_id": serializer.data['id']
                         },
                        status=status.HTTP_201_CREATED)


class GetReportView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Get all reported content.
        Authentication: (Token) Required.
        Return: Return all reports to admin and user's reports to user.
        """
        queryset = Report.objects.all()
        if not request.user.is_superuser:
            queryset = queryset.filter(reported_by=self.request.user)
        serializer = ReportSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChoicesView(APIView):
    """
    Return all the available reason's choices list with id and value.
    """

    def get(self, request):
        choices = []
        choice_dict = dict(Choices.REPORT_CHOICES)
        for i, v in choice_dict.items():
            value = {'id': i, 'value': v}
            choices.append(value)
        return Response(choices, status=status.HTTP_200_OK)

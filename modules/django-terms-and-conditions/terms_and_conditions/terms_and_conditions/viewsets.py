from rest_framework import authentication
from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAdminUser
from .models import TermAndCondition
from .serializers import TermAndConditionSerializer
from rest_framework import viewsets


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        """
        has_permission Grants permission to the authenticated user. Method will be called on all (GET, POST, PUT, DELETE) HTTP request.
        :param request: Method to make https requests.
        """
        return request.method in SAFE_METHODS

class TermAndConditionViewSet(viewsets.ModelViewSet):
    serializer_class = TermAndConditionSerializer
    permission_classes = [IsAdminUser|ReadOnly] #Makes it Read-only unless admin
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )

    # This query will only return a single (if it exists) T&C string, and that will be 
    # the most recently updated one that *also* has an active flag. You must set at least
    # one T&C object to active for this to work.
    queryset = TermAndCondition.objects.filter(is_active=True).order_by('-updated_at')[0:1]

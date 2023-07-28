from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(ModelViewSet):
    """
    A generic profile module provide CRUD functionality of user profile such as
     - Create : create the user profile
     - Get: get the user's specific profile detail by ID
     - Delete : delete the user profile by ID
     - Patch : Edit the user profile ID
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete', 'patch']

    def get_queryset(self):
        """
        Get the profile data of the requested user
        """
        user = self.request.user
        return self.queryset.filter(user=user)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset().first(), many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Create the user profile
        :body_params : user, first_name, last_name, phone, country, city, state, /n
                        profile_image,address,zip_code,birthday, gender, age
        :return : A created profile id and detail
        """

        if profile := self.get_queryset().first():
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)

        super().create(request=request)
        return Response({"message": "Profile created successfully."}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        """
        Delete the user profile by ID
        :path_params: ID of user profile
        :return : 204 no content
        """
        instance = self.get_queryset()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

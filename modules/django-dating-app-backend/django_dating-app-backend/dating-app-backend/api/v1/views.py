from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.db.models import Q

from .serializers import (
    ProfileSerializer
)

from ...models import MatchDenied, UserProfile, MatchRequest, Match

User = get_user_model()

class ProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

    def get(self, request):
        user = request.user
        if not user.id:
            return Response({"message": "User not found"}, status=404)
        serializer = ProfileSerializer(user, context={'request': request})
        return Response(serializer.data)

class ProfileDetailsView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

    def get(self, request):
        user = request.user
        if not user.id:
            return Response({"message": "User not found"}, status=404)
        
        profile_id = request.GET.get("id")
        profile = User.objects.get(id=profile_id)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

class AllProfilesView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

    def get(self, request):
        user = request.user
        if not user.id:
            return Response({"message": "User not found"}, status=404)
        excluded_user_ids = [user.id]
        denied_matches = MatchDenied.objects.filter(
            user=user
        ).values_list('match_denied_with_id', flat=True)
        asked_matches = MatchRequest.objects.filter(
            user=user
        ).values_list('match_request_for_id', flat=True)
        excluded_user_ids.extend(denied_matches)
        excluded_user_ids.extend(asked_matches)
        profiles = User.objects.exclude(id__in=excluded_user_ids)
        serializer = ProfileSerializer(profiles, many=True, context={'request': request})
        return Response(serializer.data)


class GetMatchesView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

    def get(self, request):
        user = request.user
        if not user.id:
            return Response({"message": "User not found"}, status=404)

        # Get all matches for the user
        users = Match.objects.filter(
            Q(user=user) | Q(match_with=user)
        ).values_list('user', 'match_with')

        # Get all users that have been matched with the user
        # lambda functions
        mached_for = [u[0] for u in users]
        matched = [u[1] for u in users]
        all_users = list(set(list(mached_for) + list(matched)))
        
        user_objects = User.objects.filter(id__in=all_users).exclude(id=user.id)
        serializer = ProfileSerializer(user_objects, many=True, context={'request': request})
        return Response(serializer.data)

class ProfileSetupView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

    def post(self, request):
        user = request.user
        name = request.data.get('name')
        biography = request.data.get('biography')
        birthday = request.data.get('birthday')
        gender = request.data.get('gender')
        city = request.data.get('city')
        country = request.data.get('country')

        up = UserProfile.objects.get(user=user)
        up.user.name = name
        up.bio = biography
        up.birth_date = birthday
        up.gender = gender
        up.city = city
        up.country = country
        up.save()
        up.user.save()
        return Response(status=200)
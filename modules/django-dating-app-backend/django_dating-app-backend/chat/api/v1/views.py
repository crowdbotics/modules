from django.db.models import Q

from rest_framework import generics, permissions, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ChatSerializer, UserChatSerializer
from ...models import ChatMessage
from django.contrib.auth import get_user_model

User =  get_user_model()

class ChatListView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        chats = ChatMessage.objects.filter(
            Q(sender=user) | Q(receiver=user)
        ).values_list("sender", 'receiver').distinct()
        # iterate over chats and get the other user
        senders = [ user[0] for user in chats ]
        receivers = [ user[1] for user in chats ]
        all_users = list(set(senders + receivers))
        users = User.objects.filter(id__in=all_users).exclude(id=user.id)
        serializer = UserChatSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)


class ChatDetailView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        user = request.user
        chat = ChatMessage.objects.filter(
            Q(Q(sender=user), Q(receiver=pk)) | Q(Q(sender=pk), Q(receiver=user))
        ).order_by('created_at')

        serializer = ChatSerializer(chat, many=True, context={'request': request})
        resp = {
            'messages': serializer.data,
            'user': UserChatSerializer(User.objects.get(id=pk), context={'request': request}).data
        }
        return Response(resp)


class SendMessageView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        sender = user
        receiver = data['receiver']
        message = data['message']
        reply_to = data['reply_to'] if 'reply_to' in data else None
        chat = ChatMessage.objects.create(
            sender=sender,
            receiver_id=receiver,
            text=message
        )
        serializer = ChatSerializer(chat, context={'request': request})
        return Response(serializer.data)
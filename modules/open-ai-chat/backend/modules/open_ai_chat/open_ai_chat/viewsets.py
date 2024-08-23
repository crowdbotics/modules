import os
import json
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

from .services.OpenAI import OpenAI

from .models import Conversation, Message, OpenAIConfig

# Create your views here.
class ConversationViewSet(viewsets.ViewSet):
    def list(self, request):
        if not request.session.session_key:
            request.session.create()
        session = request.session.session_key
        chat = Conversation.objects.filter(session=session).first()
        messages = Message.objects.filter(conversation=chat)
        resp = {
            'summary': chat.summary if chat else None,
            'messages': []
        }
        """
        [{
            role: 'user',
            content: 'That sounds great! How can I get in touch with you?',
            created_at: new Date().toISOString(),
        },]
        """

        for message in messages:
            resp['messages'].append({
                'role': "user",
                'content': message.content,
                'created_at': message.created_at,
            })
            if message.response:
                resp['messages'].append({
                    'role': "AI",
                    'content': message.response,
                    'created_at': message.created_at,
                })

        return Response(resp)


    def get_context(self, obj):
        config = OpenAIConfig.objects.filter(is_active=True, global_config=True).first()
        if not config:
            return []
        use_context = config.use_context
        context_length = config.context_length
        only_questions_in_context = config.only_questions_in_context
        summarize_context = config.summarize_context
        initial_context = config.initial_context
        context = [{"role": "system", "content": initial_context},]
        if use_context:
            messages = Message.objects.filter(conversation=obj).order_by('-created_at')[:context_length]
            for message in messages:
                if only_questions_in_context and message.content:
                    context.append({"role": "user", "content": message.content})
                else:
                    if message.content:
                        context.append({"role": "user", "content": message.content})
                    if message.response:
                        context.append({"role": "assistant", "content": message.response})
        if summarize_context:
            summary = obj.summary
            if summary:
                context.append({"role": "system", "content": summary})
        return context

    def create(self, request):
        if not request.session.session_key:
            request.session.create()
        session = request.session.session_key
        user_id = request.user.id if request.user.is_authenticated else None
        q = request.data.get('q')

        conv_obj, created = Conversation.objects.get_or_create(session=session)
        if created:
            conv_obj.summary = q
            if user_id:
                conv_obj.user_id = user_id
            conv_obj.save()
        
        context = self.get_context(conv_obj)

        obj = Message.objects.create(
            conversation=conv_obj,
            role='user',
            content=q,
        )
        
        client = OpenAI()
        response = client.ask(q, context)
        
        # clean response
        response = response.split('Summary')[0]
        chat_summary = response.split('Summary')[-1].split('summary')[-1]
        obj.response = response
        conv_obj.summary = chat_summary
        obj.save()
        conv_obj.save()

        return Response({
            'q': q,
            'bot': response
        })
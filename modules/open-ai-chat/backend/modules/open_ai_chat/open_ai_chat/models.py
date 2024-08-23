import uuid
from django.db import models
from django.conf import settings

class Conversation(models.Model):
    session = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    summary = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.session}"


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, null=True, blank=True)
    role = models.CharField(max_length=255, null=True, blank=True)
    content = models.TextField()
    response = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.id} - {self.content}"
    

class OpenAIConfig(models.Model):

    MODELS = [
        ("gpt-3.5-turbo", "gpt-3.5-turbo"),
        ("gpt-3.5-turbo-1106", "gpt-3.5-turbo-1106"),
        ("gpt-3.5-turbo-16k", "gpt-3.5-turbo-16k"),
        ("gpt-4-0314", "gpt-4-0314")
    ]
        
    model = models.CharField(max_length=255, null=True, blank=True, choices=MODELS)
    max_tokens = models.IntegerField(null=True, blank=True, default=1000)
    use_context = models.BooleanField(default=True, help_text="Use context from previous messages")
    context_length = models.IntegerField(null=True, blank=True, default=3, help_text="Number of previous messages to use as context")
    only_questions_in_context = models.BooleanField(default=False, help_text="Only use questions in context")
    summarize_context = models.BooleanField(default=True, help_text="use summary as context")
    initial_context = models.TextField(null=True, blank=True, help_text="Initial context to use e.g. You are a crowdbotics assistant.")
    is_active = models.BooleanField(default=True, help_text="Is this config active")
    global_config = models.BooleanField(default=False, help_text="Is this config global")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return f"{self.id} - {self.model}"
    
    class Meta:
        verbose_name = "OpenAI Config"
        verbose_name_plural = "OpenAI Configs"


class UserConfig(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    config = models.ForeignKey(OpenAIConfig, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
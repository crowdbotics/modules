from rest_framework import serializers
from .models import FormDefinition, FormAnswers


class FormDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormDefinition
        fields = "__all__"


class FormAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormAnswers
        fields = "__all__"

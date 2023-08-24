from rest_framework import serializers

from .models import FormDefinition, FormAnswers


class FormAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormAnswers
        fields = '__all__'


class FormDefinitionSerializer(serializers.ModelSerializer):
    form_answers = FormAnswersSerializer(many=True, read_only=True)

    class Meta:
        model = FormDefinition
        fields = '__all__'

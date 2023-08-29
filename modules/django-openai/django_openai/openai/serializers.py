from rest_framework import serializers


class CreateMessageSerializer(serializers.Serializer):
    role = serializers.CharField(required=True)
    content = serializers.CharField()


class CreateChatCompletionSerializer(serializers.Serializer):
    model = serializers.CharField(required=True)
    messages = CreateMessageSerializer(many=True, required=True)


class CreateCompletionSerializer(serializers.Serializer):
    model = serializers.CharField(required=True)
    prompt = serializers.CharField()
    max_tokens = serializers.IntegerField()
    temperature = serializers.IntegerField()


class CreateEditsSerializer(serializers.Serializer):
    model = serializers.CharField(required=True)
    input = serializers.CharField()
    instruction = serializers.CharField(required=True)


class CreateImageSerializer(serializers.Serializer):
    prompt = serializers.CharField(required=True)
    n = serializers.IntegerField()
    size = serializers.CharField(required=True)


class CreateTranscriptionSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)
    model = serializers.CharField(required=True)


class CreateTranslationSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)
    model = serializers.CharField(required=True)
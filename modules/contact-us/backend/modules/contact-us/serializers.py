from rest_framework import serializers

class MessageSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=200)
    message = serializers.CharField(max_length=250)

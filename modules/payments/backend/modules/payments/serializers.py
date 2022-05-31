from rest_framework import serializers


class appleIAPSerializer(serializers.Serializer):
	productId = serializers.CharField()
	transactionDate = serializers.CharField()
	transactionId = serializers.CharField()
	transactionReceipt = serializers.CharField()
	user = serializers.SerializerMethodField(required=False)
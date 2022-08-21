from rest_framework import serializers
from oscarapi.serializers import basket

from oscar.core.loading import get_model


Basket = get_model("basket", "Basket")

class BasketSerializer(basket.BasketSerializer):
    test = serializers.SerializerMethodField()

    def get_test(self, obj):
        return "test"

    class Meta:
        model = Basket
        fields = basket.BasketSerializer.Meta.fields + ("test",)
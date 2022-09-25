from oscar.core.loading import get_model
from oscarapi.permissions import IsOwner
from oscarapi.utils.loading import get_api_class
from rest_framework import generics

from django.conf import settings



OrderSerializer = get_api_class("serializers.checkout", "OrderSerializer")
Order = get_model("order", "Order")


class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsOwner,)

    def get_queryset(self):
        qs = Order.objects.all()
        if self.request.query_params.get('ongoing'):
            # Filter out orders that are not in progress
            status_list = [settings.ORDER_STATUS_AUTHORIZED, settings.ORDER_BEING_PREPARED, settings.ORDER_WAITING_PICKUP, settings.ORDER_ON_THE_WAY]
            qs = qs.filter(status__in=status_list)
        return qs.filter(user=self.request.user)

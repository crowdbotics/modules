import warnings
from django.urls import reverse, NoReverseMatch
from oscarapi.utils.loading import get_api_classes
from django.utils.translation import gettext as _
from rest_framework import serializers
from oscarapi.serializers import checkout
from oscar.core.loading import get_model
from oscarapi.serializers.utils import OscarModelSerializer
from oscarapi.utils.settings import overridable
from oscarapi.serializers.fields import (
    DrillDownHyperlinkedRelatedField,
)


StockRecord = get_model("partner", "StockRecord")
Order = get_model("order", "Order")
OrderLine = get_model("order", "Line")

(InlineShippingAddressSerializer, InlineBillingAddressSerializer, InlineSurchargeSerializer,
 OrderOfferDiscountSerializer, OrderVoucherOfferSerializer, OrderLineAttributeSerializer) = get_api_classes(
    "serializers.checkout",
    ['InlineShippingAddressSerializer', 'InlineBillingAddressSerializer', 'InlineSurchargeSerializer',
     'OrderOfferDiscountSerializer', 'OrderVoucherOfferSerializer', 'OrderLineAttributeSerializer'])


class CountrySerializer(checkout.CountrySerializer):
    is_benelux_country = serializers.SerializerMethodField()

    def get_is_benelux_country(self, obj):
        return obj.iso_3166_1_a2.lower() in ("nl", "be", "lu")


class OrderLineSerializer(OscarModelSerializer):
    "This serializer renames some fields so they match up with the basket"

    url = serializers.HyperlinkedIdentityField(view_name="order-lines-detail")
    attributes = OrderLineAttributeSerializer(
        many=True, fields=("url", "option", "value"), required=False
    )
    price_currency = serializers.CharField(source="order.currency", max_length=12)
    price_excl_tax = serializers.DecimalField(
        decimal_places=2, max_digits=12, source="line_price_excl_tax"
    )
    price_incl_tax = serializers.DecimalField(
        decimal_places=2, max_digits=12, source="line_price_incl_tax"
    )
    price_incl_tax_excl_discounts = serializers.DecimalField(
        decimal_places=2, max_digits=12, source="line_price_before_discounts_incl_tax"
    )
    price_excl_tax_excl_discounts = serializers.DecimalField(
        decimal_places=2, max_digits=12, source="line_price_before_discounts_excl_tax"
    )
    stockrecord = DrillDownHyperlinkedRelatedField(
        view_name="product-stockrecord-detail",
        extra_url_kwargs={"product_pk": "product_id"},
        queryset=StockRecord.objects.all(),
    )


    class Meta:
        model = OrderLine
        fields = overridable(
            "OSCARAPI_ORDERLINE_FIELDS",
            default=(
                "attributes",
                "id",
                "url",
                "stockrecord",
                "quantity",
                "price_currency",
                "price_excl_tax",
                "price_incl_tax",
                "price_incl_tax_excl_discounts",
                "price_excl_tax_excl_discounts",
                "order",
            ),
        )


class OrderSerializer(OscarModelSerializer):
    """
    The order serializer tries to have the same kind of structure as the
    basket. That way the same kind of logic can be used to display the order
    as the basket in the checkout process.
    """

    owner = serializers.HyperlinkedRelatedField(
        view_name="user-detail", read_only=True, source="user"
    )
    # lines = serializers.SerializerMethodField()
    shipping_address = InlineShippingAddressSerializer(many=False, required=False)
    billing_address = InlineBillingAddressSerializer(many=False, required=False)
    lines = OrderLineSerializer(many=True)
    email = serializers.EmailField(read_only=True)

    payment_url = serializers.SerializerMethodField()
    offer_discounts = serializers.SerializerMethodField()
    voucher_discounts = serializers.SerializerMethodField()
    surcharges = InlineSurchargeSerializer(many=True, required=False)
    drone_info = serializers.SerializerMethodField()
    stripe_payment_intent = serializers.SerializerMethodField()

    def get_lines(self, obj):
        lines = obj.lines.all()
        return [line.to_dict() for line in lines]

    def get_stripe_payment_intent(self, obj):
        stripe_intent = self.context.get('stripe_payment_intent', {})
        return stripe_intent

    def get_drone_info(self, obj):
        response = {}
        if hasattr(obj, 'assigned_drone'):
            response = {
                'id': obj.assigned_drone.id,
                'name': obj.assigned_drone.name,
                'api_drone_id': obj.assigned_drone.api_drone_id
            }
        return response

    def get_offer_discounts(self, obj):
        qs = obj.basket_discounts.filter(offer_id__isnull=False)
        return OrderOfferDiscountSerializer(qs, many=True).data

    def get_voucher_discounts(self, obj):
        qs = obj.basket_discounts.filter(voucher_id__isnull=False)
        return OrderVoucherOfferSerializer(qs, many=True).data

    def get_payment_url(self, obj):
        try:
            return reverse("api-payment", args=(obj.pk,))
        except NoReverseMatch:
            msg = (
                "You need to implement a view named 'api-payment' "
                "which redirects to the payment provider and sets up the "
                "callbacks."
            )
            warnings.warn(msg)
            return msg

    class Meta:
        model = Order
        fields = overridable(
            "OSCARAPI_ORDER_FIELDS",
            default=(
                "id",
                "number",
                "basket",
                "url",
                "lines",
                "owner",
                "billing_address",
                "currency",
                "total_incl_tax",
                "total_excl_tax",
                "shipping_incl_tax",
                "shipping_excl_tax",
                "shipping_address",
                "shipping_method",
                "shipping_code",
                "status",
                "email",
                "date_placed",
                "payment_url",
                "offer_discounts",
                "voucher_discounts",
                "surcharges",
                'drone_info',
                'stripe_payment_intent'
            ),
        )


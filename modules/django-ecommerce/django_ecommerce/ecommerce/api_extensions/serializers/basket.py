from oscarapi.utils.loading import get_api_class
from rest_framework import serializers
from decimal import Decimal
from django.contrib.auth import get_user_model

from oscarapi.basket import operations
from oscar.core.loading import get_model, get_class
from oscarapi.utils.settings import overridable
from oscarapi.serializers.fields import (
    DrillDownHyperlinkedRelatedField,
    TaxIncludedDecimalField, DrillDownHyperlinkedIdentityField
)
from oscarapi.serializers.utils import OscarModelSerializer
from oscarapi.serializers.basket import OfferDiscountSerializer
from oscarapi.serializers.basket import TaxIncludedDecimalField, VoucherDiscountSerializer
from rest_framework.response import Response


Basket = get_model("basket", "Basket")
Line = get_model("basket", "Line")
Product = get_model("catalogue", "Product")
LineAttribute = get_model("basket", "LineAttribute")
StockRecord = get_model("partner", "StockRecord")
User = get_user_model()
Repository = get_class('shipping.repository', 'Repository')
OrderTotalCalculator = get_class("checkout.calculators", "OrderTotalCalculator")


class LineAttributeSerializer(OscarModelSerializer):

    class Meta:
        model = LineAttribute
        exclude = ['price']


class BasketLineSerializer(OscarModelSerializer):
    """
    This serializer computes the prices of this line by using the basket
    strategy.
    """

    url = DrillDownHyperlinkedIdentityField(
        view_name="basket-line-detail", extra_url_kwargs={"basket_pk": "basket.id"}
    )
    attributes = LineAttributeSerializer(
        many=True, required=False, read_only=True
    )
    price_excl_tax = serializers.DecimalField(
        decimal_places=2,
        max_digits=12,
        source="line_price_excl_tax_incl_discounts",
        read_only=True,
    )
    price_incl_tax = TaxIncludedDecimalField(
        decimal_places=2,
        max_digits=12,
        excl_tax_field="line_price_excl_tax_incl_discounts",
        source="line_price_incl_tax_incl_discounts",
        read_only=True,
    )
    price_incl_tax_excl_discounts = TaxIncludedDecimalField(
        decimal_places=2,
        max_digits=12,
        excl_tax_field="line_price_excl_tax",
        source="line_price_incl_tax",
        read_only=True,
    )
    price_excl_tax_excl_discounts = serializers.DecimalField(
        decimal_places=2, max_digits=12, source="line_price_excl_tax", read_only=True
    )
    warning = serializers.CharField(
        read_only=True, required=False, source="get_warning"
    )

    stockrecord = DrillDownHyperlinkedRelatedField(
        view_name="product-stockrecord-detail",
        extra_url_kwargs={"product_pk": "product_id"},
        queryset=StockRecord.objects.all(),
    )


    class Meta:
        model = Line
        fields = overridable(
            "OSCARAPI_BASKETLINE_FIELDS",
            default=(
                "id",
                "url",
                "quantity",
                "attributes",
                "price_currency",
                "price_excl_tax",
                "price_incl_tax",
                "price_incl_tax_excl_discounts",
                "price_excl_tax_excl_discounts",
                "is_tax_known",
                "warning",
                "basket",
                "stockrecord",
                "date_created",
                "date_updated",
            ),
        )

    def to_representation(self, obj):
        # This override is needed to reflect offer discounts or strategy
        # related prices immediately in the response
        operations.assign_basket_strategy(obj.basket, self.context["request"])

        # Oscar stores the calculated discount in line._discount_incl_tax or
        # line._discount_excl_tax when offers are applied. So by just
        # retrieving the line from the db you will loose this values, that's
        # why we need to get the line from the in-memory resultset here
        lines = (x for x in obj.basket.all_lines() if x.id == obj.id)
        line = next(lines, None)

        return super(BasketLineSerializer, self).to_representation(line)


class BasketSerializer(OscarModelSerializer):
    lines = serializers.HyperlinkedIdentityField(view_name="basket-lines-list")
    offer_discounts = OfferDiscountSerializer(many=True, required=False)
    total_excl_tax = serializers.DecimalField(
        decimal_places=2, max_digits=12, required=False
    )
    total_excl_tax_excl_discounts = serializers.DecimalField(
        decimal_places=2, max_digits=12, required=False
    )
    total_incl_tax = TaxIncludedDecimalField(
        excl_tax_field="total_excl_tax", decimal_places=2, max_digits=12, required=False
    )
    total_incl_tax_excl_discounts = TaxIncludedDecimalField(
        excl_tax_field="total_excl_tax_excl_discounts",
        decimal_places=2,
        max_digits=12,
        required=False,
    )
    total_tax = TaxIncludedDecimalField(
        excl_tax_value=Decimal("0.00"), decimal_places=2, max_digits=12, required=False
    )
    currency = serializers.CharField(required=False)
    voucher_discounts = VoucherDiscountSerializer(many=True, required=False)
    owner = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        required=False,
        allow_null=True,
        queryset=User.objects.all(),
    )
    line_details = BasketLineSerializer(many=True, source='lines')
    quantity = serializers.SerializerMethodField()
    delivery_fee = serializers.SerializerMethodField()
    is_shipping_required = serializers.SerializerMethodField()
    shipping_method_code = serializers.CharField(max_length=128, required=False)
    total = serializers.SerializerMethodField()

    def get_quantity(self, obj):
        return obj.num_items

    def get_delivery_fee(self, obj):
        repo = Repository()
        default = repo.get_default_shipping_method(
            basket=obj,
        )
        shipping_charge = default.calculate(obj)
        return str(shipping_charge.incl_tax)

    def get_is_shipping_required(self, obj):
        return obj.is_shipping_required()

    def get_total(self, obj):
        repo = Repository()
        default = repo.get_default_shipping_method(
            basket=obj,
        )
        shipping_charge = default.calculate(obj)
        total = OrderTotalCalculator().calculate(obj, shipping_charge)
        return str(total.incl_tax)

    class Meta:
        model = Basket
        fields = overridable(
            "OSCARAPI_BASKET_FIELDS",
            default=(
                "id",
                "owner",
                "status",
                "lines",
                "url",
                "total_excl_tax",
                "total_excl_tax_excl_discounts",
                "total_incl_tax",
                "total_incl_tax_excl_discounts",
                "total_tax",
                "currency",
                "voucher_discounts",
                "offer_discounts",
                "is_tax_known",
                'line_details',
                'quantity',
                'delivery_fee',
                'is_shipping_required',
                'shipping_method_code',
                'total'
            ),
        )

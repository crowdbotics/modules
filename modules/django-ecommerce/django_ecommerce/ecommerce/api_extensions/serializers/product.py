from rest_framework import serializers
from oscarapi.serializers import product

from oscar.core.loading import get_model
from oscarapi.serializers.product import OptionValueSerializer
from oscarapi.serializers.product import ProductImageSerializer, ProductAttributeValueSerializer

Product = get_model("catalogue", "Product")
StockRecord = get_model('partner', 'StockRecord')


class AddProductSerializer(product.AddProductSerializer):
    quantity = serializers.IntegerField(required=True)
    url = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects, required=True
    )
    options = OptionValueSerializer(many=True, required=False)
    partner_id = serializers.IntegerField(required=True)


class StockRecordSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='product.title')
    images = serializers.SerializerMethodField()
    stock_record_id = serializers.IntegerField(source='id')
    id = serializers.IntegerField(source='product.id')
    price = serializers.SerializerMethodField()
    dicounted_price = serializers.CharField(source='price')
    in_stock = serializers.SerializerMethodField()
    attributes = serializers.SerializerMethodField()

    def get_in_stock(self, obj):
        return obj.net_stock_level > 0

    def get_price(self, obj):
        return obj.price

    def get_images(self, obj):
        return [img.get('original') for img in
                ProductImageSerializer(many=True, instance=obj.product.images.all()).data]

    def get_attributes(self, obj):
        return ProductAttributeValueSerializer(obj.product.attribute_values.all(), many=True).data

    class Meta:
        model = StockRecord
        fields = ('id', 'name', 'stock_record_id', 'in_stock', 'price', 'images', 'dicounted_price', 'attributes')

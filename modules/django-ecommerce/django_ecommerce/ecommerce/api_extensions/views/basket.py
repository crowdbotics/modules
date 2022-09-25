from rest_framework import generics
from oscarapi import permissions
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.serializers import ValidationError

from oscarapi.utils.loading import get_api_classes, get_api_class
from oscarapi.basket import operations
from rest_framework.response import Response
from oscar.apps.basket import signals
from oscar.core.loading import get_model

from ...utils import JsonResponse

AddProductSerializer = get_api_class("serializers.product", "AddProductSerializer")
BasketSerializer = get_api_class("serializers.basket", "BasketSerializer")
BasketLineSerializer = get_api_class("serializers.basket", "BasketLineSerializer")
StockRecord = get_model('partner', 'StockRecord')
Partner = get_model('partner', 'Partner')
Basket = get_model('basket', 'Basket')
Line = get_model('basket', 'Line')


class BasketLineUpdateDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Updates, retrieves, or deletes a basket line.
    """

    queryset = Line.objects.all()
    serializer_class = BasketLineSerializer
    permission_classes = (permissions.RequestAllowsAccessTo,)

    def get_queryset(self):
        basket_pk = self.request.data.get('basket_id')
        product_id = self.request.data.get('product_id')
        qty = self.request.data.get('quantity')
        line = Line.objects.filter(basket__pk=basket_pk, product_id=product_id).first()
        self.kwargs['pk'] = line.pk if line else None
        basket_obj = generics.get_object_or_404(operations.editable_baskets(), pk=basket_pk)
        prepped_basket = operations.prepare_basket(basket_obj, self.request)
        if operations.request_allows_access_to_basket(self.request, prepped_basket):
            return prepped_basket.all_lines()
        else:
            return self.queryset.none()

    def get(self, request, *args, **kwargs):
        data = self.retrieve(request, *args, **kwargs)
        return data

    @swagger_auto_schema(
        operation_summary='Update a basket line',
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def finalize_response(self, request, response, *args, **kwargs):
        try:
            basket = operations.get_basket(request)
            basket = BasketSerializer(basket, context=self.get_serializer_context()).data
        except Exception:
            basket = None
        if response.status_code >= status.HTTP_300_MULTIPLE_CHOICES or not basket:
            error = response.data.get('non_field_errors') if type(response.data) == dict else response.data
            resp = JsonResponse(False, error[0] if error and error.__len__() > 0 else error, response.data)
        else:
            resp = JsonResponse(True, "success", basket)
        response.data = resp
        if response.status_code == status.HTTP_204_NO_CONTENT:
            response.status_code = status.HTTP_200_OK
        return super(BasketLineUpdateDetail, self).finalize_response(request, response, *args, **kwargs)


class BasketView(APIView):
    """
    Api for retrieving a user's basket.

    GET:
    Retrieve your basket.
    """

    serializer_class = BasketSerializer

    def get(self, request, *args, **kwargs):  # pylint: disable=redefined-builtin
        basket = operations.get_basket(request)
        ser = self.serializer_class(basket, context={"request": request})
        response = JsonResponse(True, "success", ser.data)
        return Response(response, status=200)


class AddProductView(APIView):
    """
    Add a certain quantity of a product to the basket.

    POST(url, quantity)
    {
        "url": "http://testserver.org/oscarapi/products/209/",
        "quantity": 6
    }

    If you've got some options to configure for the product to add to the
    basket, you should pass the optional ``options`` property:
    {
        "url": "http://testserver.org/oscarapi/products/209/",
        "quantity": 6,
        "options": [{
            "option": "http://testserver.org/oscarapi/options/1/",
            "value": "some value"
        }]
    }
    """

    add_product_serializer_class = AddProductSerializer
    serializer_class = BasketSerializer

    def is_product_from_multiple_partners_allowed(self, basket, stock):
        """
        Iterate through all lines in product's basket and check if product is from multiple partners

        :param basket:
        :param stock:
        :return:
        """
        msg_success, msg_error = "Product is from same partner", "Product is from multiple partners"
        lines = basket.lines.all()
        if lines.first():
            msg_error = "Already products in basket from store '%s'. To order from '%s' clear the basket." % (
                lines.first().partner.name, stock.partner.name)
            for line in lines:
                if line.partner.id != stock.partner.id:
                    return False, msg_error
        return True, msg_success

    def validate(
            self, basket, product, quantity, options, partner_id
    ):  # pylint: disable=unused-argument
        availability = basket.strategy.fetch_for_product(product).availability

        # check if product is available at all
        if not availability.is_available_to_buy:
            return False, availability.message

        current_qty = basket.product_quantity(product)
        desired_qty = current_qty + quantity

        # check if we can buy this quantity
        allowed, message = availability.is_purchase_permitted(desired_qty)
        if not allowed:
            return False, message

        # check if there is a limit on amount
        allowed, message = basket.is_quantity_allowed(desired_qty)
        if not allowed:
            return False, message

        if partner_id:
            try:
                p = Partner.objects.get(id=partner_id)
            except Partner.DoesNotExist:
                return False, "Partner does not exist"
            if p and not p.is_open:
                return False, "Partner is closed"
            try:
                stock = StockRecord.objects.get(product=product, partner_id=partner_id)
            except StockRecord.DoesNotExist:
                return False, "Product is not available"
            except StockRecord.MultipleObjectsReturned:
                return False, "Product is not available"

        return True, None

    def post(self, request, *args, **kwargs):  # pylint: disable=redefined-builtin
        p_ser = self.add_product_serializer_class(
            data=request.data, context={"request": request}
        )
        if p_ser.is_valid():
            basket = operations.get_basket(request)
            product = p_ser.validated_data["url"]
            quantity = p_ser.validated_data["quantity"]
            partner = p_ser.validated_data.get("partner_id")
            options = p_ser.validated_data.get("options", [])

            basket_valid, message = self.validate(basket, product, quantity, options, partner)
            if not basket_valid:
                return Response(
                    {"message": message}, status=status.HTTP_406_NOT_ACCEPTABLE
                )

            basket.add_product(partner, product, quantity=quantity, options=options)

            signals.basket_addition.send(
                sender=self, product=product, user=request.user, request=request
            )

            operations.apply_offers(request, basket)
            ser = self.serializer_class(basket, context={"request": request})
            data = JsonResponse(True, "success", ser.data)
            return Response(data, status=status.HTTP_200_OK)

        return Response({"message": p_ser.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)


class BasketLineDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Only the field `quantity` can be changed in this view.
    All other fields are readonly.
    """

    queryset = Line.objects.all()
    serializer_class = BasketLineSerializer
    permission_classes = (permissions.RequestAllowsAccessTo,)

    def get_queryset(self):
        basket_pk = self.kwargs.get("basket_pk")
        basket = generics.get_object_or_404(operations.editable_baskets(), pk=basket_pk)
        prepped_basket = operations.prepare_basket(basket, self.request)
        if operations.request_allows_access_to_basket(self.request, prepped_basket):
            return prepped_basket.all_lines()
        else:
            return self.queryset.none()

    def finalize_response(self, request, response, *args, **kwargs):
        try:
            basket = operations.get_basket(request)
            basket = BasketSerializer(basket, context=self.get_serializer_context()).data
        except Exception:
            basket = None
        if response.status_code >= status.HTTP_300_MULTIPLE_CHOICES or not basket:
            error = response.data.get('non_field_errors') if type(response.data) == dict else response.data
            resp = JsonResponse(False, error[0] if error and error.__len__() > 0 else error, response.data)
        else:
            resp = JsonResponse(True, "success", basket)
        response.data = resp
        if response.status_code == status.HTTP_204_NO_CONTENT:
            response.status_code = status.HTTP_200_OK
        return super().finalize_response(request, response, *args, **kwargs)

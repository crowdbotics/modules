from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import Booking, BookingPlan, BookingPenalty, BookingDetail
from .pagination import Pagination
from .serializers import BookingSerializer, BookingPenaltySerializer, BookingDetailSerializer, BookingPlanSerializer, \
    BookingCreateSerializer
from .services.shopify import ShopifyService


class BookingView(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Booking.objects.all()
    pagination_class = Pagination


class BookingPlanView(ModelViewSet):
    serializer_class = BookingPlanSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = BookingPlan.objects.all()
    pagination_class = Pagination


class BookingPenaltyView(ModelViewSet):
    serializer_class = BookingPenaltySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = BookingPenalty.objects.all()
    pagination_class = Pagination


class BookingDetailView(ModelViewSet):
    serializer_class = BookingDetailSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = BookingDetail.objects.all()
    pagination_class = Pagination


class CreateBookingView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    serializer_class = BookingCreateSerializer
    queryset = BookingDetail.objects.all()
    pagination_class = Pagination


class CreateCartView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    shopify_service = ShopifyService()

    def post(self, request, *args, **kwargs):
        """
        Using cartCreate mutation to create a new cart and add a line item to the cart.
        In the input, include the product variant ID (merchandiseId), include the line item quantity (quantity)
        and any attributes (attributes) associated with the product/booking.
        """
        response = self.shopify_service.create_cart(user=self.request.user, lines=request.data.get("lines", []))

        return Response(data=response.get("data"), status=response.get("status_code"))

    def get(self, request, *args, **kwargs):
        """
        Using the cart query to retrieve a cart stored on Shopify.
        In the query, supplying the cart ID as input."""
        cartId = self.request.query_params.get('cartId', None)
        if cartId is not None:
            response = self.shopify_service.get_cart_details(cart_id=cartId)
            return Response(data=response.get("data"), status=response.get("status_code"))
        return Response({"error": "cartId is not null"}, status=status.HTTP_400_BAD_REQUEST)

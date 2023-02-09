from rest_framework import status
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .serializers import BookingSerializer, BookingPenaltySerializer, BookingDetailSerializer, BookingPlanSerializer,\
    BookingCreateSerializer
from .models import Booking, BookingPlan, BookingPenalty, BookingDetail, ShopifyBooking
import requests
import os


class BookingView(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Booking.objects.all()


class BookingPlanView(ModelViewSet):
    serializer_class = BookingPlanSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = BookingPlan.objects.all()


class BookingPenaltyView(ModelViewSet):
    serializer_class = BookingPenaltySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = BookingPenalty.objects.all()


class BookingDetailView(ModelViewSet):
    serializer_class = BookingDetailSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = BookingDetail.objects.all()


class CreateBookingView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    serializer_class = BookingCreateSerializer
    queryset = BookingDetail.objects.all()


class CreateCartView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Using cartCreate mutation to create a new cart and add a line item to the cart.
        In the input, include the product variant ID (merchandiseId), include the line item quantity (quantity) and any attributes (attributes) associated with the product/booking.
        """
        try:
            query = """mutation cartCreate($lines: [CartLineInput!]!) {
                cartCreate(
                    input: {
                    lines: $lines
                    }
                ) {
                    cart {
                    id
                    createdAt
                    updatedAt
                    lines(first: 1) {
                        edges {
                        node {
                            id
                            merchandise {
                            ... on ProductVariant {
                                id
                            }
                            }
                        }
                        }
                    }
                    attributes {
                        key
                        value
                        }
                    }
                 }
                }"""

            payload = {
                "query": query,
                "variables": {
                    "lines": request.data.get("lines", [])
                }
            }
            req = requests.post(os.environ.get("SHOPIFY_STORE_URL", "") + '/api/2022-10/graphql.json/', json=payload,
                                headers={"X-Shopify-Storefront-Access-Token": os.environ.get("SHOPIFY_STOREFRONT_ACCESS_TOKEN", ""),
                                         "Content-Type": "application/json"})
            load = req.json()
            shopify_id = ShopifyBooking.objects.create(user=request.user, shopify_cart_id=load["data"]["cartCreate"]["cart"]["id"])
            shopify_id.save()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        """
        Using the cart query to retrieve a cart stored on Shopify.
        In the query, supplying the cart ID as input."""
        cartId = self.request.query_params.get('cartId', None)
        if cartId is not None:
            query = """query cart($cartId: ID!){
              cart(
                id: $cartId
              ) {
                id
                createdAt
                updatedAt
                lines(first: 2) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    attributes {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }"""
            payload = {
                "query": query,
                "variables": {
                    "cartId": cartId
                }
            }
            r = requests.post(os.environ.get("SHOPIFY_STORE_URL", "") + '/api/2022-10/graphql.json/', json=payload,
                              headers={"X-Shopify-Storefront-Access-Token": os.environ.get("SHOPIFY_STOREFRONT_ACCESS_TOKEN", ""),
                                       "Content-Type": "application/json"})
            return Response(json.loads(r.text), status=status.HTTP_200_OK)
        return Response({"error": "cartId is not null"}, status=status.HTTP_400_BAD_REQUEST)

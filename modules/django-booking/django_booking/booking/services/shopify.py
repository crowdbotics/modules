import os

import requests
from rest_framework import status

from modules.django_booking.booking.models import ShopifyBooking


class ShopifyBase:
    def __init__(self):
        self.SHOPIFY_STORE_URL = os.environ.get("SHOPIFY_STORE_URL", "")
        self.SHOPIFY_STOREFRONT_ACCESS_TOKEN = os.environ.get("SHOPIFY_STOREFRONT_ACCESS_TOKEN", "")

    def get_header(self):
        headers = {
            "X-Shopify-Storefront-Access-Token": self.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            "Content-Type": "application/json"}
        return headers

    def _api_call(self, request_type, url_action, headers=None, payload=None, params=None):
        try:
            response = requests.request(request_type, f"{self.SHOPIFY_STORE_URL}{url_action}", headers=headers,
                                        json=payload, params=params)
            response.raise_for_status()
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}


class ShopifyService(ShopifyBase):
    def get_cart_details(self, cart_id):
        try:
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
                    "cartId": cart_id
                }
            }
            response = self._api_call(request_type="POST", url_action="/api/2022-10/graphql.json/",
                                      headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return {"data": {"error": e.args}, "status_code": status.HTTP_400_BAD_REQUEST}

    def create_cart(self, user, lines):
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
                    "lines": lines
                }
            }

            response = self._api_call(request_type="POST", url_action="/api/2022-10/graphql.json/",
                                      headers=self.get_header(), payload=payload)
            shopify_id = ShopifyBooking.objects.create(user=user,
                                                       shopify_cart_id=response['data']["data"]["cartCreate"]["cart"][
                                                           "id"]
                                                       )
            shopify_id.save()
            return response
        except Exception as e:
            return {"data": {"error": e.args}, "status_code": status.HTTP_400_BAD_REQUEST}

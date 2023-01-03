import os

from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet

from .services.WordpressService import WordpressService


class WordpressViewSet(GenericViewSet):
    wordpress_service = WordpressService(base_url=os.getenv('WORDPRESS_BASE_URL', ""),
                                         client_id=os.getenv('WORDPRESS_BASE_URL', ""),
                                         client_secrets=os.getenv('WORDPRESS_BASE_URL', ""),
                                         redirect_url=os.getenv("WORDPRESS_REDIRECT_URL", ""),
                                         wordpress_domain=os.getenv("WORDPRESS_DOMAIN", "")
                                         )

    @action(detail=False, methods=['post'], url_path='get-auth-token')
    def get_auth_token(self, request):
        code = request.META.get('WORDPRESS_CODE')
        if code:
            response = self.wordpress_service.get_auth_token(wordpress_code=code)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "CODE_NOT_FOUND",
                "message": "Wordpress Code not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='create-post')
    def create_post(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_post(access_token=access_token, request_body=request.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)


# class AuthTest(APIView):
#     permission_classes = [AllowAny]
#
#     def post(self, request, *args, **kwargs):
#         client_id = '83370'
#         client_secret = 'HDNIQO5gsTgIm9MJURUkTIeQz28rUcLkonBPZyiL57HYx7Xe69FnerZWGKixaIlk'
#         uri = 'https://www.crowdbotics.com/'
#         # url = f"https://public-api.wordpress.com/oauth2/authorize?client_id={client_id}&redirect_uri={uri}&response_type=code"
#         url = "https://public-api.wordpress.com/oauth2/token"
#
#         payload = {
#             "client_id": client_id,
#             "client_secret": client_secret,
#             "redirect_uri": uri,
#             "code": '7RCcHuic2C',
#             "grant_type": 'authorization_code'
#         }
#
#         response = requests.post(url=url, data=payload)
#         return {"data": response.json()}

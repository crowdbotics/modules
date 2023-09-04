import datetime
from unittest import mock

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestOktaViewSet(APITestCase):
    @mock.patch("modules.django_okta.okta.services.okta.OktaService.create_user")
    def test_create_user_okta(self, create_user_okta_mock):
        response_data = {
            "data": {
                "id": "0hsbd37d5dgd6ddj837d3y7d37dt37g",
                "status": "ACTIVE",
                "created": "2023-08-03T19:07:22.000Z",
                "activated": "2023-08-03T19:07:23.000Z",
                "statusChanged": "2023-08-03T19:07:23.000Z",
                "lastLogin": None,
                "lastUpdated": "2023-08-03T19:07:23.000Z",
                "passwordChanged": "2023-08-03T19:07:23.000Z",
                "type": {"id": "dgd6ddj837d3y7d37dt37g"},
                "profile": {
                    "firstName": "DemoTemp",
                    "lastName": "Brock",
                    "mobilePhone": None,
                    "secondEmail": None,
                    "login": "demo89@mliok.com",
                    "email": "demon89@mliok.com",
                },
                "credentials": {
                    "password": {},
                    "emails": [
                        {
                            "value": "demo89@mliok.com",
                            "status": "VERIFIED",
                            "type": "PRIMARY",
                        }
                    ],
                    "recovery_question": {"question": "what is you father name"},
                    "provider": {"type": "OKTA", "name": "OKTA"},
                },
                "_links": {
                    "suspend": {
                        "href": "https://demo.okta.com/api/v1/users/lifecycle/suspend",
                        "method": "POST",
                    },
                    "schema": {
                        "href": "https://demo.okta.com/api/v1/meta/schemas/user"
                    },
                    "resetPassword": {
                        "href": "https://demo.okta.com/api/v1/users/lifecycle/reset_password",
                        "method": "POST",
                    },
                    "forgotPassword": {
                        "href": "https://demo.okta.com/api/v1/users/credentials/forgot_password",
                        "method": "POST",
                    },
                    "expirePassword": {
                        "href": "https://demo.okta.com/api/v1/users/lifecycle/expire_password",
                        "method": "POST",
                    },
                    "changeRecoveryQuestion": {
                        "href": "https://demo.okta.com/api/v1/credentials/change_recovery_question",
                        "method": "POST",
                    },
                    "self": {"href": "https://demo.okta.com/api/v1/users/"},
                    "type": {"href": "https://demo.okta.com/api/v1/meta/types/user/"},
                    "changePassword": {
                        "href": "https://demo.okta.com/api/v1/users/change_password",
                        "method": "POST",
                    },
                    "deactivate": {
                        "href": "https://demo.okta.com/api/v1/lifecycle/deactivate",
                        "method": "POST",
                    },
                },
            },
            "status_code": 200,
        }
        data = {
            "profile": {
                "firstName": "DemoTemp",
                "lastName": "Brock",
                "email": "demo89@mliok.com",
                "login": "demo89@mliok.com",
            },
            "credentials": {
                "password": {"value": "Pass@123"},
                "recovery_question": {
                    "question": "what is you father name",
                    "answer": "Annie Oakley",
                },
            },
        }
        create_user_okta_mock.return_value = response_data
        url = reverse("okta-create-user-okta")
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.json(), response_data["data"])
        self.assertEqual(Response.data["id"], response_data["data"]["id"])
        self.assertEqual(len(Response.json()), 12)
        create_user_okta_mock.assert_called()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.create_user")
    def test_create_user_okta_with_same_existing_user(self, create_user_okta_mock):
        response_data = {
            "data": {
                "errorCode": "E0000001",
                "errorSummary": "Api validation failed: login",
                "errorLink": "E00001",
                "errorId": "j837d3y7d37dt37g",
                "errorCauses": [
                    {
                        "errorSummary": "login: An object with this field already exists in the current organization"
                    }
                ],
            },
            "status_code": 400,
        }
        data = {
            "profile": {
                "firstName": "DemoTemp",
                "lastName": "Brock",
                "email": "demo89@mliok.com",
                "login": "demo89@mliok.com",
            },
            "credentials": {
                "password": {"value": "Pass@123"},
                "recovery_question": {
                    "question": "what is you father name",
                    "answer": "Annie Oakley",
                },
            },
        }
        create_user_okta_mock.return_value = response_data
        url = reverse("okta-create-user-okta")
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.json(), response_data["data"])
        self.assertEqual(Response.data["errorCode"], response_data["data"]["errorCode"])
        self.assertEqual(len(Response.json()), 5)
        create_user_okta_mock.assert_called_once()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.login_user")
    def test_login_user_okta(self, login_user_okta_mock):
        response_data = {
            "data": {
                "stateToken": "okta-token",
                "expiresAt": "2023-08-03T19:42:12.000Z",
                "status": "MFA_REQUIRED",
                "_embedded": {
                    "user": {
                        "id": "j837d3y7d37dt37g",
                        "passwordChanged": "2023-08-03T12:43:15.000Z",
                        "profile": {
                            "login": "demo897@mliok.com",
                            "firstName": "DemoTemp",
                            "lastName": "Brock",
                            "locale": "en_US",
                            "timeZone": "America/Los_Angeles",
                        },
                    },
                    "factors": [
                        {
                            "id": "j837d3y7d37dt37g",
                            "factorType": "email",
                            "provider": "OKTA",
                            "vendorName": "OKTA",
                            "profile": {"email": "demo@mliok.com"},
                            "_links": {
                                "verify": {
                                    "href": "https://demo.okta.com/api/v1/authn/factors/verify",
                                    "hints": {"allow": ["POST"]},
                                }
                            },
                        }
                    ],
                    "policy": {
                        "rememberDeviceLifetimeInMinutes": 0,
                        "rememberDeviceByDefault": False,
                        "factorsPolicyInfo": {},
                    },
                },
                "_links": {
                    "cancel": {
                        "href": "https://demo.okta.com/api/v1/authn/cancel",
                        "hints": {"allow": ["POST"]},
                    }
                },
            },
            "status_code": 200,
        }
        login_user_okta_mock.return_value = response_data
        data = {"username": "demo897@mliok.com", "password": "pass@123"}
        url = reverse("okta-login-user-okta")
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.json(), response_data["data"])
        self.assertEqual(
            Response.data["stateToken"], response_data["data"]["stateToken"]
        )
        self.assertEqual(len(Response.json()), 5)
        login_user_okta_mock.assert_called_once()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.login_user")
    def test_login_user_okta_update_oktaID(self, login_user_okta_mock):
        response_data = {
            "data": {
                "stateToken": "okta-token",
                "expiresAt": "2023-08-03T19:42:12.000Z",
                "status": "MFA_REQUIRED",
                "_embedded": {
                    "user": {
                        "id": "j837d3y7d37dt37g",
                        "passwordChanged": "2023-08-03T12:43:15.000Z",
                        "profile": {
                            "login": "demo897@mliok.com",
                            "firstName": "DemoTemp",
                            "lastName": "Brock",
                            "locale": "en_US",
                            "timeZone": "America/Los_Angeles",
                        },
                    },
                    "factors": [
                        {
                            "id": "j837d3y7d37dt37g",
                            "factorType": "email",
                            "provider": "OKTA",
                            "vendorName": "OKTA",
                            "profile": {"email": "demo@mliok.com"},
                            "_links": {
                                "verify": {
                                    "href": "https://demo.okta.com/api/v1/authn/factors/j837d3y7d37dt37g/verify",
                                    "hints": {"allow": ["POST"]},
                                }
                            },
                        }
                    ],
                    "policy": {
                        "allowRememberDevice": False,
                        "rememberDeviceLifetimeInMinutes": 0,
                        "rememberDeviceByDefault": False,
                        "factorsPolicyInfo": {},
                    },
                },
                "_links": {
                    "cancel": {
                        "href": "https://demo.okta.com/api/v1/authn/cancel",
                        "hints": {"allow": ["POST"]},
                    }
                },
            },
            "status_code": 200,
        }
        login_user_okta_mock.return_value = response_data
        data = {"username": "demo@mliok.com", "password": "pass@123", "oktaID": ""}
        url = reverse("okta-login-user-okta")
        self.client.post(url, data=data, format="json")
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.json(), response_data["data"])
        self.assertEqual(
            Response.data["stateToken"], response_data["data"]["stateToken"]
        )
        self.assertEqual(len(Response.json()), 5)
        login_user_okta_mock.assert_called()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.login_user")
    def test_login_user_okta_with_wrong_credential(self, login_user_okta_mock):
        response_data = {
            "data": {
                "errorCauses": [],
                "errorCode": "E0000004",
                "errorId": "j837d3y7d37dt37g",
                "errorLink": "E0000004",
                "errorSummary": "Authentication failed",
            },
            "status_code": 401,
        }
        login_user_okta_mock.return_value = response_data
        data = {"username": "demo896@mliok.com", "password": "Pass@123"}
        url = reverse("okta-login-user-okta")
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            Response.json(), {"error": response_data["data"]["errorSummary"]}
        )
        self.assertEqual(len(Response.json()), 1)
        login_user_okta_mock.assert_called_once()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.login_user")
    @mock.patch("modules.django_okta.okta.services.okta.OktaService.logout_user")
    def test_logout_user_okta(self, logout_user_okta_mock, login_user_okta_mock):
        login_response = {
            "data": {
                "stateToken": "okta-token",
                "expiresAt": datetime.datetime.now() + datetime.timedelta(hours=2),
                "status": "MFA_REQUIRED",
                "_embedded": {
                    "user": {
                        "id": "j837d3y7d37dt37g",
                        "passwordChanged": "2023-08-03T12:43:15.000Z",
                        "profile": {
                            "login": "demo897@mliok.com",
                            "firstName": "DemoTemp",
                            "lastName": "Brock",
                            "locale": "en_US",
                            "timeZone": "America/Los_Angeles",
                        },
                    },
                    "factors": [
                        {
                            "id": "j837d3y7d37dt37g",
                            "factorType": "email",
                            "provider": "OKTA",
                            "vendorName": "OKTA",
                            "profile": {"email": "p...7@mliok.com"},
                            "_links": {
                                "verify": {
                                    "href": "https://demo.okta.com/api/v1/authn/factors/verify",
                                    "hints": {"allow": ["POST"]},
                                }
                            },
                        }
                    ],
                    "policy": {
                        "allowRememberDevice": False,
                        "rememberDeviceLifetimeInMinutes": 0,
                        "rememberDeviceByDefault": False,
                        "factorsPolicyInfo": {},
                    },
                },
                "_links": {
                    "cancel": {
                        "href": "https://demo.okta.com/api/v1/authn/cancel",
                        "hints": {"allow": ["POST"]},
                    }
                },
            },
            "status_code": 200,
        }
        login_user_okta_mock.return_value = login_response
        data = {"username": "demo897@mliok.com", "password": "pass@123"}
        url = reverse("okta-login-user-okta")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_OKTA_TOKEN=login_response["data"]["stateToken"])
        logout_response = {"data": {"_embedded": {}}, "status_code": 200}
        logout_user_okta_mock.return_value = logout_response
        data = {"stateToken": login_response["data"]["stateToken"]}
        Response = self.client.post(
            reverse("okta-logout-user-okta"), data, format="json"
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.json(), logout_response["data"])
        login_user_okta_mock.assert_called_once()
        logout_user_okta_mock.assert_called_once()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.login_user")
    def test_logout_user_okta_with_expire_token(self, login_user_okta_mock):
        login_response = {
            "data": {
                "stateToken": "okta-token",
                "expiresAt": "2023-08-03T19:42:12.000Z",
                "status": "MFA_REQUIRED",
                "_embedded": {
                    "user": {
                        "id": "j837d3y7d37dt37g",
                        "passwordChanged": "2023-08-03T12:43:15.000Z",
                        "profile": {
                            "login": "demo897@mliok.com",
                            "firstName": "DemoTemp",
                            "lastName": "Brock",
                            "locale": "en_US",
                            "timeZone": "America/Los_Angeles",
                        },
                    },
                    "factors": [
                        {
                            "id": "j837d3y7d37dt37g",
                            "factorType": "email",
                            "provider": "OKTA",
                            "vendorName": "OKTA",
                            "profile": {"email": "demo7@mliok.com"},
                            "_links": {
                                "verify": {
                                    "href": "https://demo.okta.com/api/v1/authn/factor/verify",
                                    "hints": {"allow": ["POST"]},
                                }
                            },
                        }
                    ],
                    "policy": {
                        "allowRememberDevice": False,
                        "rememberDeviceLifetimeInMinutes": 0,
                        "rememberDeviceByDefault": False,
                        "factorsPolicyInfo": {},
                    },
                },
                "_links": {
                    "cancel": {
                        "href": "https://demo.okta.com/api/v1/authn/cancel",
                        "hints": {"allow": ["POST"]},
                    }
                },
            },
            "status_code": 200,
        }
        login_user_okta_mock.return_value = login_response
        data = {"username": "demo7@mliok.com", "password": "pass@123"}
        url = reverse("okta-login-user-okta")
        self.client.post(url, data, format="json")
        self.client.credentials(HTTP_OKTA_TOKEN=login_response["data"]["stateToken"])
        data = {"stateToken": login_response["data"]["stateToken"]}
        Response = self.client.post(
            reverse("okta-logout-user-okta"), data, format="json"
        )
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.json(), {"message": "token is expired"})
        login_user_okta_mock.assert_called_once()

    @mock.patch("modules.django_okta.okta.services.okta.OktaService.logout_user")
    def test_logout_user_okta_with_expire_okta_token(self, logout_user_okta_mock):
        self.client.credentials(HTTP_OKTA_TOKEN="j837d3y7d37dt37gx-j837d3y7d37dt37g")
        logout_response = {"message": "invalid okta-token"}
        logout_user_okta_mock.return_value = logout_response
        data = {"stateToken": "okta-token"}
        Response = self.client.post(
            reverse("okta-logout-user-okta"), data, format="json"
        )
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.json(), {"message": "invalid okta-token"})

    def test_logout_user_okta_without_okta_token(self):
        data = {"stateToken": "okta-token"}
        Response = self.client.post(
            reverse("okta-logout-user-okta"), data, format="json"
        )
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.json(), {"message": '"okta-token" header is missing'})

    def test_okta_callback_url(self):
        data = {"SAMLResponse": "url_url_url_url"}
        url = reverse("okta-okta-callback-url")
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_200_OK)

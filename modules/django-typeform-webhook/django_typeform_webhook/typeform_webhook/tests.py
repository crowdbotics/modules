from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import FormDefinition, FormAnswers

User = get_user_model()

form_definition_data = {
    "form_response": {
        "form_id": "oZvqfv5U",
        "token": "01H66RPM8KESXGMDBAXNWQF03T",
        "landed_at": "2023-07-25T14:54:25Z",
        "submitted_at": "2023-07-25T14:54:25Z",
        "definition": {
            "id": "oZvqfv5UU",
            "title": "My typeform2",
            "fields": [
                {
                    "id": "GuQxnVdjgS7Z",
                    "ref": "01GV3CX07TK8PHYY19BX7HMJCA",
                    "type": "multiple_choice",
                    "title": "...",
                    "properties": {},
                    "choices": [
                        {
                            "id": "jf2ik3rh2SBO",
                            "label": "Choice 1"
                        },
                        {
                            "id": "i5nXvMPuElQI",
                            "label": "Choice 2"
                        }
                    ]
                },
                {
                    "id": "MQmwmuakPEFb",
                    "ref": "be1f51a3-10a3-4605-bf4d-96c8d119a8dd",
                    "type": "multiple_choice",
                    "title": "...",
                    "properties": {},
                    "choices": [
                        {
                            "id": "VGb98afM5Mp0",
                            "label": "Choice One"
                        },
                        {
                            "id": "3i8tZRkgzc8l",
                            "label": "Choice Two"
                        },
                        {
                            "id": "JKYYBN3diXKu",
                            "label": "Choice Three"
                        }
                    ]
                },
                {
                    "id": "cvCtjpegX7pm",
                    "ref": "7a659252-c376-46d6-b00c-1a8e94eccb2a",
                    "type": "short_text",
                    "title": "...",
                    "properties": {}
                },
                {
                    "id": "x0LcRBMoLrNR",
                    "ref": "cd4c9d9b-0cda-4364-b653-2d9992557500",
                    "type": "number",
                    "title": "...",
                    "properties": {}
                }
            ],
            "endings": [
                {
                    "id": "DefaultTyScreen",
                    "ref": "default_tys",
                    "title": "Thanks for completing this typeform\n"
                             "Now *create your own* — it's free, easy, & beautiful",
                    "type": "thankyou_screen",
                    "properties": {
                        "button_text": "Create a *typeform*",
                        "show_button": "true",
                        "share_icons": "false",
                        "button_mode": "default_redirect"
                    },
                    "attachment": {
                        "type": "image",
                        "href": "https://images.typeform.com/images/2dpnUBBkz2VN"
                    }
                }
            ]
        },
        "answers": [
            {
                "type": "choice",
                "choice": {
                    "label": "Barcelona"
                },
                "field": {
                    "id": "GuQxnVdjgS7Z",
                    "type": "multiple_choice",
                    "ref": "01GV3CX07TK8PHYY19BX7HMJCA"
                }
            },
            {
                "type": "choice",
                "choice": {
                    "label": "Barcelona"
                },
                "field": {
                    "id": "MQmwmuakPEFb",
                    "type": "multiple_choice",
                    "ref": "be1f51a3-10a3-4605-bf4d-96c8d119a8dd"
                }
            },
            {
                "type": "text",
                "text": "Lorem ipsum dolor",
                "field": {
                    "id": "cvCtjpegX7pm",
                    "type": "short_text",
                    "ref": "7a659252-c376-46d6-b00c-1a8e94eccb2a"
                }
            },
            {
                "type": "number",
                "number": 42,
                "field": {
                    "id": "x0LcRBMoLrNR",
                    "type": "number",
                    "ref": "cd4c9d9b-0cda-4364-b653-2d9992557500"
                }
            }
        ],
        "ending": {
            "id": "DefaultTyScreen",
            "ref": "default_tys"
        }
    }
}

form_answer_data = [
    {
        "id": 47,
        "form_answers": [
            {
                "id": 87,
                "token": "01H66RPM8KESXGMDBAXNWQF03T",
                "type": "choice",
                "answer": "None",
                "submitted_at": "2023-07-25T14:54:25Z",
                "form_definition_id": "GuQxnVdjgS7Z"
            }
        ],
        "form_id": "oZvqfv5U",
        "definition_id": "GuQxnVdjgS7Z",
        "type": "multiple_choice",
        "title": "...",
        "choices": [
            {
                "id": "jf2ik3rh2SBO",
                "label": "Choice 1"
            },
            {
                "id": "i5nXvMPuElQI",
                "label": "Choice 2"
            }
        ]
    },
    {
        "id": 48,
        "form_answers": [
            {
                "id": 88,
                "token": "01H66RPM8KESXGMDBAXNWQF03T",
                "type": "choice",
                "answer": "None",
                "submitted_at": "2023-07-25T14:54:25Z",
                "form_definition_id": "MQmwmuakPEFb"
            }
        ],
        "form_id": "oZvqfv5U",
        "definition_id": "MQmwmuakPEFb",
        "type": "multiple_choice",
        "title": "...",
        "choices": [
            {
                "id": "VGb98afM5Mp0",
                "label": "Choice One"
            },
            {
                "id": "3i8tZRkgzc8l",
                "label": "Choice Two"
            },
            {
                "id": "JKYYBN3diXKu",
                "label": "Choice Three"
            }
        ]
    },
    {
        "id": 49,
        "form_answers": [
            {
                "id": 89,
                "token": "01H66RPM8KESXGMDBAXNWQF03T",
                "type": "text",
                "answer": "Lorem ipsum dolor",
                "submitted_at": "2023-07-25T14:54:25Z",
                "form_definition_id": "cvCtjpegX7pm"
            }
        ],
        "form_id": "oZvqfv5U",
        "definition_id": "cvCtjpegX7pm",
        "type": "short_text",
        "title": "...",
        "choices": {}
    },
    {
        "id": 50,
        "form_answers": [
            {
                "id": 90,
                "token": "01H66RPM8KESXGMDBAXNWQF03T",
                "type": "number",
                "answer": "42",
                "submitted_at": "2023-07-25T14:54:25Z",
                "form_definition_id": "x0LcRBMoLrNR"
            }
        ],
        "form_id": "oZvqfv5U",
        "definition_id": "x0LcRBMoLrNR",
        "type": "number",
        "title": "...",
        "choices": {}
    }
]


class FormDefinitionTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john34@gmail.com', password='john123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials()

    def test_create_form_definition(self):
        Response = {'message': 'Data saved successfully.'}
        url = '/modules/typeform-webhook/webhook/'
        form_definition_data['form_response']['definition']['fields'][0]["type"] = 'multiple_choice'
        form_definition_data['form_response']['answers'][0]["type"] = 'choice'
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(Response, response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_form_definition_without_definition_key(self):
        url = '/modules/typeform-webhook/webhook/'
        del form_definition_data['form_response']['definition']
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_form_definition_without_answer_key(self):
        url = '/modules/typeform-webhook/webhook/'
        del form_definition_data['form_response']['answers']
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_form_definition_with_missing_required_values(self):
        url = '/modules/typeform-webhook/webhook/'
        form_definition_data['form_response']['definition']['fields'][0]["type"] = ''
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_form_answer_with_missing_required_values(self):
        url = '/modules/typeform-webhook/webhook/'
        form_definition_data['form_response']['answers'][0]["type"] = ''
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class FormAnswerTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john34@gmail.com', password='john123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials()

    def test_get_form_definition_answer(self):
        Response = {'message': 'Data saved successfully.'}
        url = '/modules/typeform-webhook/webhook/'
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(Response, response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        form_id = "oZvqfv5U"
        url = f'/modules/typeform-webhook/form-answer/{form_id}/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_form_definition_answer_with_wrong_form_id(self):
        Response = {'message': 'Data saved successfully.'}
        url = '/modules/typeform-webhook/webhook/'
        response = self.client.post(url, form_definition_data, format='json')
        self.assertEqual(Response, response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        form_id = "egdheded"
        url = f'/modules/typeform-webhook/form-answer/{form_id}/'
        response = self.client.get(url, format='json')
        self.assertEqual([], response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ModeLTestCase(APITestCase):
    def setUp(self):
        self.form_definition = FormDefinition.objects.create(
            form_id="test", definition_id="test_demo", type="type",
            title="title", choices=[{
                "id": "VGb98afM5Mp0",
                "label": "Choice One"
            }
            ]
        )
        FormAnswers.objects.create(
            form_definition_id=self.form_definition, token='dghjdvj', type='type', answer='answer',
            submitted_at="2023-07-25T14:54:25Z"
        )

    def test_form_definition_model(self):
        form_definition = FormDefinition.objects.get(pk=1)
        self.assertEqual(str(form_definition), form_definition.title)

    def test_form_definition_answer_model(self):
        form_answer = FormAnswers.objects.get(pk=1)
        self.assertEqual(str(form_answer), form_answer.answer)

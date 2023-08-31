from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest import mock


class TestOpenAiViewSet(APITestCase):
    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.list_models')
    def test_get_models_list(self, get_models_list_mock):
        response_data = {
            'data': {
                'object': 'list',
                'data': [
                    {
                        'id': 'whisper-1',
                        'object': 'model',
                        'created': 1677532384,
                        'owned_by': 'openai-internal',
                        'permission': [
                            {
                                'id': 'modelperm-KlsZlfft3Gma8pI6A8rTnyjs',
                                'object': 'model_permission',
                                'created': 1683912666,
                                'allow_create_engine': False,
                                'allow_sampling': True,
                                'allow_logprobs': True,
                                'allow_search_indices': False,
                                'allow_view': True,
                                'allow_fine_tuning': False,
                                'organization': '*',
                                'group': None,
                                'is_blocking': False
                            }
                        ],
                        'root': 'whisper-1',
                        'parent': None
                    }
                ]
            },
            'status_code': 200
        }
        get_models_list_mock.return_value = response_data
        url = reverse("openai-get-models-list")
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.json(), response_data['data'])
        self.assertEqual(Response.data['object'], 'list')
        self.assertEqual(len(Response.json()['data']), 1)
        get_models_list_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.list_engine')
    def test_get_engine_list(self, get_engine_list_mock):
        response = {
            'data': {
                'object': 'list',
                'data': [
                    {'object': 'engine', 'id': 'whisper-1', 'ready': True, 'owner': 'openai-internal',
                     'permissions': None, 'created': None},
                    {'object': 'engine', 'id': 'davinci-similarity', 'ready': True, 'owner': 'openai-dev',
                     'permissions': None, 'created': None},
                    {'object': 'engine', 'id': 'gpt-3.5-turbo-16k', 'ready': True, 'owner': 'openai-internal',
                     'permissions': None, 'created': None}
                ]
            },
            'status_code': 200
        }
        get_engine_list_mock.return_value = response
        url = reverse('openai-get-engine-list')
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        expected_engines = response['data']['data']
        actual_engines = Response.data['data']
        for actual, expected in zip(actual_engines, expected_engines):
            self.assertDictEqual(actual, expected)
            self.assertEqual(actual['object'], 'engine')
            self.assertTrue(actual['id'])
            self.assertTrue(actual['ready'])
            self.assertTrue(actual['owner'])
            self.assertIsNone(actual['permissions'])
            self.assertIsNone(actual['created'])
        self.assertEqual(len(actual_engines), len(expected_engines))
        expected_engine_ids = ['whisper-1', 'davinci-similarity', 'gpt-3.5-turbo-16k']
        actual_engine_ids = [engine['id'] for engine in actual_engines]
        self.assertListEqual(actual_engine_ids, expected_engine_ids)
        get_engine_list_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_chat_completion')
    def test_create_a_chat_completion(self, create_a_chat_completion_mock):
        response = {
            'data': {'id': 'chatcmpl-7RyRTfKybT8jT1NWYgQPypuxhg1Cg', 'object': 'chat.completion', 'created': 1686901551,
                     'model': 'gpt-3.5-turbo-0301',
                     'usage': {'prompt_tokens': 21, 'completion_tokens': 9, 'total_tokens': 30}, 'choices': [
                    {'message': {'role': 'assistant', 'content': 'Hi! How may I assist you today?'},
                     'finish_reason': 'stop', 'index': 0}]}, 'status_code': 200}
        create_a_chat_completion_mock.return_value = response
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user", "content": "Hello!"
                }
            ]
        }
        url = reverse('openai-create-a-chat-completion')
        Response = self.client.post(url, data=data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_a_chat_completion_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_chat_completion')
    def test_create_a_chat_completion_invalid_data(self, create_a_chat_completion_mock):
        response = {
            'data': {"messages": ["This field is required."]}, 'status_code': 400}
        create_a_chat_completion_mock.return_value = response
        invalid_data = {
            "model": "gpt-3.5-turbo",
        }
        url = reverse('openai-create-a-chat-completion')
        Response = self.client.post(url, data=invalid_data, format="json")
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(Response.data, response['data'])

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_completion')
    def test_create_a_completion(self, create_a_completion_mock):
        response = {
            'data': {'id': 'cmpl-7Rz4Easgt20P7bGo08Jutww1ltTK7', 'object': 'text_completion', 'created': 1686903954,
                     'model': 'text-davinci-003', 'choices': [
                    {'text': '\n\nThis is indeed a test', 'index': 0, 'logprobs': None, 'finish_reason': 'length'}],
                     'usage': {'prompt_tokens': 5, 'completion_tokens': 7, 'total_tokens': 12}}, 'status_code': 200}
        create_a_completion_mock.return_value = response
        data = {
            "model": "text-davinci-003",
            "prompt": "Say this is a test",
            "max_tokens": 7,
            "temperature": 0
        }
        url = reverse('openai-create-a-completion')
        Response = self.client.post(url, data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_a_completion_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_completion')
    def test_create_a_completion_with_invalid_data(self, create_a_completion_mock):
        response = None
        create_a_completion_mock.return_value = response
        invalid_data = {
            "max_tokens": 7,
            "temperature": 0
        }
        url = reverse('openai-create-a-completion')
        Response = self.client.post(url, data=invalid_data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_edit')
    def test_create_an_edit(self, create_an_edit_mock):
        response = {'data': {'choices': [{'index': 0, 'text': 'What day of the week is it?\n'}], 'created': 1686910504,
                             'object': 'edit',
                             'usage': {'completion_tokens': 28, 'prompt_tokens': 25, 'total_tokens': 53}},
                    'status_code': 200}
        create_an_edit_mock.return_value = response
        data = {
            "model": "text-davinci-edit-001",
            "input": "What day of the wek is it?",
            "instruction": "Fix the spelling mistakes"
        }
        url = reverse('openai-create-an-edit')
        Response = self.client.post(url, data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_an_edit_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_edit')
    def test_create_an_edit_with_invalid_data(self, create_an_edit_mock):
        response = None
        create_an_edit_mock.return_value = response
        invalid_data = {

            "instruction": "Fix the spelling mistakes"
        }
        url = reverse('openai-create-an-edit')
        Response = self.client.post(url, data=invalid_data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_image')
    def test_create_an_image_generations(self, create_an_image_generations_mock):
        response = {'data': {'created': 1686910968, 'data': [{
            'url': 'https://oaidalleapiprodscus.blob.core'
                   '.windows.net/private/org'
                   '-jhAkc7zhErtmPvu7iVCBov6a/user'
                   '-5XvdCSuw1Ka02FejZPAbUHIb/img'
                   '-fCYr88bkp4MSJTE6FASqaDmO.png?st=2023-06'
                   '-16T09%3A22%3A48Z&se=2023-06-16T11%3A22'
                   '%3A48Z&sp=r&sv=2021-08-06&sr=b&rscd=inline'
                   '&rsct=image/png&skoid=6aaadede-4fb3-4698'
                   '-a8f6-684d7786b067&sktid=a48cca56-e6da-484e'
                   '-a814-9c849652bcb3&skt=2023-06-15T21%3A01%3A59Z&ske=2023-06-16T21%3A01%3A59Z&sks=b&skv=2021-08-06'
                   '&sig=3HAPLAvAAYwgoCNsC3ciK4IDGpB6AOMnSb9E7fVDENI%3D'},
            {
                'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-jhAkc7zhErtmPvu7iVCBov6a/user'
                       '-5XvdCSuw1Ka02FejZPAbUHIb/img-LL94on1PRMR5clNNyWiSv6W4.png?st=2023-06-16T09%3A22%3A48Z&se'
                       '=2023-06-16T11%3A22%3A48Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede'
                       '-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-15T21'
                       '%3A01%3A59Z&ske=2023-06-16T21%3A01%3A59Z&sks=b&skv=2021-08-06&sig=t7eAoQ2ffcqhDY'
                       '/Yga9wzQzo1ZevXAi1fcATOlgVHyk%3D'}]},
                    'status_code': 200}
        create_an_image_generations_mock.return_value = response
        data = {
            "prompt": "A cute baby sea otter",
            "n": 2,
            "size": "1024x1024"
        }
        url = reverse('openai-create-an-image-generations')
        Response = self.client.post(url, data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_an_image_generations_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_image')
    def test_create_an_image_generations_with_invalid_data(self, create_an_image_generations_mock):
        response = None
        create_an_image_generations_mock.return_value = response
        invalid_data = {
            "size": "1024x1024"
        }
        url = reverse('openai-create-an-image-generations')
        Response = self.client.post(url, data=invalid_data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_transcription')
    def test_create_an_audio_transcription_with_mp3(self, create_an_audio_transcription_mock):
        response = {'data': {'text': 'Без тебя'}, 'status_code': 200}
        create_an_audio_transcription_mock.return_value = response
        audio_data = b'This is a mock audio file data.'
        audio_file = SimpleUploadedFile("audio_file.mp3", audio_data, content_type="audio/mpeg")
        data = {
            "file": audio_file,
            "model": "whisper-1"
        }
        url = reverse('openai-create-an-audio-transcription')
        Response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_an_audio_transcription_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_transcription')
    def test_create_an_audio_transcription_with_mp4(self, create_an_audio_transcription_mock):
        response = {'data': {'text': 'you you you you'}, 'status_code': 200}
        create_an_audio_transcription_mock.return_value = response
        mp4_data = b'This is a mock MP4 file data.'
        mp4_file = SimpleUploadedFile("video_file.mp4", mp4_data, content_type="video/mp4")

        data = {
            "file": mp4_file,
            "model": "whisper-1"
        }
        url = reverse('openai-create-an-audio-transcription')
        Response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_an_audio_transcription_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_transcription')
    def test_create_an_audio_transcription_with_invalid_file(self, create_an_audio_transcription_mock):
        response = {'data': {'error': {'code': None,
                                       'message': "Invalid file format. Supported formats: ['m4a', 'mp3', 'webm', "
                                                  "'mp4', 'mpga', 'wav', 'mpeg']",
                                       'param': None, 'type': 'invalid_request_error'}}, 'status_code': 400}
        create_an_audio_transcription_mock.return_value = response
        invalid_data = b'This is a mock .cer file data.'
        invalid_file = SimpleUploadedFile("certificate.cer", invalid_data, content_type="application/x-x509-ca-cert")
        data = {
            "file": invalid_file,
            "model": "whisper-1"
        }
        url = reverse('openai-create-an-audio-transcription')
        Response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(Response.data, response['data'])
        create_an_audio_transcription_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_translation')
    def test_create_an_audio_translation_with_mp3(self, create_an_audio_translation_mock):
        response = {'data': {'text': '♪♪ ♪♪ ♪♪'}, 'status_code': 200}
        create_an_audio_translation_mock.return_value = response
        audio_data = b'This is a mock audio file data.'
        audio_file = SimpleUploadedFile("audio_file.mp3", audio_data, content_type="audio/mpeg")
        data = {
            "file": audio_file,
            "model": "whisper-1"
        }
        url = reverse('openai-create-an-audio-translation')
        Response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_an_audio_translation_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_translation')
    def test_create_an_audio_translation_with_mp4(self, create_an_audio_translation_mock):
        response = {'data': {'text': 'you you you you'}, 'status_code': 200}
        create_an_audio_translation_mock.return_value = response
        mp4_data = b'This is a mock MP4 file data.'
        mp4_file = SimpleUploadedFile("video_file.mp4", mp4_data, content_type="video/mp4")

        data = {
            "file": mp4_file,
            "model": "whisper-1"
        }
        url = reverse('openai-create-an-audio-translation')
        Response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        create_an_audio_translation_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.create_translation')
    def test_create_an_audio_translation_with_invalid_file(self, create_an_audio_translation_mock):
        response = {'data': {'error': {'code': None,
                                       'message': "Invalid file format. Supported formats: ['m4a', 'mp3', 'webm', "
                                                  "'mp4', 'mpga', 'wav', 'mpeg']",
                                       'param': None, 'type': 'invalid_request_error'}}, 'status_code': 400}
        create_an_audio_translation_mock.return_value = response
        invalid_data = b'This is a mock .cer file data.'
        invalid_file = SimpleUploadedFile("certificate.cer", invalid_data, content_type="application/x-x509-ca-cert")
        data = {
            "file": invalid_file,
            "model": "whisper-1"
        }
        url = reverse('openai-create-an-audio-translation')
        Response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(Response.data, response['data'])
        create_an_audio_translation_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.retrieve_engine')
    def test_get_engine_detail(self, get_engine_detail_mock):
        response = {'data': {'created': None, 'id': 'text-davinci-003', 'object': 'engine', 'owner': 'openai-internal',
                             'permissions': None, 'ready': True}, 'status_code': 200}
        get_engine_detail_mock.return_value = response
        engine_id = "text-davinci-003"
        url = reverse('openai-get-engine-detail', kwargs={"engine_id": engine_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        get_engine_detail_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.retrieve_engine')
    def test_get_engine_detail_with_invalid_engine_id(self, get_engine_detail_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        get_engine_detail_mock.return_value = response
        invalid_engine_id = "text-dav"
        url = reverse('openai-get-engine-detail', kwargs={"engine_id": invalid_engine_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertDictEqual(Response.data, response['data'])
        get_engine_detail_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.retrieve_model')
    def test_get_model_detail(self, get_model_detail_mock):
        response = {'data': {'id': 'text-davinci-003', 'object': 'model', 'created': 1669599635, 'owned_by': 'openai-internal', 'permission': [{'id': 'modelperm-OCpZQfjQpoXnuT1DcEr3TtVy', 'object': 'model_permission', 'created': 1686222972, 'allow_create_engine': False, 'allow_sampling': True, 'allow_logprobs': True, 'allow_search_indices': False, 'allow_view': True, 'allow_fine_tuning': False, 'organization': '*', 'group': None, 'is_blocking': False}], 'root': 'text-davinci-003', 'parent': None}, 'status_code': 200}
        get_model_detail_mock.return_value = response
        model_id = "text-davinci-003"
        url = reverse('openai-get-model-detail', kwargs={"model_id": model_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(Response.data, response['data'])
        get_model_detail_mock.assert_called_once()

    @mock.patch('modules.django_openai.openai.services.OpenAIServices.OpenAIService.retrieve_model')
    def test_get_model_detail_with_invalid_engine_id(self, get_model_detail_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        get_model_detail_mock.return_value = response
        invalid_model_id = "text-dav"
        url = reverse('openai-get-model-detail', kwargs={"model_id": invalid_model_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertDictEqual(Response.data, response['data'])
        get_model_detail_mock.assert_called_once()
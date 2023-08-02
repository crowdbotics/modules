from unittest import mock

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APITestCase
from six import BytesIO


class DriveViewSet(APITestCase):

    def setUp(self):
        self.service_patch = mock.patch("modules.django_drive.drive.services.DriveService.service_account")
        self.service_patch.start()

    def tearDown(self):
        self.service_patch.stop()

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.get_drive_files')
    def test_file_list(self, get_drive_files_mock):
        response = {
            'nextPageToken': '~!!~AI9FV7QcFlFenPMVuUpioIZ47Q51oo3DuA8SODOW1qPzbonpwrbrsqRDHWms_JGU2blmD_1b6_5-R-rWMfBZ3'
                             'iLmbS2OqhO_YNkE9R3-O78azeoGxVMPVENmrCjKjicPrvT4h30JkCwMwo1VXPRyhuNm7dD0QDEjlwZ_LGwCq2nH'
                             '3rQQWyTYm3jHwjYT5XzyyhiRHQSFPfmPaRsdPljKgJXccJosJJ4HCfaqtwH2imga-6niPIeulG-fKoAa_2a9E-'
                             '6CKcnjPKf8YbwmCbziPSDMwbK5ykg0ecGHZUSjKUfq67eDObVMnYFQp4OgVzCinnhvDG4tdtCg',
            'kind': 'drive#fileList', 'incompleteSearch': False, 'files': [
                {
                    'kind': 'drive#file', 'mimeType': 'application/vnd.google-apps.folder',
                    'id': '11DbTJ0MwSVBm5E58QvKDpdwfvHyLaUV3',
                    'name': 'new demo folder'
                },
            ]
        }
        get_drive_files_mock.return_value = response
        responses = self.client.get(reverse('drive_service-file-list'))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data['nextPageToken'], response['nextPageToken'])
        self.assertEqual(responses.data['files'][0], response['files'][0])
        self.assertEqual(responses.data, response)
        get_drive_files_mock.assert_called_once()
        get_drive_files_mock.assert_called_once_with(query=None, page_token=None, page_size=None)

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.get_drive_files')
    def test_file_list_with_params(self, get_drive_files_mock):
        response = {'nextPageToken': '~!!~AI9FV7SzTN2opq6UazNdbWMzlab5cjjEYTHke6sNAcve8aCeO3ptJUCUZA-QmhNMCIkkgScqG'
                                     '-xKG-JYLQ8'
                                     '-CO65hNk9TMEdQBBhZzBe8SG9wTZC0AjAXttdp4mkgPs_RQwof3EU10vgVk5Z4Oxv6WLALN'
                                     '-TINJ8ee8AtHPjWUGak_Vr95AzyMTEl4ELICKeCy3VOLSH8HYoF3560DjXtsArqAZm6qNem1'
                                     '-Ew0wktYwsBXr14pzvXH_SoePTg'
                                     '-9VzxTOslOT1ALoDh5aM15VovONt9qDTwqP_DGb7AgdLmcXalBTtsifrGtbuxpU5S8ywbHh7M-0VKNd'
                                     '', 'kind': 'drive#fileList', 'incompleteSearch': False, 'files': [
            {'kind': 'drive#file', 'mimeType': 'text/x-python', 'id': '18Rkq9Rcl-73pmZHl72I2uEmjqOs8MFLj',
             'name': 'tests.py'}, {'kind': 'drive#file', 'mimeType': 'application/vnd.google-apps.folder',
                                   'id': '1i4byEyvW3L_H6T4DciveU0hpZWhyrx1W', 'name': ' Boys Solo'}]}
        get_drive_files_mock.return_value = response
        params = {'page_size': 10}
        responses = self.client.get(reverse('drive_service-file-list'), params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data['nextPageToken'], response['nextPageToken'])
        self.assertEqual(responses.data['files'][0], response['files'][0])
        self.assertEqual(responses.data, response)
        get_drive_files_mock.assert_called_once()
        get_drive_files_mock.assert_called_once_with(query=None, page_token=None, page_size='10')

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.get_drive_files')
    def test_file_list_with_exception(self, get_drive_files_mock):
        get_drive_files_mock.side_effect = Exception()
        responses = self.client.get(reverse('drive_service-file-list'))
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)
        get_drive_files_mock.assert_called_once()

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.share_drive_file')
    def test_share_file(self, share_drive_file_mock):
        response = {
            'id': '1-i7ozDwi9oWn8X4TJAg71os0tm2HY7QU',
            'name': 'Screenshot from 2023-01-16 17-23-53.png',
            'webViewLink': 'https://drive.google.com/file/d/1-i7ozDwi9oWn8X4TJAg71os0tm2HY7QU/view?usp=drivesdk'
        }
        share_drive_file_mock.return_value = response
        data = {
            "file_id": "1-i7ozDwi9oWn8X4TJAg71os0tm2HY7QU",
            "role": "reader",
            "user_type": "user",
            "emails": ["demomodule.123@gmail.com"]
        }
        responses = self.client.post(reverse('drive_service-share-file'), data)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data['id'], data['file_id'])
        self.assertEqual(responses.data['name'], response['name'])
        share_drive_file_mock.assert_called_once()
        share_drive_file_mock.assert_called_once_with(file_id='1-i7ozDwi9oWn8X4TJAg71os0tm2HY7QU', role='reader',
                                                      user_type='user', emails=['demomodule.123@gmail.com'])

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.share_drive_file')
    def test_share_file_without_file_id(self, share_drive_file_mock):
        response = {'file_id': [ErrorDetail(string='This field is required.', code='required')]}
        share_drive_file_mock.return_value = response
        data = {
            "role": "reader",
            "user_type": "user",
            "emails": ["demomodule.123@gmail.com"]
        }
        responses = self.client.post(reverse('drive_service-share-file'), data)
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.create_drive_folder')
    def test_create_folder(self, create_drive_folder_mock):
        response = {'id': '1wpEhAIoBpi00GHSDG-M_HU0Xr7ATW6xK',
                    'name': 'demo folder',
                    'mimeType': 'application/vnd.google-apps.folder',
                    'webViewLink': 'https://drive.google.com/drive/folders/1wpEhAIoBpi00GHSDG-M_HU0Xr7ATW6xK'
                    }
        create_drive_folder_mock.return_value = response
        data = {
            "folder_name": "demo folder"
        }
        responses = self.client.post(reverse('drive_service-create-folder'), data=data)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        create_drive_folder_mock.assert_called_once()
        create_drive_folder_mock.assert_called_once_with(folder_name='demo folder')

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.create_drive_folder')
    def test_create_drive_folder_without_folder_name(self, create_drive_folder_mock):
        response = {'folder_name': [ErrorDetail(string='This field is required.', code='required')]}
        create_drive_folder_mock.return_value = response
        data = {
        }
        responses = self.client.post(reverse('drive_service-create-folder'), data=data)
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.upload_drive_file')
    def test_upload_file(self, upload_drive_file_mock):
        response = {
            'id': '1CYAgNsNV82XE4cXdg6ufmuyK3-aG5QyR'
        }
        upload_drive_file_mock.return_value = response
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('image.JPG', image.getvalue())
        data = {
            "file": image_1,
            "parent_folder_id": "1DSzRQXubwWXtcUddzdIgwnLetWQzcbpf"

        }
        responses = self.client.post(reverse('drive_service-upload-file'), data=data)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data['id'], response['id'])
        upload_drive_file_mock.assert_called_once()

    @mock.patch('modules.django_drive.drive.services.DriveService.DriveService.upload_drive_file')
    def test_upload_file_without_file(self, upload_drive_file_mock):
        response = {
            'file': [
                ErrorDetail(string='No file was submitted.',
                            code='required')
            ]
        }
        upload_drive_file_mock.return_value = response
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        data = {
            "parent_folder_id": "1DSzRQXubwWXtcUddzdIgwnLetWQzcbpf"
        }
        responses = self.client.post(reverse('drive_service-upload-file'), data=data)
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

import mock

from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from rest_framework.test import APITestCase
from rest_framework import status
from six import BytesIO

from .serializers import OCRSerializer


class TextractOCRTestCases(APITestCase):

    @mock.patch('modules.django_ocr.ocr.service.OCRServices.TextractOCR.textract_text_ocr')
    def test_get_text(self, textract_text_ocr_mock):
        responses = {'data': 'Visa Gold 4000 1234 5678 9010 4000 GOOD THRU 12/20 EISHA KHANNA VISA Gold', 'status_code': 200}
        textract_text_ocr_mock.return_value = responses
        url = reverse('text_ocr-get-text')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "file": image_1
        }
        serializer = OCRSerializer(data=data)
        self.assertEqual(serializer.is_valid(), True)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responses['data'], response.data['data'])
        textract_text_ocr_mock.assert_called_once()

    @mock.patch('modules.django_ocr.ocr.service.OCRServices.TextractOCR.textract_ocr_kv')
    def test_get_key_value(self, textract_ocr_kv_mock):
        responses = {'data': {'Date of Birth ': ['09.09.1999 '], 'Identity Number ': ['15609-0979259-9 '], 'Date of Issue ': ['29.09.2020 '], 'Gender ': ['M '], 'Date of Expiry ': ['29.09.2029 '], 'Country of Stay ': ['Saudi Arabia '], "Holder's Signature ": [''], 'Father Name Muhammad ': ['2 '], 'Name ': ['Alam ']}, 'status_code': 200}
        textract_ocr_kv_mock.return_value = responses
        url = reverse('text_ocr-get-key-value')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "file": image_1
        }
        serializer = OCRSerializer(data=data)
        self.assertEqual(serializer.is_valid(), True)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responses['data'], response.data['data'])
        textract_ocr_kv_mock.assert_called_once()


class GoogleOCRTestCase(APITestCase):

    @mock.patch('modules.django_ocr.ocr.service.OCRServices.GoogleVisionOCR.get_text_from_image')
    def test_get_text(self, get_text_from_image_mock):
        responses = {'data': "PAKISTAN National Identity Card\nISLAMIC REPUBLIC OF PAKISTAN\n69\nName\nAlam\nFather Name\nMuhammad\nGender Country of Stay\nM\nSaudi Arabia\nIdentity Number\n15609-0979259-9\nDate of Issue\n29.09.2020\nDate of Birth\n09.09.1999\nCIGGL\nDate of Expiry\n29.09.2029\nand\nHolder's Signature", 'status_code': 200}
        get_text_from_image_mock.return_value = responses
        url = reverse('google_ocr-get-text')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "file": image_1
        }
        serializer = OCRSerializer(data=data)
        self.assertEqual(serializer.is_valid(), True)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responses['data'], response.data['data'])
        get_text_from_image_mock.assert_called_once()


class TesserOCRTestCase(APITestCase):

    @mock.patch('modules.django_ocr.ocr.service.OCRServices.TesserOCR.get_text')
    def test_get_text(self, get_text_mock):
        responses = {'data': 'ISLAMIC REPUBLIC OF PAKISTAN\n\n(#) PAKISTAN National Identity =\n\nName\n— Alam\n\nGender [Country ofStay\nM _ | Saudi Arabia\n\nIdentity Number | Date of Birth\n15609-0979259-9 | 09.09.1999\n\n—\n\nDate of issue —_—| Date of Expiry\n\n29.09.2020 | 29.09.2029\n\nHolder s Signature\n', 'status_code': 200}
        get_text_mock.return_value = responses
        url = reverse('tesser_ocr-get-text')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "file": image_1
        }
        serializer = OCRSerializer(data=data)
        self.assertEqual(serializer.is_valid(), True)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responses['data'], response.data['data'])
        get_text_mock.assert_called_once()

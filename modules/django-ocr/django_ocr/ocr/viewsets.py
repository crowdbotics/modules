import os

from PIL import Image
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import OCRSerializer

from .service.OCRServices import TesserOCR, AWSTextractOCR, GoogleVisionOCR


class TextractOCRViewSet(GenericViewSet):
    """
    Textract is a machine learning (ML) service by Amazon that automatically extracts text, handwriting, and data
    from scanned documents. This class Provide 2 function that extract text from images:
    - get_text :  Extract text from images in form of String
    - get_key_value: Extract text from images in the form of key value pairs. This is suitable for images that contains forms and tables.
    """

    serializer_class = OCRSerializer
    textract = AWSTextractOCR(aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID', ''),
                              aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY', ''),
                              service_name=os.getenv('SERVICE_NAME', ''),
                              region_name=os.getenv('REGION_NAME', ''))

    @action(detail=False, methods=['post'], url_path='text')
    def get_text(self, request):
        """
        Extract text from images and return string
        :body_params  file: File to be uploaded /n
        :return: Extracted data in the form of string
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file_in_bytes = serializer.validated_data.get('file').read()
        response = self.textract.textract_text_ocr(file_bytes=file_in_bytes)
        return Response(data=response, status=response.get('status_code'))

    @action(detail=False, methods=['post'], url_path='json')
    def get_key_value(self, request):
        """
        Extract text from image that contains tables and forms
        :body_params  file: File to be uploaded /n
        :return: Extracted data in the form of  key value pairs
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file_in_bytes = serializer.validated_data.get('file').read()
        response = self.textract.textract_ocr_kv(file_bytes=file_in_bytes)
        return Response(data=response, status=response.get('status_code'))


class GoogleOCRViewSet(GenericViewSet):
    """
    Google OCR is can detect and extract text from images For example, a photograph might contain a street sign or traffic sign.
    - get_text : Extract Text from image and return string
    """

    serializer_class = OCRSerializer
    google_ocr = GoogleVisionOCR(credentials_path=os.getenv('GOOGLE_VISION_CREDENTIALS_PATH', ''))

    @action(detail=False, methods=['post'], url_path='text')
    def get_text(self, request):
        """
        Extract text from images and return string
        :body_params  file: File to be uploaded /n
        :return: Extracted data in the form of string
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.validated_data.get('file').read()
        response = self.google_ocr.get_text_from_image(image_file=image)
        return Response(data=response, status=response.get('status_code'))


class TesserOCRViewSet(GenericViewSet):
    """
    Tesserocr is a Python wrapper around the Tesseract C++ API
    - get_text :  Extract text from image with good quality
    """
    serializer_class = OCRSerializer
    tesser_ocr = TesserOCR()

    @action(detail=False, methods=['post'], url_path='text')
    def get_text(self, request):
        """
            Extract text from image with good quality. Unable to provide consistent result.
            Image need to be modified in some cases to get good result such as
            - Increase Sharpness of image
            - Enhance Text outline in image

            :body_params  file: File to be uploaded /n
            :return: Extracted data in the form of string

        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = Image.open(serializer.validated_data.get('file'))
        response = self.tesser_ocr.get_text(file=image)
        return Response(data=response, status=response.get('status_code'))
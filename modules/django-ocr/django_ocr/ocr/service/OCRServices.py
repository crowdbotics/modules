import boto3

from collections import defaultdict
from google.oauth2.service_account import Credentials
from google.cloud import vision
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from tesserocr import PyTessBaseAPI


class GoogleVisionOCR:
    def __init__(self, credentials_path: str):
        self.CREDENTIALS_PATH = credentials_path

    def get_text_from_image(self, image_file):
        try:
            credentials = Credentials.from_service_account_file(self.CREDENTIALS_PATH)
            client = vision.ImageAnnotatorClient(credentials=credentials)

            image = vision.Image(content=image_file)

            response = client.text_detection(image=image)
            texts = response.text_annotations[0].description
            return {"data": texts, "status_code": HTTP_200_OK}
        except Exception as e:
            return {"data": e.args, "status_code": HTTP_400_BAD_REQUEST}


class AWSTextractOCR:
    def __init__(self, aws_access_key_id, aws_secret_access_key, service_name, region_name):
        self.AWS_ACCESS_KEY_ID = aws_access_key_id
        self.AWS_SECRET_ACCESS_KEY = aws_secret_access_key
        self.SERVICE_NAME = service_name
        self.REGION_NAME = region_name
        self.textract_client = boto3.client(
            aws_access_key_id=self.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
            service_name=self.SERVICE_NAME,
            region_name=self.REGION_NAME
        )

    @staticmethod
    def find_value_block(key_block, value_map):
        value_block = {}
        for relationship in key_block['Relationships']:
            if relationship['Type'] == 'VALUE':
                for value_id in relationship['Ids']:
                    value_block = value_map[value_id]
        return value_block

    @staticmethod
    def get_text(result, blocks_map):
        text = ''
        if 'Relationships' in result:
            for relationship in result['Relationships']:
                if relationship['Type'] == 'CHILD':
                    for child_id in relationship['Ids']:
                        word = blocks_map[child_id]
                        if word['BlockType'] == 'WORD':
                            text += word['Text'] + ' '
                        if word['BlockType'] == 'SELECTION_ELEMENT':
                            if word['SelectionStatus'] == 'SELECTED':
                                text += 'X '
        return text

    @staticmethod
    def get_key_value_maps(blocks):
        key_map = {}
        value_map = {}
        block_map = {}
        for block in blocks:
            block_id = block['Id']
            block_map[block_id] = block
            if block['BlockType'] == "KEY_VALUE_SET":
                if 'KEY' in block['EntityTypes']:
                    key_map[block_id] = block
                else:
                    value_map[block_id] = block
        return key_map, value_map, block_map

    def get_kv_relationship(self, key_map, value_map, block_map):
        kvs = defaultdict(list)
        for block_id, key_block in key_map.items():
            value_block = self.find_value_block(key_block, value_map)
            key = self.get_text(key_block, block_map)
            val = self.get_text(value_block, block_map)
            kvs[key].append(val)
        return kvs

    def textract_text_ocr(self, file_bytes):
        try:
            text = ""
            response = self.textract_client.detect_document_text(Document={'Bytes': file_bytes})
            for item in response["Blocks"]:
                if item["BlockType"] == "LINE":
                    text += " " + item["Text"]
            return {"data": text.strip(), "status_code": response['ResponseMetadata']['HTTPStatusCode']}
        except Exception as e:
            return {"data": e.args, "status_code": HTTP_400_BAD_REQUEST}

    def textract_ocr_kv(self, file_bytes):
        try:
            # process using file bytes
            response = self.textract_client.analyze_document(Document={'Bytes': file_bytes},
                                                             FeatureTypes=["TABLES", "FORMS"])

            # get key and value maps
            key_map, value_map, block_map = self.get_key_value_maps(blocks=response['Blocks'])

            # Get Key Value relationship
            kv_relationship = self.get_kv_relationship(key_map=key_map, value_map=value_map, block_map=block_map)
            return {"data": kv_relationship, "status_code": response['ResponseMetadata']['HTTPStatusCode']}
        except Exception as e:
            return {"data": e.args, "status_code": HTTP_400_BAD_REQUEST}


class TesserOCR:

    def get_text(self, file):
        try:
            with PyTessBaseAPI() as api:
                api.SetImage(file)
                utf8_text = api.GetUTF8Text()
            return {'data': utf8_text, "status_code": HTTP_200_OK}
        except Exception as e:
            return {"data": e.args, "status_code": HTTP_400_BAD_REQUEST}


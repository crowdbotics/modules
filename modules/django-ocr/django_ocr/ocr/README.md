# OCR
- The OCR (Optical Character Recognition) module will enable an accurate and efficient conversion of printed text into digital text.
- This module will also enable the conversion of images of hand-written text into digital text.

## Scope Features
The following are the key features in scope for this module. 

1. Ability to convert  printed text into digital text.
2. Ability to convert images of hand-written text in digital text.
3. Ability to extract tabular data and form data

## Required SDKs and Libraries
A 3rd party integration requirements which is:
- [TesserOCR](https://pypi.org/project/tesserocr/)
- [AWS boto3](https://pypi.org/project/amazon-textract-response-parser/)
- [Google Vision](https://pypi.org/project/google-cloud-vision/)

Can be install by the following commands:
- pip install tesserocr
- pip install amazon-textract-response-parser
- pip install google-cloud-vision

## Keys And Credietials Setup
1. Steps to get AWS Textract Credentials
- Log in to the AWS Management Console.
- Select the Services menu, and then select Amazon Textract.
- Click on Access Keys, under the Security Credentials section.
- Click on the Create New Access Key button and a dialog box will appear.  
- Click on the Download Key File button to download the access key file.  
- Open the downloaded file and copy the Access Key ID and Secret Access Key.  
- Store the Access Key ID and Secret Access Key in a safe place.

2. Steps to get Google Vision OCR Credentials
- Sign in to the Google Cloud Platform Console.
- Create a new project or select an existing one.  
- Navigate to the APIs & Services > Credentials page.  
- Click Create credentials > API key.  
- Copy the API key and save it for use with the Google Vision OCR API.  
- Enable the Google Vision OCR API by clicking on the APIs & Services > Library link.  
- Search for the Google Vision OCR API and click the Enable button.  
- Generate an OAuth 2.0 Client ID, by clicking Create credentials > OAuth client ID.  
- Select the Web application option, provide a name and click the Create button.
- Copy the Client ID and Client secret for use with the Google Vision OCR API.

## Environment variables

1. For AWS Textract
```
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
SERVICE_NAME=""
REGION_NAME=""
```

2. For Google OCR
```
GOOGLE_VISION_CREDENTIALS_PATH=""
```
## Setup Installation
To install the given dependencies in `setup.py`. Go to the `modules/django-ocr/ocr/` and run the following command:
```
python -m pip install .
```
Start the server by running the following command :
```
python manage.py migrate
python manage.py runserver
```
## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                    | Param | Description                                                                                                                                                                                                  |
|-----------------------------|:-----:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modules/ocr/aws/text/ `    | None  | Extract text from images in form of String                                                                                                                                                                   |
| `/modules/ocr/aws/json/`    | None  | Extract text from images in the form of key value pairs. This is suitable for images that contains forms and tables.                                                                                         |
| `/modules/ocr/google/text/` | None  | Extract Text from image and return string                                                                                                                                                                    |
| `/modules/ocr/tesser/text/` | None  | Extract text from image with good quality. Unable to provide consistent result.Image need to be modified in some cases to get good result such as Increase Sharpness of image, Enhance Text outline in image |

## OCR Endpoints Postman Collection:
Here is a collection of all the api endpoints for the OCR module.

[OCR-Apis Postman Collection](https://drive.google.com/file/d/1FOh5g3_FWRM12O62OvLHf85VSrU6rOMd/view?usp=share_link)
 
## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1kHM3qxlO7OhScV4elBxI-nlY3X55IV5uUnMKJgsZFX4/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
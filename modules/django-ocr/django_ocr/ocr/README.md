## Django OCR backend configuration and information

## Module description

The OCR (Optical Character Recognition) module will enable an accurate and efficient conversion of printed text into
digital text.
This module will also enable the conversion of images of handwritten text into digital text.

The following are the scope features for this module:

- Ability to convert printed text into digital text.
- Ability to convert images of handwritten text in digital text.
- Ability to extract tabular data and form data

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

- For AWS Textract

```dotenv
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
SERVICE_NAME=""
REGION_NAME=""
```

- For Google OCR

```dotenv
GOOGLE_VISION_CREDENTIALS_PATH=""
```

## 3rd party setup

Create `AWS Textract` Developer Account Setup:

- Log in to the AWS Management Console.
- Select the Services menu, and then select Amazon Textract.
- Click on Access Keys, under the Security Credentials section.
- Click on the Create New Access Key button and a dialog box will appear.
- Click on the Download Key File button to download the access key file.
- Open the downloaded file and copy the Access Key ID and Secret Access Key.
- Store the Access Key ID and Secret Access Key in a safe place.
  ![screenshot-nimbusweb me-2023 03 24-15_10_46](https://user-images.githubusercontent.com/120275623/227495935-5d4c540a-eb54-4b8b-93c5-32c255d83e8b.png)

Create `Google Vision OCR` Developer Account Setup:

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
  ![screenshot-nimbusweb me-2023 03 24-15_31_51](https://user-images.githubusercontent.com/120275623/227498291-7e2ae584-70a5-40a4-bd09-3d234a958cba.png)

## Dependencies

[TessorOCR](https://github.com/sirfz/tesserocr/blob/master/README.rst)

[AWS boto3](https://github.com/boto/boto3/blob/develop/README.rst)

[Google Vision](https://github.com/googleapis/python-vision/blob/main/README.rst)

Dependencies used:

- [tesserocr](https://pypi.org/project/tesserocr/)
- [boto3](https://pypi.org/project/amazon-textract-response-parser/)
- [google-cloud-vision](https://pypi.org/project/google-cloud-vision/)

## API details

| Api Name                           |       Param       | Description                                                                                                                                                                                                  |
|------------------------------------|:-----------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modules/ocr/aws/text/ ` `POST`    | form-data `file`  | Extract text from images in form of String                                                                                                                                                                   |
| `/modules/ocr/aws/json/` `POST`    | form-data `file`  | Extract text from images in the form of key value pairs. This is suitable for images that contains forms and tables.                                                                                         |
| `/modules/ocr/google/text/` `POST` | form-data `file`  | Extract Text from image and return string                                                                                                                                                                    |
| `/modules/ocr/tesser/text/` `POST` | form-data `file`  | Extract text from image with good quality. Unable to provide consistent result.Image need to be modified in some cases to get good result such as Increase Sharpness of image, Enhance Text outline in image |



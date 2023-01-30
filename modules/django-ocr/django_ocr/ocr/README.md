# OCR

Module for extraction of text from Images.



# Environment variables

For AWS Textract
```
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
SERVICE_NAME=""
REGION_NAME=""
```

For Google OCR
```
GOOGLE_VISION_CREDENTIALS_PATH=""
```

# Steps to get AWS Textract Credentials
1. Log in to the AWS Management Console.
2. Select the Services menu, and then select Amazon Textract.
3. Click on Access Keys, under the Security Credentials section.
4. Click on the Create New Access Key button and a dialog box will appear.  
5. Click on the Download Key File button to download the access key file.  
6. Open the downloaded file and copy the Access Key ID and Secret Access Key.  
7. Store the Access Key ID and Secret Access Key in a safe place.
> 

# Steps to get Google Vision OCR Credentials
1. Sign in to the Google Cloud Platform Console.
2. Create a new project or select an existing one.  
3. Navigate to the APIs & Services > Credentials page.  
4. Click Create credentials > API key.  
5. Copy the API key and save it for use with the Google Vision OCR API.  
6. Enable the Google Vision OCR API by clicking on the APIs & Services > Library link.  
7. Search for the Google Vision OCR API and click the Enable button.  
8. Generate an OAuth 2.0 Client ID, by clicking Create credentials > OAuth client ID.  
9. Select the Web application option, provide a name and click the Create button.
10. Copy the Client ID and Client secret for use with the Google Vision OCR API.

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                    | Param | Description                                                                                                                                                                                                  |
|-----------------------------|:-----:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modules/ocr/aws/text/ `    | None  | Extract text from images in form of String                                                                                                                                                                   |
| `/modules/ocr/aws/json/`    | None  | Extract text from images in the form of key value pairs. This is suitable for images that contains forms and tables.                                                                                         |
| `/modules/ocr/google/text/` | None  | Extract Text from image and return string                                                                                                                                                                    |
| `/modules/ocr/tesser/text/` | None  | Extract text from image with good quality. Unable to provide consistent result.Image need to be modified in some cases to get good result such as Increase Sharpness of image, Enhance Text outline in image |
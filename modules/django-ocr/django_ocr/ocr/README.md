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

> 

# Steps to get Google Vision OCR Credentials
> 


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                       | Param | Description                                                                                                                                                                                                  |
|------------------------------------------------|:-----:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modules/ocr/aws/text/ `          | None  | Extract text from images in form of String                                                                                                                                                                   |
| `/modules/ocr/aws/json/`    | None  | Extract text from images in the form of key value pairs. This is suitable for images that contains forms and tables.                                                                                         |
| `/modules/ocr/google/text/` | None  | Extract Text from image and return string                                                                                                                                                                    |
| `/modules/ocr/tesser/text/`            | None  | Extract text from image with good quality. Unable to provide consistent result.Image need to be modified in some cases to get good result such as Increase Sharpness of image, Enhance Text outline in image |
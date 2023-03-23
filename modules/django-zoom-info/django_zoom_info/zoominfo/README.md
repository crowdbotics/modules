# Zoom Info Module
By using this module, users will be able to retrieve the data related to Sales, Marketing, operations and job candidates.

## Migration
```
python manage.py makemigrations
python manage.py migrate

```
 
Start the server by running the following command :
```
python manage.py runserver
```

## settings.py
```
ZOOM_INFO_BASE_URL=""
```

# Setup Account
1. Create an account in Zoom info.
2. Go to Api integration and pick up your base URL.


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/zoominfo/auth/token/` | body `{ username: '', password: ''}` | Takes body params to get authentication token for zoom api.|
| `/modules/zoominfo/data/search/` | body_params `{ metroRegion: '', industryCodes: '', techAttributeTagList: '' }` Authorization `{access-token}` | Returns a list of Companies from ZoomInfo's data which meet the specified search criteria.|
| `/modules/zoominfo/data/enrich/` | body_params `{ matchCompanyInput: '', outputFields: ''}` Authorization `{access-token}`| Used to retrieve company details using valid query parameters|
| `/modules/zoominfo/data/bulk/` | body_params `{ jobType: '', query:''}` Authorization `{access-token}` | Used to search, retrieve, and enrich large ZoomInfo company and contact datasets. |

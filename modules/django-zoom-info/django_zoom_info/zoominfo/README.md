## Django Zoom Info backend configuration and information

## Module description

By using this module, users will be able to retrieve the data related to Sales, Marketing, operations and job
candidates.

The following are the features in scope for this module.

- Secure Authentication using JWT
- Retrieve different type of data using search endpoint
- Retrieve different type of data using enrich endpoint
- Retrieve different type of bulk data using multiple endpoints

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
ZOOM_INFO_BASE_URL="<API_Base_URL>"
```

## 3rd party setup

To get the zoom info credentials setup follow the steps which are given below:

- Create an account in [Zoom info](https://login.zoominfo.com/).
- Go to Api integration and pick up your base URL.

## Dependencies

No dependencies will be used.

## API details

| Api Name                         |                                                     Param                                                     | Description                                                                                |
|----------------------------------|:-------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------|
| `/modules/zoominfo/auth/token/`  |                                     body `{ username: '', password: ''}`                                      | Takes body params to get authentication token for zoom api.                                |
| `/modules/zoominfo/data/search/` | body_params `{ metroRegion: '', industryCodes: '', techAttributeTagList: '' }` Authorization `{access-token}` | Returns a list of Companies from ZoomInfo's data which meet the specified search criteria. |
| `/modules/zoominfo/data/enrich/` |            body_params `{ matchCompanyInput: '', outputFields: ''}` Authorization `{access-token}`            | Used to retrieve company details using valid query parameters                              |
| `/modules/zoominfo/data/bulk/`   |                     body_params `{ jobType: '', query:''}` Authorization `{access-token}`                     | Used to search, retrieve, and enrich large ZoomInfo company and contact datasets.          |
## Crowdbotics Files Component - Backend

This module contains all needed resources to get the Files component for React
Native mobile client.

- This module uses file storage. You should enable S3 support
  in your Crowdbotics app in order to get it working properly.
- If file is submitted in base64, a special header must be used
  in order to preserve the extension: "data:[filename.ext];base64," 
  (i.e. "data:my_diapos.ppt;base64,{BASE64_ENCODED-CONTENT}")

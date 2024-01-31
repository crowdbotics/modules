## Django Mailchimp Full Integration

## Module description
This Django module fully integrates with Mailchimp, covering aspects such as secure user authentication, list management with user data synchronization on registration/update, campaign management with server-side template customization, web form backend integration, and automated daily reporting on campaign performance.

## Features
- User Authentication with Mailchimp API.
- List Management: Create, update, delete, and sync user data.
- Campaign Management: Create, manage, and send customized email campaigns.
- Web Form Integration: Backend logic for Mailchimp signup forms.
- Reporting and Analytics: Automated daily reports on campaign performance.

## Environment variables
```dotenv
MAILCHIMP_API_KEY=\"<API_KEY>\"
MAILCHIMP_SERVER_PREFIX=\"<SERVER_PREFIX>\"
USER_DATA_SYNC_EVENTS=\"registration,profile_update\"
DAILY_REPORT_SCHEDULER=\"0 0 * * *\"
```

## Dependencies

- mailchimp-marketing

## Installation and Setup
Follow the documentation to set up environment variables and install the required dependencies for using this module.
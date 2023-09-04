import json
import os
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
import mailchimp_marketing as MailchimpMarketing

from mailchimp_marketing.api_client import ApiClientError


class MailchimpService:

    def __init__(self, config=None):
        if not config:
            config = {
                "api_key": os.getenv("MAILCHIMP_API_KEY", ""),
                "server": os.getenv("MAILCHIMP_SERVER_REGION", "")
            }
        self.mailchimp_client = MailchimpMarketing.Client()
        self.mailchimp_client.set_config(config)

    def get_audience_lists(self):
        try:
            response = self.mailchimp_client.lists.get_all_lists()
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_audience_list(self, body):
        try:
            response = self.mailchimp_client.lists.create_list(body=body)
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_audience_list(self, list_id: str):
        try:
            response = self.mailchimp_client.lists.get_list(list_id=list_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_audience_list(self, list_id: str, body):
        try:
            response = self.mailchimp_client.lists.update_list(list_id, body=body)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_audience_list(self, list_id: str):
        try:
            response = self.mailchimp_client.lists.delete_list(list_id)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def batch_subscribe_or_unsubscribe_audience(self, list_id: str, body):
        try:
            response = self.mailchimp_client.lists.batch_list_members(list_id, body=body)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_member_info(self, list_id: str, **kwargs):
        try:
            response = self.mailchimp_client.lists.get_list_members_info(list_id, **kwargs)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_list_member(self, list_id: str, body):
        try:
            response = self.mailchimp_client.lists.add_list_member(list_id=list_id,
                                                                   body=body
                                                                   )
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_member_info(self, list_id: str, subscriber_hash: str):
        try:
            response = self.mailchimp_client.lists.get_list_member(list_id=list_id, subscriber_hash=subscriber_hash)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_list_member(self, list_id: str, subscriber_hash: str, body):
        try:
            response = self.mailchimp_client.lists.update_list_member(list_id=list_id,
                                                                      subscriber_hash=subscriber_hash,
                                                                      body=body
                                                                      )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_list_member(self, list_id: str, subscriber_hash: str):
        try:
            response = self.mailchimp_client.lists.delete_list_member_permanent(list_id=list_id,
                                                                                subscriber_hash=subscriber_hash)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_list_member_tags(self, list_id: str, subscriber_hash: str):
        try:
            response = self.mailchimp_client.lists.get_list_member_tags(list_id=list_id,
                                                                        subscriber_hash=subscriber_hash)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_or_remove_member_tag(self, list_id: str, subscriber_hash: str, body):
        try:
            response = self.mailchimp_client.lists.update_list_member_tags(list_id=list_id,
                                                                           subscriber_hash=subscriber_hash,
                                                                           body=body
                                                                           )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_segments(self, list_id: str):
        try:
            response = self.mailchimp_client.lists.list_segments(list_id=list_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_segment(self, list_id: str, body):
        try:
            response = self.mailchimp_client.lists.create_segment(list_id=list_id,
                                                                  body=body)
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_segment_info(self, list_id: str, segment_id: str):
        try:
            response = self.mailchimp_client.lists.get_segment(list_id=list_id, segment_id=segment_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_segment(self, list_id: str, segment_id: str):
        try:
            response = self.mailchimp_client.lists.delete_segment(list_id=list_id, segment_id=segment_id)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_segment(self, list_id: str, segment_id: str, body):
        try:
            response = self.mailchimp_client.lists.update_segment(list_id=list_id, segment_id=segment_id,
                                                                  body=body
                                                                  )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_template(self):
        try:
            response = self.mailchimp_client.templates.list()
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_template(self, body):
        try:
            response = self.mailchimp_client.templates.create(body=body)
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_template_info(self, template_id: str):
        try:
            response = self.mailchimp_client.templates.get_template(template_id=template_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_template(self, template_id: str):
        try:
            response = self.mailchimp_client.templates.delete_template(template_id=template_id)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_template(self, template_id: str, body):
        try:
            response = self.mailchimp_client.templates.update_template(template_id=template_id,
                                                                       body=body
                                                                       )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_template_folder(self):
        try:
            response = self.mailchimp_client.templateFolders.list()
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_template_folder(self, body):
        try:
            response = self.mailchimp_client.templateFolders.create(body=body)
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_template_folder(self, folder_id: str):
        try:
            response = self.mailchimp_client.templateFolders.get(folder_id=folder_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_template_folder(self, folder_id: str):
        try:
            response = self.mailchimp_client.templateFolders.remove(folder_id=folder_id)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_template_folder(self, folder_id: str, body):
        try:
            response = self.mailchimp_client.templateFolders.update(folder_id=folder_id,
                                                                    body=body
                                                                    )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_campaigns(self):
        try:
            response = self.mailchimp_client.campaigns.list()
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_campaigns(self, body):
        try:
            response = self.mailchimp_client.campaigns.create(body=body)
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'error': error.text, 'status_code': error.status_listcode}

    def get_campaign_info(self, campaign_id: str):
        try:
            response = self.mailchimp_client.campaigns.get(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_campaign(self, campaign_id: str):
        try:
            response = self.mailchimp_client.campaigns.remove(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_campaign_settings(self, campaign_id: str, body):
        try:
            response = self.mailchimp_client.campaigns.update(campaign_id=campaign_id,
                                                              body=body
                                                              )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def cancel_campaign(self, campaign_id: str):
        try:
            response = self.mailchimp_client.campaigns.cancel_send(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def send_campaign(self, campaign_id: str):
        try:
            response = self.mailchimp_client.campaigns.send(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def schedule_campaign(self, campaign_id: str, body):
        try:
            response = self.mailchimp_client.campaigns.schedule(campaign_id=campaign_id,
                                                                body=body
                                                                )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def unschedule_campaign(self, campaign_id: str):
        try:
            response = self.mailchimp_client.campaigns.unschedule(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_campaign_folder(self):
        try:
            response = self.mailchimp_client.campaignFolders.list()
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def add_campaign_folder(self, body):
        try:
            response = self.mailchimp_client.campaignFolders.create(body=body)
            return {'text': response, 'status_code': HTTP_201_CREATED}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_campaign_folder(self, folder_id: str):
        try:
            response = self.mailchimp_client.campaignFolders.get(folder_id=folder_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def delete_campaign_folder(self, folder_id: str):
        try:
            response = self.mailchimp_client.campaignFolders.remove(folder_id=folder_id)
            return {'text': response, 'status_code': HTTP_204_NO_CONTENT}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def update_campaign_folder(self, folder_id: str, body):
        try:
            response = self.mailchimp_client.campaignFolders.update(folder_id=folder_id,
                                                                    body=body
                                                                    )
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def list_campaign_reports(self):
        try:
            response = self.mailchimp_client.reports.get_all_campaign_reports()
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_campaign_report(self, campaign_id: str):
        try:
            response = self.mailchimp_client.reports.get_campaign_report(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_campaign_abuse_reports(self, campaign_id: str):
        try:
            response = self.mailchimp_client.reports.get_campaign_abuse_reports(campaign_id=campaign_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_campaign_abuse_report(self, campaign_id: str, report_id: str):
        try:
            response = self.mailchimp_client.reports.get_campaign_abuse_report(campaign_id=campaign_id,
                                                                               report_id=report_id)
            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_campaign_open_details(self, campaign_id: str):
        try:
            response = self.mailchimp_client.reports.get_campaign_open_details(campaign_id=campaign_id)

            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}

    def get_campaign_click_details(self, campaign_id: str):
        try:
            response = self.mailchimp_client.reports.get_campaign_click_details(campaign_id=campaign_id)

            return {'text': response, 'status_code': HTTP_200_OK}
        except ApiClientError as error:
            return {'text': error.text, 'status_code': error.status_code}


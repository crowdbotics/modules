from django.http import JsonResponse
from .mailchimp.mailchimp_client import MailchimpClient

def mailchimp_request(request):
    # Create an instance of the MailchimpClient
    mailchimp_client = MailchimpClient()

    # Use the client to send a request to the Mailchimp API
    response = mailchimp_client.send_request()

    # Return the response as JSON
    return JsonResponse(response)
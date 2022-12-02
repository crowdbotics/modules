from django.http import HttpResponse
import json


class ApiExceptionResponse:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request_temp = self.get_response(request)
        status_code = request_temp.status_code

        if status_code >= 500:
            response_data = {
                "success": "false",
                "status_code": status_code,
                "data": None,
                "message": request_temp.reason_phrase,
                "errors": {}
            }
            return HttpResponse(json.dumps(response_data), status=status_code, content_type="application/json")
        return request_temp

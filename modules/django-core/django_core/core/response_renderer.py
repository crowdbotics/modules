from rest_framework.renderers import JSONRenderer


STATUS_CODE_MESSAGES = {
    200: "OK",
    201: "Created.",
    202: "Accepted.",
    302: "Found.",
    400: "Bad Request",
    401: "Unauthorized.",
    403: "You do not have permission to perform this action.",
    404: "Not Found.",
    405: "Method Not Allowed.",
    406: "Not Acceptable.",
    408: "Request Timeout.",
    413: "Request Payload Too Large.",
    414: "URI Too Long.",
    415: "Unsupported Media Type.",
    429: "Request was throttled.",
}


class CustomJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code
        try:
            status_code_message = STATUS_CODE_MESSAGES[status_code]
        except KeyError:
            status_code_message = "Something went wrong"

        response = {
            "success": "true",
            "status_code": status_code,
            "data": data,
            "message": status_code_message,
            "errors": {}
        }

        if not str(status_code).startswith('2'):
            response["success"] = "false"
            response["data"] = None
            try:
                for key, value in data.items():
                    if isinstance(value, list):
                        response["errors"].update({key: value[0]})
                    elif isinstance(value, str):
                        response["errors"].update({key: value})
                response["message"] = status_code_message
            except Exception as e:
                print(e)
                response["data"] = None
                response["message"] = status_code_message

        return super(CustomJSONRenderer, self).render(response, accepted_media_type, renderer_context)
        
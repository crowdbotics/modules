from rest_framework.renderers import JSONRenderer


class ApiRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code
        status_code_messages = {
            "200": "OK",
            "201": "Created",
            "400": "Bad Request",
            "401": "Unauthorized",
            "403": "Forbidden",
            "404": "Not Found",
            "405": "Method Not Allowed",
            "408": "Request Timeout"
        }

        if str(status_code) in status_code_messages:
            status_code_message = status_code_messages[str(status_code)]
        else:
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
                keys = data.keys()
                for key in keys:
                    if isinstance(data.get(key), list):
                        response["errors"].update({key: data.get(key)[0]})
                    elif isinstance(data.get(key), str):
                        response["errors"].update({key: data.get(key)})
                response["message"] = status_code_message
            except Exception as e:
                print(e)
                response["data"] = None
                response["message"] = status_code_message

        return super(ApiRenderer, self).render(response, accepted_media_type, renderer_context)

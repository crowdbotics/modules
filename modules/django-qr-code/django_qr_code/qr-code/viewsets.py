from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import io
import qrcode
import base64


class QRCodeView(APIView):

    def post(self, request, *args, **kwargs):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=4,
            border=4,
        )

        qr.add_data(request.data['text'])
        qr.make(fit=True)
        img = qr.make_image()

        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return Response({ "qrcode": img_str }, status=status.HTTP_200_OK)


from .models import FormDefinition
from .serializers import FormDefinitionSerializer, FormAnswersSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


from .serializers import FormAnswersSerializer, FormDefinitionSerializer

class FormDefinitionView(APIView):

    def post(self, request, *args, **kwargs):
        formResponse = request.data["form_response"]
        isForm = FormDefinition.objects.filter(form_id=formResponse["form_id"]).exists()

        if not isForm:
            for fields in formResponse["definition"]["fields"]:
                payloadFormDefinition = {}
                payloadFormDefinition["form_id"] = formResponse["form_id"]
                payloadFormDefinition["definition_id"] = fields["id"]
                payloadFormDefinition["type"] = fields["type"]
                payloadFormDefinition["title"] = fields["title"]

                if fields["type"] == "multiple_choice":
                    payloadFormDefinition["choices"] = fields["choices"]
                    
                formDefinitionSerializer = FormDefinitionSerializer(data=payloadFormDefinition)

                if formDefinitionSerializer.is_valid():
                    formDefinitionSerializer.save()
                else:
                    return Response(formDefinitionSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        for fields in formResponse["answers"]:
            payloadFormAnswers = {}
            payloadFormAnswers["form_definition_id"] = fields["field"]["id"]
            payloadFormAnswers["type"] = fields["type"]
            if fields["type"] == "choice":
                payloadFormAnswers["answer"] = fields["choice"]["label"]
            else:
                payloadFormAnswers["answer"] = fields["text"]

            formAnswersSerializer = FormAnswersSerializer(data=payloadFormAnswers)
            if formAnswersSerializer.is_valid():
                formAnswersSerializer.save()
            else:
                return Response(formDefinitionSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "data inserted successfully"}, status=status.HTTP_200_OK)

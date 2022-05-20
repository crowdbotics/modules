from .models import FormAnswers, FormDefinition
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
            payloadFormAnswers["token"] = formResponse["token"]
            payloadFormAnswers["submitted_at"] = formResponse["submitted_at"]
            payloadFormAnswers["form_definition_id"] = fields["field"]["id"]
            payloadFormAnswers["type"] = fields["type"]

            if fields["type"] == "choice":
                payloadFormAnswers["answer"] = fields["choice"]["label"]
            elif fields["type"] == "text":
                payloadFormAnswers["answer"] = fields["text"]
            elif fields["type"] == "phone_number":
                payloadFormAnswers["answer"] = fields["phone_number"]
            elif fields["type"] == "email":
                payloadFormAnswers["answer"] = fields["email"]
            elif fields["type"] == "url":
                payloadFormAnswers["answer"] = fields["url"]
            else:
                payloadFormAnswers["answer"] = str(fields["boolean"])

            formAnswersSerializer = FormAnswersSerializer(data=payloadFormAnswers)
            if formAnswersSerializer.is_valid():
                formAnswersSerializer.save()
            else:
                return Response(formAnswersSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "data inserted successfully"}, status=status.HTTP_200_OK)
    

class FormDefinitionDetailView(APIView):

    def get(self, request, form_id=None, *args, **kwargs):
        formDefinitions = FormDefinition.objects.filter(form_id=form_id)
        response = []

        for dIdx, definition in enumerate(formDefinitions):
            formDefinitionSerializer = FormDefinitionSerializer(definition)
            response.append(formDefinitionSerializer.data)
            formAnswers = FormAnswers.objects.filter(form_definition_id=formDefinitionSerializer.data["definition_id"])
            response[dIdx]["form_answers"] = []

            for aIdx, answer in enumerate(formAnswers):
                formAnswersSerializer = FormAnswersSerializer(answer)
                response[dIdx]["form_answers"].append(formAnswersSerializer.data)

        return Response(response, status=status.HTTP_200_OK)


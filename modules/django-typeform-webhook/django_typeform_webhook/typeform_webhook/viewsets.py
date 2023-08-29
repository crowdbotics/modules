from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FormDefinition
from .options import type_to_answer_key
from .serializers import FormAnswersSerializer, FormDefinitionSerializer


class FormDefinitionView(APIView):
    def post(self, request, *args, **kwargs):
        """
        This function  uploads each typeform data that is created by the user.
        :param request: This param contains each form response submitted by the user
        """
        try:
            form_response = self.request.data["form_response"]
            form = FormDefinition.objects.filter(form_id=form_response["form_id"]).exists()

            if not form:
                definition_data = []
                for fields in form_response["definition"]["fields"]:
                    form_definition = {
                        "form_id": form_response["form_id"],
                        "definition_id": fields["id"],
                        "type": fields["type"],
                        "title": fields["title"]
                    }

                    if fields["type"] in ["multiple_choice", "picture_choice"]:
                        form_definition["choices"] = fields["choices"]
                    definition_data.append(form_definition)

                serializer = FormDefinitionSerializer(data=definition_data, many=True)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            answers_data = [
                {
                    "token": form_response["token"],
                    "submitted_at": form_response["submitted_at"],
                    "form_definition_id": field["field"]["id"],
                    "type": field["type"],
                    "answer": str(field.get(type_to_answer_key.get(field["type"]), field.get("boolean"))),
                }
                for field in form_response["answers"]
            ]

            serializer = FormAnswersSerializer(data=answers_data, many=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Data saved successfully."}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class FormDefinitionDetailView(APIView):

    def get(self, request, form_id, *args, **kwargs):
        """
        This function  takes the id for each typeform data that is created by the user.
        Returns the response saved against that id.
        :param form_id: The id of the typeform whose response is to be returned.
        """
        form_definitions = FormDefinition.objects.filter(form_id=form_id)
        serializer = FormDefinitionSerializer(form_definitions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

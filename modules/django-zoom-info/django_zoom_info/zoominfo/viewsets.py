import requests

from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import Person, Company, Education, SocialMedia


def get_required_data(enrich_data):
    person_data = {
        "firstName": enrich_data["firstName"],
        "middleName": enrich_data["middleName"],
        "lastName": enrich_data["lastName"],
        "email": enrich_data["email"],
        "phone": enrich_data["phone"],
        "jobTitle": enrich_data["jobTitle"],
    }
    social_media_data = enrich_data["externalUrls"]
    company_data = {}
    education_data = []

    for key, value in enrich_data["company"].items():
        company_data.update({key: value})

    for data in enrich_data["education"]:
        for key, value in data.items():
            if value:
                if isinstance(value, str):
                    education_data.append({key: value})
                else:
                    for k, val in value.items():
                        education_data[-1].update({k: val})

    return person_data, company_data, education_data, social_media_data


class ZoomInfoAPIView(APIView):
    def get_payload(self):
        return {}

    def get_url(self):
        return ""

    def get_header(self):
        return {}

    def post(self, request, *args, **kwargs):
        try:
            response = requests.post(
                url=self.get_url(), json=self.get_payload(), headers=self.get_header()
            )
            response.raise_for_status()
            return Response(data=response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


class AuthTokenViewSet(ZoomInfoAPIView):
    def get_url(self):
        return f"{settings.ZOOM_INFO_BASE_URL}/authenticate/"

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {"Content-Type": "application/json"}


class SearchViewSet(ZoomInfoAPIView):
    def get_url(self):
        return f"{settings.ZOOM_INFO_BASE_URL}/search/{self.request.query_params.get('data_type')}"

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {
            "Content-Type": "application/json",
            "Authorization": f'Bearer {self.request.META.get("HTTP_AUTHORIZATION")}',
        }


class BulkViewSet(ZoomInfoAPIView):
    def get_url(self):
        return (
            f"{settings.ZOOM_INFO_BASE_URL}/bulk/"
            f"{self.request.query_params.get('endpoint')}/"
            f"{self.request.query_params.get('data_type')}"
        )

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {
            "Content-Type": "application/json",
            "Authorization": f'Bearer {self.request.META.get("HTTP_AUTHORIZATION")}',
        }


class EnrichViewSet(APIView):
    def post(self, request, *args, **kwargs):
        try:
            url = f"{settings.ZOOM_INFO_BASE_URL}/enrich/{self.request.query_params.get('data_type')}"
            header = {
                "Content-Type": "application/json",
                "Authorization": f'Bearer {request.META.get("HTTP_AUTHORIZATION")}',
            }
            response = requests.post(data=request.data, url=url, headers=header)

            (
                person_data,
                company_data,
                education_data,
                social_media_data,
            ) = get_required_data(enrich_data=response.data)

            company = Company.objects.create(**company_data)
            person = Person.objects.create(
                firstName=person_data["firstName"],
                middleName=person_data["middleName"],
                lastName=person_data["lastName"],
                email=person_data["email"],
                phone=person_data["phone"],
                jobtitle=person_data["jobTitle"],
                company=company,
            )
            for data in education_data:
                Education.objects.create(
                    person=person,
                    school=data["school"],
                    educationDegree=data["degree"],
                    areaOfStudy=data["areaOfStudy"],
                )

            for data in social_media_data:
                SocialMedia.objects.create(
                    person=person, type=data["type"], url=data["url"]
                )
            return Response(
                data={"success": "data created"}, status=status.HTTP_201_CREATED
            )
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)

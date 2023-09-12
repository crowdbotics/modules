from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Report, Choices

User = get_user_model()


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'
        extra_kwargs = {'reported_by': {'default': serializers.CurrentUserDefault()}}

    def validate(self, data):
        """
        Validate the user for avoiding duplicated reports.
        """
        if Report.objects.filter(reported_by=data['reported_by'], model_name=data['model_name'],
                                 reported_id=data['reported_id']).exists():
            raise serializers.ValidationError("Already reported")

        return data

    def create(self, validated_data):
        """
        Create report by selection reason's choices if the choice is "Other",
        then the users are able to write their own custom reason.
        """
        content_data = None
        if validated_data['reason'] == Choices.OTHER:
            content_data = validated_data['other']
        validated_data['other'] = content_data

        report = Report(
            **validated_data
        )
        report.save()
        return report

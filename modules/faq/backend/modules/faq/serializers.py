from rest_framework.serializers import ModelSerializer
from .models import Faq
from django.db.models import Max


class FaqSerializer(ModelSerializer):
    class Meta:
        model = Faq
        fields = (
            "id",
            "question",
            "answer",
            "is_active",
            "sequence",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        """
        This procedure creates the FAQ with the following cases:-
            a) If Sequence is not provided, then Maximum sequence present in db will
               be taken and 1 will be added to it.
            b) If sequence is provided , default creation takes place
        """

        if "sequence" in validated_data.keys():
            return super(FaqSerializer, self).create(validated_data)
        max_seq = Faq.objects.aggregate(Max("sequence"))["sequence__max"]
        if max_seq:
            validated_data["sequence"] = max_seq + 1
        return super(FaqSerializer, self).create(validated_data)

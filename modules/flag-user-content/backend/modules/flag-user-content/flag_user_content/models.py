from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

User = get_user_model()


class Choices(models.Model):
    UNSOLICITED = 1
    EXPLICIT = 2
    MALICIOUS = 3
    VIOLENT_CONTENT = 4
    CHILD = 5
    CRIMINAL = 6
    MISLEADING = 7
    COPYRIGHT = 8
    DESTRUCTIVE = 9
    OTHER = 10

    REPORT_CHOICES = (
        (UNSOLICITED, 'Unsolicited commercial content'),
        (EXPLICIT, 'Explicit adult material'),
        (MALICIOUS, 'Malicious and abusive behavior'),
        (VIOLENT_CONTENT, 'Violent, graphic, and harmful material'),
        (CHILD, 'Child exploitation imagery'),
        (CRIMINAL, 'Criminal actions (e.g. drug-related activities)t'),
        (MISLEADING, 'Misleading information'),
        (COPYRIGHT, 'Violation of copyright and trademark rights'),
        (DESTRUCTIVE, 'Self-destructive actions'),
        (OTHER, 'Others')
    )

    class Meta:
        abstract = True


class Report(models.Model):
    model_name = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='reported_to_content')
    reported_id = models.PositiveIntegerField()
    model_object = GenericForeignKey('model_name', 'reported_id')
    reported_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="reported_by_user")
    reason = models.PositiveSmallIntegerField(choices=Choices.REPORT_CHOICES, default=Choices.OTHER)
    other = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        verbose_name = 'Report Content'

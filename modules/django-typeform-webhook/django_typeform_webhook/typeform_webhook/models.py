from datetime import datetime

import jsonfield
from django.db import models



class FormDefinition(models.Model):
    form_id = models.CharField(max_length=20)
    definition_id = models.CharField(max_length=20, unique=True)
    type = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    choices = jsonfield.JSONField()

    def __str__(self):
        return self.title


class FormAnswers(models.Model):
    form_definition_id = models.ForeignKey(
        FormDefinition,
        to_field="definition_id",
        db_column="definition_id",
        on_delete=models.CASCADE,
    )
    token = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    answer = models.CharField(max_length=200)
    submitted_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.answer

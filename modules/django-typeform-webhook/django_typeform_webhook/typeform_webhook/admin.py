from django.contrib import admin
from .models import FormDefinition, FormAnswers

# Register your models here.
admin.site.register(FormDefinition)
admin.site.register(FormAnswers)

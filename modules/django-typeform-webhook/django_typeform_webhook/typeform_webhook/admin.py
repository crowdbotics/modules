from django.contrib import admin
from .models import FormDefinition, FormAnswers


class FormDefinitionAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'form_id', 'definition_id', 'type']


class FormAnswersAdmin(admin.ModelAdmin):
    list_display = ['id', 'form_definition_id', 'token', 'type', 'answer']


admin.site.register(FormDefinition, FormDefinitionAdmin)
admin.site.register(FormAnswers, FormAnswersAdmin)

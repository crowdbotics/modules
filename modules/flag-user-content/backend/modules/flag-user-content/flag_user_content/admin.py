from django.contrib import admin

from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ("model_name", "reported_id", "reported_by", "reason", "other", "created_at")

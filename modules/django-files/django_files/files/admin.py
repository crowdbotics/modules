from django.contrib import admin

from .models import FileUpload


class FileUploadAdmin(admin.ModelAdmin):
    list_display = ["user", "title", "created_at", "updated_at", "size"]
    list_select_related = [
        "user",
    ]
    list_filter = [
        "user",
        "created_at",
    ]
    search_fields = ["user", "title"]


admin.site.register(FileUpload, FileUploadAdmin)

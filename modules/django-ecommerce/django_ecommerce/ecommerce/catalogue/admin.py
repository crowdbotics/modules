from django.contrib import admin
from .models import ProductOptionGroup, ProductOption
from oscar.apps.catalogue.admin import *  # noqa


class ProductOptionInline(admin.TabularInline):
    model = ProductOption
    extra = 0


class ProductOptionGroupAdmin(admin.ModelAdmin):
    list_display = ('title', 'min', 'max', 'product', 'placement_order')
    list_filter = ('product',)
    inlines = [ProductOptionInline]


admin.site.register(ProductOptionGroup, ProductOptionGroupAdmin)
admin.site.register(ProductOption)

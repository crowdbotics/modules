from django import forms
from oscar.core.loading import get_classes, get_model

Product = get_model('catalogue', 'Product')
Option = get_model('catalogue', 'Option')
ProductOptionGroup = get_model('catalogue', 'ProductOptionGroup')
ProductOption = get_model('catalogue', 'ProductOption')


class ProductOptionForm(forms.ModelForm):
    class Meta:
        model = ProductOption
        fields = ('product_option_group', 'option', 'price')


class ProductOptionGroupForm(forms.ModelForm):
    class Meta:
        model = ProductOptionGroup
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

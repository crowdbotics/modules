from oscar.apps.dashboard.catalogue.formsets import *

from oscar.core.loading import get_classes, get_model
from .forms import ProductOptionForm, ProductOptionGroupForm

Product = get_model('catalogue', 'Product')
ProductOptionGroup = get_model('catalogue', 'ProductOptionGroup')
ProductOption = get_model('catalogue', 'ProductOption')

BaseProductOptionGroupFormSet = inlineformset_factory(
    Product, ProductOptionGroup, ProductOptionGroupForm, extra=1
)


class ProductOptionGroupFormSet(BaseProductOptionGroupFormSet):
    def __init__(self, product_class, user, *args, **kwargs):
        super().__init__(*args, **kwargs)


BaseProductOptionFormSet = inlineformset_factory(
    ProductOptionGroup, ProductOption, ProductOptionForm, extra=1
)


class ProductOptionFormSet(BaseProductOptionFormSet):

    def __init__(self, product_class, user, *args, **kwargs):
        super().__init__(*args, **kwargs)

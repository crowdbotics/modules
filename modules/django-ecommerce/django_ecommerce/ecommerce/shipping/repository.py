from oscar.apps.shipping import repository
from . import methods as shipping_methods


class Repository(repository.Repository):
    methods = (shipping_methods.Standard(),)

    def get_available_shipping_methods(self, basket, user=None, shipping_addr=None, request=None, **kwargs):
        methods = (shipping_methods.Standard(),)
        return methods

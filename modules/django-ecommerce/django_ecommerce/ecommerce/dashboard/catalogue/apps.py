import oscar.apps.dashboard.catalogue.apps as apps
from django.urls import path
from oscar.core.loading import get_class


class CatalogueDashboardConfig(apps.CatalogueDashboardConfig):
    name = 'modules.django_ecommerce.ecommerce.dashboard.catalogue'

    permissions_map = _map = {
        'product_options': (['is_staff'], ['partner.dashboard_access']),
    }

    def ready(self):
        super().ready()
        # Custom views
        self.product_options = get_class('dashboard.catalogue.views', 'ProductOptionsView')

    def get_urls(self):
        urls = super().get_urls()
        urls += [
            # Custom URLs
            path('product-options/<int:option_id>/', self.product_options.as_view(), name='product_options'),
        ]
        return self.post_process_urls(urls)

import oscar.apps.dashboard.apps as apps


class DashboardConfig(apps.DashboardConfig):
    name = 'modules.django_ecommerce.ecommerce.dashboard'

    def ready(self):
        super().ready()
        # Custom views
        # self.extra_view = MyExtraView

    def get_urls(self):
        urls = super().get_urls()
        urls += [
            # Custom URLs
            # path('extra/', self.extra_view.as_view(), name='extra'),
        ]
        return self.post_process_urls(urls)
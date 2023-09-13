import oscar.apps.dashboard.reports.apps as apps


class ReportsDashboardConfig(apps.ReportsDashboardConfig):
    name = 'modules.django_ecommerce.ecommerce.dashboard.reports'

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
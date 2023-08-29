from django.contrib import admin
from .models import Person, Education, Company, SocialMedia

admin.site.register(Person)
admin.site.register(Education)
admin.site.register(Company)
admin.site.register(SocialMedia)

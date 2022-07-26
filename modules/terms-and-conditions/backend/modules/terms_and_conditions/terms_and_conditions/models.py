from django.db import models
from django.conf import settings

# Create your models here.

class TermAndCondition(models.Model):

	body = models.TextField()
	author = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.PROTECT,
		)
	is_active = models.BooleanField(
		default=True
		)
	created_at = models.DateTimeField(
		auto_now_add=True,
		)
	updated_at = models.DateTimeField(
		auto_now=True,
		)

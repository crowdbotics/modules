from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


from oscar.apps.address.abstract_models import AbstractPartnerAddress
from oscar.apps.partner.abstract_models import AbstractPartner, AbstractStockRecord


class Partner(AbstractPartner):
    """
    A partner is a company or organisation that sells products to customers.
    """
    logo = models.ImageField(upload_to='partner/logo/', null=True, blank=True)
    cover = models.ImageField(upload_to='partner/cover/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    yelp = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def is_open(self):
        # TODO: Implement this
        # check OpeningPeriod model for time if partner is open
        return True


class PartnerAddress(AbstractPartnerAddress):
    """
    A physical address for a partner
    """
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)


class StockRecord(AbstractStockRecord):
    """
    A stock record represents a StockItem at a particular partner with an id/SKU as identifier
    """
    pass


class OpeningPeriod(models.Model):
    PERIOD_FORMAT = _("%(start)s - %(end)s")
    (MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
     FRIDAY, SATURDAY, SUNDAY, PUBLIC_HOLIDAYS) = range(1, 9)
    WEEK_DAYS = {
        MONDAY: _("Monday"),
        TUESDAY: _("Tuesday"),
        WEDNESDAY: _("Wednesday"),
        THURSDAY: _("Thursday"),
        FRIDAY: _("Friday"),
        SATURDAY: _("Saturday"),
        SUNDAY: _("Sunday"),
        PUBLIC_HOLIDAYS: _("Public Holidays")
    }
    partner = models.ForeignKey('Partner', models.CASCADE, verbose_name=_("Partner"), related_name='opening_periods')

    weekday_choices = [(k, v) for k, v in WEEK_DAYS.items()]
    weekday = models.PositiveIntegerField(
        _("Weekday"),
        choices=weekday_choices)
    start = models.TimeField(
        _("Start"),
        null=True,
        blank=True,
        help_text=_("Leaving start and end time empty is displayed as 'Closed'"))
    end = models.TimeField(
        _("End"),
        null=True,
        blank=True,
        help_text=_("Leaving start and end time empty is displayed as 'Closed'"))

    def __str__(self):
        return "%s: %s to %s" % (self.weekday, self.start, self.end)

    class Meta:
        ordering = ['weekday']
        verbose_name = _("Opening period")
        verbose_name_plural = _("Opening periods")

    def clean(self):
        if self.start and self.end and self.end <= self.start:
            raise ValidationError(_("Start must be before end"))

from oscar.apps.partner.models import *  # noqa isort:skip

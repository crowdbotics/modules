from django.db import models
from django.utils.translation import ugettext_lazy as _
from oscar.apps.catalogue.abstract_models import AbstractProduct, AbstractProductClass, AbstractOption


class ProductClass(AbstractProductClass):
    image = models.ImageField(upload_to='product_class', null=True, blank=True)


class Product(AbstractProduct):
    is_published = models.BooleanField(_("Published"), default=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Used to save a per product query for price. This can only be used for cases where there's only one
        # fulfilment partner. For cases with multiple fulfilment partners, ignore this variable and everything
        # will work as expected
        self.pricing_partner = None
        # This variable will hold first active stockrecord of the product.
        self.active_stockrecord = None
        # self._option_price_map = {}

    @property
    def price_currency(self):
        stockrecord = self.get_active_stockrecord()
        if stockrecord:
            return stockrecord.price_currency
        if self.is_parent:
            return self.children.filter(is_published=True).first().stockrecords.all().first().price_currency
        return None

    # @property
    # def option_price_map(self):
    #     if not self._option_price_map:
    #         self._option_price_map = {item.option_id: item for item in self.product_option_prices.all()}
    #     return self._option_price_map

    def get_active_stockrecord(self):
        if self.active_stockrecord is None:
            if self.pricing_partner:
                self.active_stockrecord = self.stockrecords.select_related('partner').filter(
                    partner=self.pricing_partner).first()
            else:
                self.active_stockrecord = self.stockrecords.select_related('partner').all().first()
        return self.active_stockrecord

    def _get_options_dict(self, item, line, ref=None):
        is_selected = False
        if line:
            line_attr = line.attributes.filter(group=None)
            if not line_attr:
                is_selected = line.is_selected_option_with_group(item.option.id, item.product_option_group_id)
            else:
                is_selected = line.is_selected_option(item.option.id)
        try:
            # option_price = item.option.prices.get(product_id=ref) if ref else self.option_price_map[item.option.id]

            return {
                "id": item.option.id,
                "ref_item": ref.id if ref else self.pk,
                "name": item.option.name,
                "code": item.option.code,
                "price_currency": self.price_currency,
                "price": item.price,
                "selected": is_selected if line else False
            }
        except Exception as e:
            return None

    def _has_multiple_prices(self, group_items):
        if self.is_standalone:
            return False

        for item in group_items:
            if not item.same_price:
                return True
        return False

    def _create_option_team_with_multiple_prices(self, group_items, line):
        option_list = []
        for child in self.children.filter(is_published=True):  # price will differ variant-wise
            option_team = []
            for item in group_items:
                if item.same_price:
                    option_team.append(self._get_options_dict(item, line))
                else:  # this item has multiple prices
                    option_team.append(self._get_options_dict(item, line, child))
            option_list.append(option_team)
        return option_list

    def _create_option_team_with_single_price(self, group_items, line):
        option_team = []
        for item in group_items:
            option_team.append(self._get_options_dict(item, line))
        return option_team

    def _get_options_list(self, group, line):
        group_items = group.options.all()

        if self._has_multiple_prices(group_items):  # checking if any of the option has multiple prices
            option_list = self._create_option_team_with_multiple_prices(group_items, line)
        else:  # none of the option has multiple prices
            option_list = self._create_option_team_with_single_price(group_items, line)

        return option_list

    def as_detailed_dict(self, line=None):
        product = {
            'id': self.pk,
            'title': self.title,
            'description': self.description,
            # 'quantity': line.quantity if line else 1,
            'product_groups': [
                {
                    "id": group.id,
                    "title": group.title,
                    "min": group.min,
                    "max": group.max,
                    "placement_order": group.placement_order,
                    "options": self._get_options_list(group, line)
                } for group in self.product_option_groups.all().order_by('placement_order')
            ],
            'variants': [
                {"title": child.title,
                 "child_id": child.id,
                 "price_currency": self.price_currency,
                 "price": child.price_excl_tax,
                 "selected": line.is_selected_variant(child.id) if line else False
                 } for child in self.children.filter()],
            'line_id': line.id if line else None,
            'instructions': line.instructions if line else "",
            'publish': self.is_published
        }
        return product


class ProductOptionGroup(models.Model):
    title = models.CharField(max_length=255)
    min = models.IntegerField(blank=True, null=True)
    max = models.IntegerField(blank=True, null=True)
    product = models.ForeignKey('Product', related_name='product_option_groups', on_delete=models.CASCADE)
    placement_order = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "%s - %s"%(self.pk, self.title)

    def to_dict(self):
        return dict(id=self.pk, title=self.title, min=self.min, max=self.max)


class Option(AbstractOption):

    def get_product_option_group(self, product):
        return self.option_groups.filter(product_option_group__product=product).first()


class ProductOption(models.Model):
    product_option_group = models.ForeignKey('ProductOptionGroup', related_name='options', on_delete=models.CASCADE)
    option = models.ForeignKey('catalogue.Option', related_name='option_groups', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)


    def __str__(self):
        return self.option.name

from oscar.apps.catalogue.models import *  # noqa isort:skip

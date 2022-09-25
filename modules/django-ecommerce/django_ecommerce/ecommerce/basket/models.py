from django.db import models
from django.utils.translation import ugettext_lazy as _
from oscar.apps.basket.abstract_models import AbstractBasket, AbstractLine, AbstractLineAttribute

from oscar.core.loading import get_model
from oscar.core.utils import round_half_up

from ..catalogue.models import ProductOption

StockRecord = get_model('partner', 'StockRecord')


class Line(AbstractLine):
    pass

    def is_selected_option_with_group(self, option_id, group_id):
        """
        Is selected option valid.

        Parameters
        ----------
        option_id: int
        group_id: int

        Returns
        -------
        bool
        """

        if self.attributes:
            attributes = self.attributes.filter(option_id=option_id, group_id=group_id)
            return attributes.count() > 0
        return False

    def is_selected_option(self, option_id):
        """
        Is option selected.

        Parameters
        ----------
        option_id: int

        Returns
        -------
        bool
        """

        if self.attributes:
            attributes = self.attributes.filter(option_id=option_id)
            return attributes.count() > 0
        return False

    def is_selected_variant(self, variant_id):
        """
        is selected is a variant.

        Parameters
        ----------
        variant_id: int

        Returns
        -------
        bool
        """

        if self.product_id:
            return self.product_id == variant_id
        return False

    @property
    def unit_price_excl_tax(self):
        unit_price = self.purchase_info.price.excl_tax
        if hasattr(self, 'attributes'):
            for i in self.attributes.all():
                unit_price += i.price if i.price else 0
        return unit_price

    @property
    def unit_price_incl_tax(self):
        unit_price = self.purchase_info.price.incl_tax
        if hasattr(self, 'attributes'):
            for i in self.attributes.all():
                unit_price += i.price if i.price else 0
        return unit_price

    @property
    def purchase_info(self):
        """
        Return the stock/price info
        """
        if not hasattr(self, '_info'):
            # Cache the PurchaseInfo instance.
            self._info = self.basket.strategy.fetch_for_line(
                self, self.stockrecord)
        return self._info


class Basket(AbstractBasket):

    def add_product(self, partner, product, quantity=1, options=None):
        """
        Add a product to the basket

        The 'options' list should contains dicts with keys 'option' and 'value'
        which link the relevant product.Option model and string value
        respectively.

        Returns (line, created).
          line: the matching basket line
          created: whether the line was created or updated

        """
        if options is None:
            options = []
        if not self.id:
            self.save()

        # Ensure that all lines are the same currency
        price_currency = self.currency
        stock_info = self.get_stock_info(product, options)

        if not stock_info.price.exists:
            raise ValueError(
                "Strategy hasn't found a price for product %s" % product)

        if price_currency and stock_info.price.currency != price_currency:
            raise ValueError((
                                 "Basket lines must all have the same currency. Proposed "
                                 "line has currency %s, while basket has currency %s")
                             % (stock_info.price.currency, price_currency))

        if stock_info.stockrecord is None:
            raise ValueError((
                                 "Basket lines must all have stock records. Strategy hasn't "
                                 "found any stock record for product %s") % product)

        # Line reference is used to distinguish between variations of the same
        # product (eg T-shirts with different personalisations)
        line_ref = self._create_line_reference(
            product, stock_info.stockrecord, options)

        # Determine price to store (if one exists).  It is only stored for
        # audit and sometimes caching.
        defaults = {
            'quantity': quantity,
            'price_excl_tax': stock_info.price.excl_tax,
            'price_currency': stock_info.price.currency,
        }
        if stock_info.price.is_tax_known:
            defaults['price_incl_tax'] = stock_info.price.incl_tax

        line, created = self.lines.get_or_create(
            line_reference=line_ref,
            product=product,
            stockrecord=stock_info.stockrecord,
            defaults=defaults)
        if created:
            self._associate_options_to_line(line, options, product)
        else:
            # Update quantity
            line.quantity = max(0, line.quantity + quantity)
            line.save()
            # Update quantity/price for options
            get_options_price_to_adjust = self.get_options_price_to_adjust(line, options, product)
            self._update_price_values(product, line, get_options_price_to_adjust)
        self.reset_offer_applications()

        # Returning the line is useful when overriding this method.
        return line, created

    def _associate_options_to_line(self, line, options, product):
        """
        Associates line option.

        Parameters
        ----------
        line: apps.basket.models.Line
        options: list
        product: apps.catalogue.models.Product
        """

        options_price = 0
        for option in options:
            op = ProductOption.objects.filter(product_option_group__product=product, option=option.get('option'))
            if op.exists():
                op = op.first()
            price = op.price if op else 0
            if option['value']:
                attr = line.attributes.create(option=option['option'],
                                              value=option['option'].name,
                                              price=price,
                                              group_id=op.product_option_group_id)
                options_price += price
        self._update_price_values(product, line, options_price)

    def get_options_price_to_adjust(self, line, options, product):
        options_price = 0
        for option in options:
            op = ProductOption.objects.filter(product_option_group__product=product, option=option.get('option'))
            if op.exists():
                op = op.first()
            price = op.price if op else 0
            if option['value']:
                options_price += price
        return options_price

    def _update_price_values(self, product, line, options_price):
        """
        Updates line prices.gi

        Parameters
        ----------
        product: apps.catalogue.models.Product
        line: apps.basket.models.Line
        options_price: float
        """

        line.price_excl_tax += options_price
        line.price_incl_tax = line.price_excl_tax
        line.save()

    def get_stock_info(self, product, options):
        """
        Hook for implementing strategies that depend on product options
        """
        # The built-in strategies don't use options, so initially disregard
        # them.
        # stock = StockRecord.objects.filter(partner=partner, product=product).first()
        # return self.strategy.fetch_for_product(product, stock)
        return self.strategy.fetch_for_product(product)

    def re_calculate_price(self):
        """
        Recalculate basket price.
        """
        for line in self.lines.all():
            line.total = line.price_incl_tax * line.quantity
            line.save()
        self.recalculate_price()

class LineAttribute(AbstractLineAttribute):
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    group = models.ForeignKey(
        'catalogue.ProductOptionGroup', related_name='option_group', null=True, default=None, blank=True,
        on_delete=models.CASCADE
    )


    def to_dict(self):
        """
        Converts line attribute to dict.

        Returns
        -------
        dict
        """
        option = {
            'id': self.id,
            'title': self.option.name,
            'price': str(self.price),
            'group_id': self.group_id
        }
        return option


from oscar.apps.basket.models import *  # noqa isort:skip

from oscar.apps.shipping import methods
from oscar.core import prices
from decimal import Decimal as D


class Standard(methods.Base):
    code = 'standard'
    name = 'Standard shipping (free)'

    def calculate(self, basket):
        return prices.Price(
            currency=basket.currency,
            excl_tax=D('1.00'), incl_tax=D('1.00'))

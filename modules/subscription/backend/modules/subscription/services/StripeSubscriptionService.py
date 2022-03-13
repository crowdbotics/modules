import stripe


class StripeSubscriptionService:

    @classmethod
    def get_products(self):
        products = stripe.Product.list(limit=100, active=True)
        return products

    @classmethod
    def get_product_prices(cls, p_id):
        return stripe.Price.list(product=p_id)

    @classmethod
    def get_price_details(self, p_id):
        return stripe.Price.retrieve(p_id)

    @classmethod
    def get_product_details(cls, p_id):
        product_details = stripe.Product.retrieve(p_id)
        product_details.prices = cls.get_product_prices(p_id)
        return product_details

    @classmethod
    def get_products_with_detail(cls):
        products = cls.get_products()
        for p in products:
            p.prices = cls.get_product_prices(p.id)
        return products

    @classmethod
    def get_portal_session(cls, cust_id):
        session = stripe.billing_portal.Session.create(
            customer=cust_id,
            return_url='https://example.com/account',
        )
        return session


    @classmethod
    def create_invoice_intent_sheet(cls, cust_id, price_id, behavior='default_incomplete'):
        subscription = stripe.Subscription.create(
            customer=cust_id,
            items=[{
                'price': price_id,
            }],
            payment_behavior=behavior,
            expand=['latest_invoice.payment_intent'],
        )
        ephemeralKey = stripe.EphemeralKey.create(
            customer=cust_id,
            stripe_version='2020-08-27',
        )
        return {
            "paymentIntent": subscription.latest_invoice.payment_intent.client_secret,
            "ephemeralKey": ephemeralKey.secret,
            "customer": cust_id
        }
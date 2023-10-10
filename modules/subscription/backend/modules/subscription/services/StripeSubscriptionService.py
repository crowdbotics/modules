import json
import stripe
import environ

from modules.payments.models import StripeUserProfile
env = environ.Env()


class StripeSubStatus:
    ACTIVE = 'active'
    PAST_DUE = 'past_due'
    UNPAID = 'unpaid'
    CANCELED = 'canceled'
    INCOMPLETE = 'incomplete'
    INCOMPLETE_EXPIRED = 'incomplete_expired'
    TRAILING = 'trialing'
    ALL = 'all'
    ENDED = 'ended'


class StripeSubscriptionService:
    stripe.api_key = env.str("STRIPE_SECRET_KEY")
    WEBHOOK_SECRET = env.str("STRIPE_WEBHOOK_SECRET")
    LOG_EVENT_TYPES = [
        "payment_intent.created", "customer.subscription.created",
        "invoice.paid", "invoice.payment_succeeded",
        "customer.subscription.updated"
    ]


    @classmethod
    def get_products(self):
        products = stripe.Product.list(limit=100, active=True)
        """
            get_products returns an object with a data property that contains an array of up to limit products. Each entry in the array is a separate product object. If no more products are available, the resulting array will be empty.

            :param limit: A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
            :param active: Only return products that are active or inactive (e.g., pass false to list all inactive products
        """
        return products

    @classmethod
    def get_product_prices(cls, p_id):
        """
            get_product_prices returns an object with a data property that contains an array of up to limit prices. If no more prices are available, the resulting array will be empty.

            :param p_id: ID of the product whose prices are needed.
        """
        return stripe.Price.list(product=p_id)

    @classmethod
    def get_price_details(self, p_id):
        """
        get_price_details returns a price if a valid price or plan ID was provided. Throws an error otherwise.

        :param p_id: Price or plan ID whose detail is to be retrieved.
        """
        return stripe.Price.retrieve(p_id)

    @classmethod
    def get_product_details(cls, p_id):
        """
        get_product_details Retrieves the details of an existing product. Supply the unique product ID from either a product creation request or the product list, and Stripe will return the corresponding product information.

        :param p_id:  Unique product ID whose detail is to be returned. 
        """
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
        """
        get_portal_session returns a portal session object.
        
        :param cust_id: The ID of an existing customer.
        """
        session = stripe.billing_portal.Session.create(
            customer=cust_id,
            return_url='https://example.com/account',
        )
        return session

    @classmethod
    def already_has_a_plan(cls, user):
        has_user_sub = hasattr(user, 'user_subscription')
        return user.user_subscription if has_user_sub else None

    @classmethod
    def create_subscription(cls, cust_id, price_id):
        """
        create_subscription creates a new subscription on an existing customer. Each customer can have up to 500 active or scheduled subscriptions.
        
        :param cust_id: The identifier of the customer to subscribe.
        :param price_id: The ID of the price object.
        """
        return cls.create_invoice_intent_sheet(cust_id, price_id, behavior='default_incomplete')

    @classmethod
    def update_subscription(cls, sub_id, price_id):
        """
        update_subscription updates an existing subscription to match the specified parameters. Returns the newly updated Subscription object.

        :param sub_id: ID of the subscription item to update.
        :param price_id: The ID of the price object.
        """
        try:
            subscription = stripe.Subscription.retrieve(sub_id)

            updatedSubscription = stripe.Subscription.modify(
                sub_id,
                cancel_at_period_end=False,
                items=[{
                    'id': subscription['items']['data'][0].id,
                    'price': price_id,
                }]
            )
            return updatedSubscription
        except Exception as e:
            return False

    @classmethod
    def cancel_subscription(cls, sub_id):
        """
        cancel_subscription cancels a customer’s subscription immediately. Returns the canceled Subscription object. Its subscription status will be set to canceled.

        :param sub_id: ID of the subscription item to update
        """
        try:
            # Cancel the subscription by deleting it
            deletedSubscription = stripe.Subscription.delete(sub_id)
            return deletedSubscription
        except Exception as e:
            pass
        return None

    @classmethod
    def create_invoice_intent_sheet(cls, cust_id, price_id, behavior='default_incomplete'):
        """
        create_invoice_intent_sheet creates a new incomplete status subscription and respective intent to capture payment. If there already exist an incomplete intent against this user and price fetch the payment intent of that.

        :param cust_id: The ID of an existing customer.
        :param price_id: The ID of the price object.
        """
        subscriptions = stripe.Subscription.list(customer=cust_id, status=StripeSubStatus.INCOMPLETE, price=price_id)
        subscriptions = subscriptions.get('data')
        if not subscriptions:
            # Create new incomplete status subscription and respective intent to capture payment.
            subscription = stripe.Subscription.create(
                customer=cust_id,
                items=[{
                    'price': price_id,
                }],
                payment_behavior=behavior,
                expand=['latest_invoice.payment_intent'],
            )
            client_secret = subscription.latest_invoice.payment_intent.client_secret
        else:
            # If there already exist an incomplete intent against this user and price fetch the payment intent of that.
            subscription = subscriptions[0]
            invoice = stripe.Invoice.retrieve(subscription.latest_invoice)
            payment_intent = stripe.PaymentIntent.retrieve(invoice.payment_intent)
            client_secret = payment_intent.client_secret

        ephemeralKey = stripe.EphemeralKey.create(
            customer=cust_id,
            stripe_version='2020-08-27',
        )
        return {
            "paymentIntent": client_secret,
            "ephemeralKey": ephemeralKey.secret,
            "customer": cust_id
        }

    @classmethod
    def validate_webhook_payload(cls, payload):
        """
        Validates a event occurred in the app is by the stripe.
        
        :param payload: Event object occurred in app.
        """
        try:
            payload = json.loads(payload)
            if "id" not in payload:
                raise ValueError("id not in payload, payload incorrect")
        except Exception as e:
            raise e
        return payload

    @classmethod
    def get_event_from_webhook(cls, payload, sig_header):
        payload = cls.validate_webhook_payload(payload)
        try:
            event = stripe.Event.construct_from(
                payload, sig_header, cls.WEBHOOK_SECRET
            )
            cls.log_stripe_event(event)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return False
        return event

    @classmethod
    def handle_webhook_events(cls, event):
        """
        handle_webhook_events Handles EVENTS created by the stripe.
        :param event: Object containing event details
        """
        # Handle the event
        if event.type == 'invoice.payment_succeeded':
            payment_intent = event.data.object  # contains a stripe.PaymentIntent
            cls.customer_subscribed(payment_intent)
            if payment_intent.billing_reason == 'subscription_create':
                subscription_id = payment_intent.subscription
                payment_intent_id = payment_intent.payment_intent

                # Retrieve the payment intent used to pay the subscription
                pi = stripe.PaymentIntent.retrieve(payment_intent_id)

                # Set the default payment method
                stripe.Subscription.modify(
                subscription_id,
                default_payment_method=pi.payment_method
                )
        elif event.type == 'customer.subscription.updated':
            sub = event.data.object  # contains a stripe.Subscription
            if sub.status == 'past_due':
                cls.end_subscription(sub)
            elif sub.status == 'active':
                cls.modify_subscription(sub)
        # ... handle other event types
        elif event.type == 'invoice.payment.failed':
            pass
        elif event.type == 'invoice.payment_succeeded':
            pass
        else:
            print('Unhandled event type {}'.format(event.type))

    @classmethod
    def end_subscription(cls, sub):
        # You can use an email or a mobile push notification to customer to let him know to pay
        from modules.subscription.models import UserSubscription
        customer = sub.customer
        sub, created = UserSubscription.objects.get_or_create(user=StripeUserProfile.objects.get(stripe_cus_id=customer).user)
        sub.is_active = False
        sub.save()

    @classmethod
    def modify_subscription(cls, sub):
        # You can use an email or a mobile push notification to customer to let him know to pay
        from modules.subscription.models import UserSubscription, SubscriptionPlan
        customer = sub.customer
        s, created = UserSubscription.objects.get_or_create(user=StripeUserProfile.objects.get(stripe_cus_id=customer).user)
        s.is_active = True
        s.tier = SubscriptionPlan.objects.get(price_id=sub.plan.id)
        s.save()

    @classmethod
    def customer_subscribed(cls, obj):
        from modules.subscription.models import UserSubscription, SubscriptionPlan, UserSubscriptionHistory
        customer = obj.customer
        price_id = obj.lines.data[0].price.id
        sub_id = obj.subscription

        sub, created = UserSubscription.objects.get_or_create(user=StripeUserProfile.objects.get(stripe_cus_id=customer).user)
        sub.tier = SubscriptionPlan.objects.get(price_id=price_id)
        sub.subscription_id = sub_id
        sub.is_active=True
        sub.save()
        UserSubscriptionHistory.objects.create(sub=sub, action="invoice.payment_succeeded", result=json.dumps(obj))

    @classmethod
    def log_stripe_event(cls, event):
        """
        log_stripe_event creates  stripe webhook log for the specified event.

        :param event: Object of the event whose log is to be created.
        """
        from modules.subscription.models import StripeWebhookLog
        try:
            data = json.dumps(event.data.object)
        except:
            data = str(event.data.object)
        StripeWebhookLog.objects.create(type=event.type, data=data)
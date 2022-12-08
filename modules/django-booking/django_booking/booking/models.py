from django.conf import settings
from django.db import models


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class Booking(TimeStamp):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="booking_user")
    quantity = models.IntegerField(default=1)
    venue = models.CharField(max_length=50)
    address = models.TextField()

    def __str__(self):
        return str(self.user)


class BookingPlan(TimeStamp):
    plan = models.CharField(max_length=100)
    description = models.TextField()
    charges = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return str(self.plan)


class BookingPenalty(TimeStamp):
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField()
    charge = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title


class BookingDetail(TimeStamp):
    STATUS = (
        ('pending', 'Pending'),
        ('accepted',  'Accepted'),
        ('declined',  'Declined'),
        ('delivered', 'Delivered'),
        ('occupied',  'Occupied'),
        ('canceled',  'Canceled'),
        ('not_available', 'Not Available')
    )
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="booking_details")
    plan = models.ManyToManyField(BookingPlan, related_name="booking_plan")
    penalty = models.ForeignKey(BookingPenalty, on_delete=models.CASCADE, related_name="booking_penalty", null=True, blank=True)
    identity_number = models.IntegerField() #this is an optional foreign key for what we are booking
    type = models.CharField(max_length=100)
    description = models.TextField()
    occupancy = models.CharField(max_length=100)
    from_date = models.DateField()
    to_date = models.DateField()
    status = models.CharField(max_length=13, choices=STATUS, default="pending")

    def __str__(self):
        return str(self.identity_number)


class ShopifyBooking(TimeStamp):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="shopify_cart_user")
    shopify_cart_id = models.CharField(max_length=100)

    def __str__(self):
        return str(self.shopify_cart_id)

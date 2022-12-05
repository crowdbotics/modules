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
    plan = models.CharField(blank=False, null=False)
    description = models.TextField()
    charges = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return str(self.plan)


class BookingPenalty(TimeStamp):
    title = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField()
    charges = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title


class BookingDetails(TimeStamp):
    STATUS = (
        ('pending', 'Pending'),
        ('accepted',  'Accepted'),
        ('declined',  'Declined'),
        ('delivered', 'Delivered'),
        ('occupied',  'Occupied'),
        ('canceled',  'Canceled'),
        ('not_available ', 'Not Available')
    )
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="booking_details")
    booking_plan = models.ManyToManyField(BookingPlan, related_name="booking_plan")
    booking_penalty = models.ForeignKey(BookingPenalty, on_delete=models.CASCADE, related_name="booking_penalty")
    identity_number = models.ForeignKey("", on_delete=models.SET_NULL)
    type = models.CharField(max_length=100)
    description = models.TextField()
    occupancy = models.CharField(max_length=100)
    from_date = models.DateField()
    to_date = models.DateField()
    status = models.CharField(max_length=13, choices=STATUS)

    def __str__(self):
        return str(self.identity_number)









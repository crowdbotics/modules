from django.contrib import admin
from .models import *

admin.site.register(Booking)

admin.site.register(BookingPlan)

admin.site.register(BookingPenalty)

admin.site.register(BookingDetails)

from django.contrib import admin
from .models import Booking, BookingDetail, BookingPenalty, BookingPlan

admin.site.register(Booking)

admin.site.register(BookingPlan)

admin.site.register(BookingPenalty)

admin.site.register(BookingDetail)

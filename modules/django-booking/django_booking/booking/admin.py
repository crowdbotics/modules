from django.contrib import admin

from .models import Booking, BookingDetail, BookingPenalty, BookingPlan, ShopifyBooking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ["user", "address", "venue", "quantity"]


@admin.register(BookingPlan)
class BookingPlanAdmin(admin.ModelAdmin):
    list_display = ["plan", "charges", "description"]


@admin.register(BookingPenalty)
class BookingPenaltyAdmin(admin.ModelAdmin):
    list_display = ["title", "charges", "description"]


@admin.register(BookingDetail)
class BookingDetailAdmin(admin.ModelAdmin):
    list_display = ["booking", "plans", "description", "penalty", "status"]


@admin.register(ShopifyBooking)
class ShopifyBookingAdmin(admin.ModelAdmin):
    list_display = ["user", "shopify_cart_id"]

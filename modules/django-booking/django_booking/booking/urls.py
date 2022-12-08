from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import BookingView, BookingPenaltyView, BookingPlanView, BookingDetailView, CreateCartView, CreateBookingView


router = DefaultRouter()
router.register("booking", BookingView, basename="booking")
router.register("penalties", BookingPenaltyView, basename="penalties")
router.register("plans", BookingPlanView, basename="plans")
router.register("booking-details", BookingDetailView, basename="details")
router.register("create-booking", CreateBookingView, basename="create-booking")

urlpatterns = [
    path("", include(router.urls)),
    path("shopify/booking/", CreateCartView.as_view()),
]

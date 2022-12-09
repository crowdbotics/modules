from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import BookingView, BookingPenaltyView, BookingPlanView, BookingDetailView, CreateCartView, CreateBookingView


router = DefaultRouter()
router.register("booking", BookingView, basename="booking")
"""
It will create and return the booking details against the user token. Will take the `quantity` is the number rooms or tickets.
`Venue` the location and `address` is the brief address with booker name.
"""

router.register("penalties", BookingPenaltyView, basename="penalties")
"""
It will create and return the penalties created for the bookers. Will accept `title`, `description` and `charge` for the penalty plan in `POST` request.
Will return the all penalties `GET` request.
"""

router.register("plans", BookingPlanView, basename="plans")
"""
It will create and return the plans for the bookers. Will accept `plan`, as title for the plan `description` and `charges` against that plan `POST` request.
Will return the all plans in `GET` request.
"""

router.register("booking-details", BookingDetailView, basename="details")
"""
It will create and return the booking-details of the item (hotel room, car or a ticket) being booked.
Will take the unique `identity_number` for item, the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty`. 
"""

router.register("create-booking", CreateBookingView, basename="create-booking")
"""
It will create a new  booking against `booking_id` created using the booking api.
Will take the unique `identity_number` for item, the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty`. 
"""

urlpatterns = [
    path("", include(router.urls)),
    path("shopify/booking/", CreateCartView.as_view()),
    
]

"""
 (shopify/booking/)  It will create a new cart add line_items to cart, retrieve cart from shopify. The cart id will be saved in the in DB using ShopifyBooking model
"""
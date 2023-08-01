from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Booking, BookingPlan, BookingPenalty, BookingDetail, ShopifyBooking

User = get_user_model()


class BookingTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.booking = Booking.objects.create(user=self.user,
                                              quantity=1, venue="booking for meeting", address="pakistan")

    def test_create_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {
            "user": self.user.id,
            "quantity": 1,
            "venue": "booking for test",
            "address": "testing file",
        }
        response = self.client.post(reverse('booking-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['venue'], 'booking for test')

    def test_create_booking_without_authorization(self):
        data = {
            "user": self.user,
            "quantity": 1,
            "venue": "booking for test",
            "address": "testing file",
        }
        response = self.client.post(reverse('booking-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_booking_with_empty_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {}
        response = self.client.post(reverse('booking-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_booking_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(reverse('booking-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['venue'], 'booking for meeting')

    def test_single_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(reverse('booking-detail', kwargs={'pk': self.booking.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['address'], 'pakistan')

    def test_update_single_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {
            "user": 1,
            "quantity": 1,
            "venue": "booking for test",
            "address": "England",
        }
        response = self.client.put(reverse('booking-detail', kwargs={'pk': self.booking.id}), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['address'], 'England')

    def test_booking_model_str_is_equal_to_username(self):
        """
        Method `__str__` should be equal to field `username`
        """
        user = Booking.objects.get(pk=1)
        self.assertEqual(str(user), user.user.username)


class BookingPlanTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.booking_plan = BookingPlan.objects.create(plan="booking plan",
                                                       description="best booking plan", charges=445.32)

    def test_create_booking_plan(self):
        data = {
            "plan": "booking plan",
            "description": "best booking plan",
            "charges": 445.32
        }
        response = self.client.post(reverse('plans-list'), data)
        plan_object = BookingPlan.objects.all().last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['plan'], plan_object.plan)
        self.assertEqual(response.data['description'], plan_object.description)

    def test_create_booking_plan_without_authorization(self):
        data = {
            "plan": "booking plan",
            "description": "best booking plan",
            "charges": 445.32
        }
        self.client.force_authenticate(user=None)
        response = self.client.post(reverse('plans-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_booking_plan_with_empty_data(self):
        data = {}
        response = self.client.post(reverse('plans-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_booking_plan_list(self):
        response = self.client.get(reverse('plans-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['id'], BookingPlan.objects.all().first().id)
        self.assertEqual(response.data['results'][0]['plan'], BookingPlan.objects.all().first().plan)

    def test_single_booking_plan(self):
        response = self.client.get(reverse('plans-detail', args=(self.booking_plan.id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_single_booking_plan(self):
        data = {
            "plan": "booking plan",
            "description": "best booking plan",
            "charges": 445.32
        }
        response = self.client.put(reverse('plans-detail', args=(self.booking_plan.id,)), data)
        booking_object = BookingPlan.objects.get(id=self.booking_plan.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['plan'], booking_object.plan)
        self.assertEqual(response.data['plan'], data['plan'])
        self.assertEqual(booking_object.plan, data['plan'])

    def test_BookingPlan_str_is_equal_to_plan(self):
        """
        Method `__str__` should be equal to field `plan`
        """
        plan = BookingPlan.objects.get(pk=1)
        self.assertEqual(str(plan), plan.plan)


class BookingPenaltyTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.booking_Penalty = BookingPenalty.objects.create(title="booking penalty",
                                                             description="best booking penalty", charges=445.32)

    def test_create_booking_penalty(self):
        data = {
            "title": "booking penalty",
            "description": "best booking plan",
            "charges": 445.32
        }
        response = self.client.post(reverse('penalties-list'), data)
        penalty_object = BookingPenalty.objects.all().last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], penalty_object.title)
        self.assertEqual(response.data['description'], penalty_object.description)

    def test_create_booking_penalty_with_un_auth(self):
        data = {
            "title": "booking penalty",
            "description": "best booking penalty",
            "charges": 445.32
        }
        self.client.force_authenticate(user=None)
        response = self.client.post(reverse('penalties-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_booking_penalty_with_empty_data(self):
        data = {}
        response = self.client.post(reverse('penalties-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_booking_penalty_list(self):
        response = self.client.get(reverse('penalties-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['id'], BookingPenalty.objects.all().first().id)
        self.assertEqual(response.data['results'][0]['title'], BookingPenalty.objects.all().first().title)

    def test_single_booking_penalty(self):
        response = self.client.get(reverse('penalties-detail', args=(self.booking_Penalty.id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_single_booking_penalty(self):
        data = {
            "title": "booking penalty",
            "description": "best booking penalty",
            "charges": 445.32
        }
        response = self.client.put(reverse('penalties-detail', args=(self.booking_Penalty.id,)), data)
        penalty_object = BookingPenalty.objects.get(id=self.booking_Penalty.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], penalty_object.title)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(penalty_object.title, data['title'])

    def test_str_is_equal_to_title(self):
        """
        Method `__str__` should be equal to field `title`
        """
        title = BookingPenalty.objects.get(pk=1)
        self.assertEqual(str(title), title.title)


class BookingDetailTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test_example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.custom_booking = Booking.objects.create(user=self.user,
                                                     quantity=2, venue="california room", address="china")
        self.booking = Booking.objects.create(user=self.user,
                                              quantity=1, venue="booking for meeting", address="This is address")

        self.booking_plan = BookingPlan.objects.create(plan="booking plan",
                                                       description="best booking plan", charges=445.32)

        self.booking_Penalty = BookingPenalty.objects.create(title="booking penalty",
                                                             description="best booking penalty", charges=445.32)
        self.booking_detail = BookingDetail.objects.create(booking=self.booking,
                                                           penalty=self.booking_Penalty,
                                                           plans=self.booking_plan,
                                                           identity_number=1,
                                                           booking_type="personal", description="booking detail",
                                                           occupancy="booking detail", from_date='2006-10-25 14:30:59',
                                                           to_date="2006-10-25 14:30:59",
                                                           status="pending")

    def test_create_booking_detail(self):
        data = {
            "booking": self.custom_booking.id,
            "plans": self.booking_plan.id, "penalty": self.booking_Penalty.id,
            "identity_number": 1,
            "booking_type": "best type", "description": "booking detail",
            "occupancy": "booking detail", "from_date": '2023-10-25 14:30:59',
            "to_date": "2023-10-26 14:30:59",
            "status": "pending"
        }
        response = self.client.post(reverse('details-list'), data, format='json')
        detail_object = BookingDetail.objects.all().last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['booking'], detail_object.booking.id)
        self.assertEqual(response.data['penalty'], detail_object.penalty.id)

    def test_create_booking_detail_with_un_auth(self):
        data = {
            "booking": self.custom_booking.id,
            "plans": self.booking_plan.id, "penalty": self.booking_Penalty.id,
            "identity_number": 1,
            "booking_type": "best type", "description": "booking detail",
            "occupancy": "booking detail", "from_date": '2006-10-25 14:30:59',
            "to_date": "2006-10-25 14:30:59",
            "status": "pending"
        }
        self.client.force_authenticate(user=None)
        response = self.client.post(reverse('details-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_booking_detail_with_empty_data(self):
        data = {}
        response = self.client.post(reverse('details-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_booking_detail_list(self):
        response = self.client.get(reverse('details-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['id'], BookingDetail.objects.all().first().id)
        self.assertEqual(response.data['results'][0]['status'], BookingDetail.objects.all().first().status)

    def test_single_booking_detail(self):
        response = self.client.get(reverse('details-detail', kwargs={'pk': self.booking_detail.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['booking_type'], 'personal')

    def test_update_single_booking_detail(self):
        data = {
            "booking": self.custom_booking.id,
            "plans": self.booking_plan.id, "penalty": self.booking_Penalty.id,
            "identity_number": 1,
            "booking_type": "best type", "description": "booking detail",
            "occupancy": "booking detail", "from_date": '2006-10-25 14:30:59',
            "to_date": "2006-10-25 14:30:59",
            "status": "pending"
        }
        response = self.client.put(reverse('details-detail', kwargs={'pk': self.booking_detail.id}), data)
        detail_object = BookingDetail.objects.get(id=self.booking_detail.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['occupancy'], detail_object.occupancy)
        self.assertEqual(response.data['status'], data['status'])
        self.assertEqual(detail_object.status, data['status'])

    def test_BookingDetail_str_is_equal_to_identity_number(self):
        """
        Method `__str__` should be equal to field `identity_number`
        """
        identity_number = BookingDetail.objects.get(pk=1)
        self.assertEqual(str(identity_number), str(identity_number.identity_number))


class CreateBookingTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.custom_booking = Booking.objects.create(user=self.user,
                                                     quantity=2, venue='hotel romania', address="oman")
        self.booking = Booking.objects.create(user=self.user,
                                              quantity=1, venue="booking for meeting", address="pakistan")

        self.booking_plan = BookingPlan.objects.create(plan="booking plan",
                                                       description="best booking plan", charges=445.32)

        self.booking_Penalty = BookingPenalty.objects.create(title="booking penalty",
                                                             description="best booking penalty", charges=445.32)
        self.booking_detail = BookingDetail.objects.create(booking=self.booking,
                                                           penalty=self.booking_Penalty,
                                                           plans=self.booking_plan,
                                                           identity_number=1,
                                                           booking_type="professional", description="booking detail",
                                                           occupancy="booking detail", from_date='2006-10-25 14:30:59',
                                                           to_date="2006-10-25 14:30:59",
                                                           status="pending")

    def test_create_already_booking_detail(self):
        data = {
            "booking": self.custom_booking.id,
            "plans": self.booking_plan.id, "penalty": self.booking_Penalty.id,
            "identity_number": 1,
            "booking_type": "best type", "description": "booking detail",
            "occupancy": "booking detail", "from_date": '2006-10-25 14:30:59',
            "to_date": "2006-10-25 14:30:59",
            "status": "pending"
        }
        response = self.client.post(reverse('create-booking-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_booking_detail_with_un_auth(self):
        data = {
            "booking": self.custom_booking.id,
            "plans": self.booking_plan.id, "penalty": self.booking_Penalty.id,
            "identity_number": 1,
            "booking_type": "best type", "description": "booking detail",
            "occupancy": "booking detail", "from_date": '2006-10-25 14:30:59',
            "to_date": "2006-10-25 14:30:59",
            "status": "pending"
        }
        self.client.force_authenticate(user=None)
        response = self.client.post(reverse('create-booking-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_booking_detail_with_empty_data(self):
        data = {}
        response = self.client.post(reverse('create-booking-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_booking_detail_list(self):
        response = self.client.get(reverse('create-booking-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['id'], BookingDetail.objects.all().first().id)
        self.assertEqual(response.data['results'][0]['status'], BookingDetail.objects.all().first().status)

    def test_single_booking_detail(self):
        response = self.client.get(reverse('create-booking-detail', args=(self.booking_detail.id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_single_booking_detail(self):
        data = {
            "booking": self.custom_booking.id,
            "plans": self.booking_plan.id, "penalty": self.booking_Penalty.id,
            "identity_number": 1,
            "booking_type": "best type", "description": "booking detail",
            "occupancy": "booking detail", "from_date": '2006-10-25 14:30:59',
            "to_date": "2006-10-25 14:30:59",
            "status": "pending"
        }
        response = self.client.put(reverse('create-booking-detail', args=(self.booking_detail.id,)), data)
        detail_object = BookingDetail.objects.get(id=self.booking_detail.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['occupancy'], detail_object.occupancy)
        self.assertEqual(response.data['status'], data['status'])
        self.assertEqual(detail_object.status, data['status'])


class CreateCartTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.shopify_booking = ShopifyBooking.objects.create(user=self.user,
                                                             shopify_cart_id="cart")

    def test_create_cart_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {
            "lines": [
                {
                    "quantity": 1,
                    "merchandiseId": "gid://shopify/ProductVariant/44073461448998",
                    "attributes": {"key": "address", "value": "Bahawalpur, punjab, pakistan"}
                },
            ],
            "attributes": {"key": "address", "value": "Bahawalpur, punjab, pakistan"}
        }
        response = self.client.post('/modules/booking/shopify/booking/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_cart_with_shopify(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post('/modules/booking/shopify/booking/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_cart(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        params = {
            "cartId": "gid://shopify/Cart/1f049996d99edb9cab92d43e725d28ec"
        }
        response = self.client.get('/modules/booking/shopify/booking/', params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_cart_without_params(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('/modules/booking/shopify/booking/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_ShopifyBooking_str_is_equal_to_shopify_cart_id(self):
        """
        Method `__str__` should be equal to field `shopify_cart_id`
        """
        shopify_cart_id = ShopifyBooking.objects.get(pk=1)
        self.assertEqual(str(shopify_cart_id), shopify_cart_id.shopify_cart_id)

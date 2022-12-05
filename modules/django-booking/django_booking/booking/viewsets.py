from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .serializers import BookingSerializer, BookingPenaltySerializer, BookingDetailSerializer, BookingPlanSerializer
from .models import Booking, BookingPlan, BookingPenalty, BookingDetail


class BookingView(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    queryset = Booking.objects.all()


class BookingPlanView(ModelViewSet):
    serializer_class = BookingPlanSerializer
    queryset = BookingPlan.objects.all()


class BookingPenaltyView(ModelViewSet):
    serializer_class = BookingPenaltySerializer
    queryset = BookingPenalty.objects.all()


class BookingDetailView(ModelViewSet):
    serializer_class = BookingDetailSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    queryset = BookingDetail.objects.all()




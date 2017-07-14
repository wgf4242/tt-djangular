from django.contrib.auth.models import User
from rest_framework import generics
from apps.attendance.models import Person, MonthInfo, Attend
from apps.attendance.serializers import PersonSerializer

class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = []


class MonthList(generics.ListCreateAPIView):
    queryset = MonthInfo.objects.all()
    serializer_class = PersonSerializer
    permission_classes = []


class AttendList(generics.ListCreateAPIView):
    queryset = Attend.objects.all()
    serializer_class = PersonSerializer
    permission_classes = []



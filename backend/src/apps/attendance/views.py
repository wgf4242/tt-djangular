from django.contrib.auth.models import User
from rest_framework import generics
from apps.attendance.models import Person, MonthInfo, Attend
from apps.attendance.serializers import *

class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = []


class MonthList(generics.ListCreateAPIView):
    queryset = MonthInfo.objects.all()
    serializer_class = MonthSerializer
    permission_classes = []


class AttendList(generics.ListCreateAPIView):
    serializer_class = AttendSerializer
    permission_classes = []

    def get_queryset(self):
        month_id = self.request.GET.get("month_id")
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")
        if month_id or start_date:
            qs = Attend.objects.search(month_id, start_date, end_date)
        else:
            qs = Attend.objects.all()
        return qs


class AttendSumList(generics.ListCreateAPIView):
    serializer_class = AttendSumSerializer
    permission_classes = []

    def get_queryset(self):
        return Attend.objects.sum(self.kwargs.get('month_id'))


class MonthDetail(generics.RetrieveAPIView):
# class MonthDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MonthInfo.objects.all()
    serializer_class = MonthSerializer

class AttendDetail(generics.RetrieveAPIView):
# class AttendDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attend.objects.all()
    serializer_class = AttendSerializer


from apps.attendance.filters import AttendFilter
from apps.attendance.serializers import *
from django_filters.rest_framework import DjangoFilterBackend, filters
from rest_framework import generics, viewsets


class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.filter(active=True)
    serializer_class = PersonSerializer
    pagination_class = None
    permission_classes = []


class MonthViewSet(viewsets.ModelViewSet):
    serializer_class = MonthSerializer
    permission_classes = []

    def get_queryset(self):
        if 'month-list-active' in self.request.resolver_match.url_name:
            qs = MonthInfo.objects.active()
        else:
            qs = MonthInfo.objects.all()
        return qs


class AttendList(generics.ListCreateAPIView):
    serializer_class = AttendSerializer
    permission_classes = []
    pagination_class = None

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


class AttendViewSet(viewsets.ModelViewSet):
    queryset = Attend.objects.all()
    serializer_class = AttendSerializer
    pagination_class = None
    filter_backends = (DjangoFilterBackend, )
    # filter_fields = ('month',)
    filter_class = AttendFilter
    # filter_backends = (DjangoFilterBackend, filters.DateFilter)
    # filter_fields = ('month', 'date')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AttendDetailSerializer
        return super().get_serializer_class()


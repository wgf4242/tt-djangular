from apps.attendance.models import Attend
from rest_framework import generics
from django_filters import rest_framework as filters


class AttendFilter(filters.FilterSet):

    date_range = filters.DateFromToRangeFilter(name='date')
    # min_price = filters.DateFilter(name="date", lookup_expr='gte')
    # max_price = filters.NumberFilter(name="date", lookup_expr='lte')

    class Meta:
        model = Attend
        fields = ['date_range', 'month', 'person']

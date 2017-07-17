import django_filters
from .models import Tour, ProductionRecord, Defect


class TourFilter(django_filters.rest_framework.FilterSet):
    start_date = django_filters.filters.DateFilter(name='date', lookup_expr='gt')
    end_date = django_filters.filters.DateFilter(name='date', lookup_expr='lt')
    date_range = django_filters.filters.DateRangeFilter(name='date')

    class Meta:
        model = Tour
        fields = ['date_range']


class ProductionRecordFilter(django_filters.rest_framework.FilterSet):
    start_date = django_filters.filters.DateFilter(name='production_date', lookup_expr='gt')
    end_date = django_filters.filters.DateFilter(name='production_date', lookup_expr='lt')
    date_range = django_filters.filters.DateRangeFilter(name='production_date')

    class Meta:
        model = ProductionRecord
        fields = ['date_range']


class DefectFilter(django_filters.rest_framework.FilterSet):
    # is_done = django_filters.filters.BooleanFilter(name='date', lookup_expr='isnull', label='是否完成')

    is_done = django_filters.filters.BooleanFilter(name='date', method='is_finished', label='是否完成')

    def is_finished(self, queryset, name, value):
        if value:
            return queryset.exclude(finish_date__isnull=True)
        else:
            return queryset.filter(finish_date__isnull=True)

    class Meta:
        model = Defect
        fields = ['is_done', 'category', 'line']

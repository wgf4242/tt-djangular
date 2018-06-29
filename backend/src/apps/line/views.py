from apps.line.filters import TourFilter, ProductionRecordFilter, DefectFilter, RecordFilter, LineFaultFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework import renderers
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_pandas import PandasExcelRenderer, PandasMixin

from .serializers import *


class TourListViewSet(viewsets.ModelViewSet):
    """
    巡视管理
    """
    serializer_class = TourSerializer
    queryset = Tour.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_class = TourFilter
    pagination_class = None


class LineList(viewsets.ModelViewSet):
    """
    线路管理
    """
    serializer_class = LineSerializer
    queryset = Line.objects.all()
    pagination_class = None


class BranchList(generics.ListCreateAPIView):
    """
    分支管理
    """
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()
    pagination_class = None


class DefectTypeViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = DefectType.objects.all()
        serializer = DefectTypeSerializer(queryset, many=True)
        return Response(serializer.data)


class DefectViewSet(PandasMixin, viewsets.ModelViewSet):
    """
    缺陷管理
    """
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filter_class = DefectFilter
    ordering_fields = ('date',)
    ordering = ('-date',)
    search_fields = ('description',)
    renderer_classes = [renderers.BrowsableAPIRenderer, renderers.JSONRenderer, PandasExcelRenderer]

    pandas_serializer_class = MyCustomPandasSerializer

    def list(self, request, *args, **kwargs):
        if request.accepted_renderer.format == 'xlsx':
            self.pagination_class = None
        return super().list(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action == 'list':
            self.serializer_class = DefectListSerializer
        return super().get_serializer_class()


class FacilityViewSet(viewsets.ModelViewSet):
    """
    设备管理
    """
    serializer_class = FacilitySerializer
    queryset = Facility.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            self.serializer_class = FacilitySerializerList
        return super().get_serializer_class()


class FacilityCategoryViewSet(viewsets.ModelViewSet):
    """
    设备分类管理
    """
    serializer_class = FacilityCategorySerializer
    queryset = FacilityCategory.objects.all()
    pagination_class = None


class DefectCategoryViewSet(viewsets.ModelViewSet):
    """
    缺陷类型
    """
    queryset = DefectCategory.objects.all()
    serializer_class = DefectCategorySerializer
    pagination_class = None


class ProductionRecordViewSet(viewsets.ModelViewSet):
    """
    投产记录管理
    """
    queryset = ProductionRecord.objects.all()
    serializer_class = ProductionRecordSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProductionRecordFilter

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductionRecordListSerializer
        return super().get_serializer_class()


class TransformerViewSet(viewsets.ModelViewSet):
    """
    变压器记录管理
    """
    serializer_class = TransformerSerializer
    queryset = Transformer.objects.all()
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    ordering_fields = ('timestamp',)
    ordering = ('-timestamp',)
    search_fields = ('well',)


class RecordViewSet(viewsets.ModelViewSet):
    """
    工作量记录管理
    """
    serializer_class = RecordSerializer
    pagination_class = None
    queryset = Record.objects.all()
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filter_class = RecordFilter
    ordering_fields = ('timestamp',)
    ordering = ('-timestamp',)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.values('name', 'unit', ).annotate(sum=Sum('count')).order_by()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class LineFaultViewSet(viewsets.ModelViewSet):
    """
    故障记录管理
    """
    serializer_class = LineFaultSerializer
    queryset = LineFault.objects.all()
    pagination_class = None
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filter_class = LineFaultFilter
    ordering_fields = ('timestamp',)
    ordering = ('timestamp',)


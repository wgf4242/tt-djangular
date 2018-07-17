from apps.line.filters import TourFilter, ProductionRecordFilter, DefectFilter
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

    def perform_create(self, serializer):
        instance = serializer.save()
        line = instance.line
        line.transformer += instance.transformer or 0
        line.single_disconnector += instance.single_disconnector or 0
        line.breaker += instance.breaker or 0
        line.disconnector += instance.disconnector or 0
        line.grounding_device += instance.grounding_device or 0
        line.arrester += instance.arrester or 0
        line.pole += instance.pole or 0
        line.length += instance.length or 0
        line.well += instance.well or 0
        line.save()


class RepairRecordViewSet(viewsets.ModelViewSet):
    """
    检修记录管理
    """
    serializer_class = RepairRecordSerializer
    queryset = RepairRecord.objects.all()
    pagination_class = None


class RepairRecordCategoryViewSet(viewsets.ModelViewSet):
    """
    检修分类管理
    """
    serializer_class = RepairRecordCategorySerializer
    queryset = RepairRecordCategory.objects.all()
    pagination_class = None


class RepairSingleRecordViewSet(viewsets.ModelViewSet):
    """
    检修单条记录管理
    """
    serializer_class = RepairSingleRecordSerializer
    queryset = RepairSingleRecord.objects.all()
    pagination_class = None


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



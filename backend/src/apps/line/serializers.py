from rest_framework import serializers
from apps.line.models import *
from rest_pandas import PandasSerializer


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'


class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = '__all__'


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


class LineNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ('id', 'name')


class BranchNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'name')


class DefectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defect
        fields = '__all__'


class DefectListSerializer(serializers.ModelSerializer):
    line = serializers.CharField(source='line.name')
    branch = serializers.CharField(source='branch.name')
    category = serializers.CharField(source='category.name')
    type = serializers.CharField(source='type.name')

    class Meta:
        model = Defect
        fields = '__all__'


class FacilitySerializerList(serializers.ModelSerializer):
    line = serializers.CharField(source='line.name')
    branch = serializers.CharField(source='branch.name')
    category = serializers.CharField(source='category.name')

    class Meta:
        model = Facility
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Facility
        fields = '__all__'


class FacilityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FacilityCategory
        fields = '__all__'


class DefectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DefectCategory
        fields = '__all__'


class DefectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefectType
        fields = '__all__'


class ProductionRecordSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(max_length=180, label="备注", initial="变压器容量 kVA, 新增数值为正，拆除数值为负", allow_null=True,
                                    allow_blank=True, default="变压器容量 kVA")

    class Meta:
        model = ProductionRecord
        fields = '__all__'


class ProductionRecordListSerializer(serializers.ModelSerializer):
    line = LineNameSerializer()
    branch = BranchNameSerializer()

    class Meta:
        model = ProductionRecord
        fields = '__all__'


class MyCustomPandasSerializer(PandasSerializer):
    def transform_dataframe(self, dataframe):
        instance = self.instance[0]
        if not instance:
            return

        columns_new = []
        for column_name in list(dataframe):
            title = instance._meta.get_field(column_name).verbose_name.title()
            columns_new.append(title)
        dataframe.columns = columns_new
        return dataframe


class RepairRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairRecord
        fields = ['id', 'person', 'place', 'date', 'summary']
        depth = 2


class RepairRecordCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairRecordCategory
        fields = '__all__'


class RepairSingleRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairSingleRecord
        fields = '__all__'


class TransformerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transformer
        fields = '__all__'

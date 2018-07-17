from rest_framework import serializers
from apps.attendance.models import Person, MonthInfo, Attend


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthInfo
        fields = '__all__'


class AttendDetailSerializer(serializers.ModelSerializer):
    person = PersonSerializer()
    month = MonthSerializer()

    class Meta:
        model = Attend
        fields = '__all__'


class AttendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attend
        fields = '__all__'


class AttendSumSerializer(serializers.Serializer):
    person__id = serializers.IntegerField()
    person__name = serializers.CharField(max_length=200)
    attend__sum = serializers.IntegerField()
    workhour__sum = serializers.IntegerField()
    climbhour__sum = serializers.IntegerField()

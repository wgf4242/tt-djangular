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


class AttendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attend
        fields = '__all__'


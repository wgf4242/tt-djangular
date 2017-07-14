from django.db import models
from django.db.models import Sum
from django.core.validators import MaxValueValidator
from django.core.urlresolvers import reverse
import datetime
from django.db.models import Q

# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=100, unique=True)
    no = models.IntegerField(validators=[MaxValueValidator(999)],default=0, verbose_name="序号", unique=True)


class MonthInfo(models.Model):
    monthname= models.CharField(max_length=100,verbose_name='月份名称')
    comment = models.CharField(max_length=100,blank=True, default="杜文有监督员加100元，于华俊监督员50元")
    log_user = models.CharField(max_length=100,blank=True)
    # 已归档为1，不存在为0
    archived = models.IntegerField(validators=[MaxValueValidator(999)],default=0 ,verbose_name='已存档',)
    timestamps = models.DateField(auto_now_add=True) 


class Attend(models.Model):
    date = models.DateField(verbose_name='日期',)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, verbose_name='姓名')
    attend = models.IntegerField(validators=[MaxValueValidator(999)],verbose_name='出勤',null=True, blank=True,default=1,)
    workhour = models.IntegerField(validators=[MaxValueValidator(999)],verbose_name='出工', null=True, blank=True, default=0)
    climbhour = models.IntegerField(validators=[MaxValueValidator(999)],verbose_name='上杆', null=True, blank=True, default=0)
    otherhour = models.IntegerField(validators=[MaxValueValidator(999)],verbose_name='变检工时', null=True, blank=True, default=0)
    month = models.ForeignKey(MonthInfo, on_delete=models.CASCADE,verbose_name='月份' )
    comment = models.CharField(max_length=500,verbose_name='备注', null=True, blank=True)

    # 引起聚合错误，person会重复
    class Meta:
        ordering = ['date']
        
# class Utils(object):
    
def getWeekdayChoice():
    workdaysChoice = [
        ('0','星期一'),
        ('1','  星期二'),
        ('2','星期三'),
        ('3','星期四'),
        ('4','星期五'),
        ('5','星期六'),
        ('6','星期日'),
        ('7','下星期一'),
    ]

    today = datetime.date.today()
    if today.weekday()==0:
        lastMonday = today + datetime.timedelta(days=-today.weekday(), weeks=-1)
    else:
        lastMonday = today + datetime.timedelta(days=-today.weekday(), weeks=0)
    newChoice = []
    for x,y in (workdaysChoice):
        nextday = lastMonday + datetime.timedelta(days=int(x))
        datevalue = nextday.strftime(' %Y-%m-%d')
        a = (datevalue, y + datevalue)
        newChoice.append(a)
    return newChoice


def getMonthChoice():
    month_queryset = MonthInfo.objects.exclude(archived=1).values('id', 'monthname')
    monthChoice = []
    for month_dict in month_queryset:
        # for key in month_dict:
        month_list = []
        month_list.append(month_dict['id'])
        month_list.append(month_dict['monthname'])
        monthChoice.append(month_list)
    return monthChoice


class ModelManager(object):
    def get_month_data(month=None,start_date=None,end_date=None):
        my_search = Q()
        if month:
            my_search &= Q(month__id=month)
        if start_date and end_date:
            my_search &= Q(date__range=(start_date, end_date))

        queryset = Attend.objects.filter(my_search).values("person__id", "person__name", "person__no").annotate( \
            Sum('attend'), Sum('workhour'), Sum('climbhour')).values( \
            'person__id', 'person__name', 'attend__sum', 'workhour__sum', 'climbhour__sum').order_by('person__no')

        return queryset
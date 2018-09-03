from tabnanny import verbose

from django.db import models
from django.db.models import Sum
from django.core.validators import MaxValueValidator
from django.core.urlresolvers import reverse
import datetime
from django.db.models import Q


class AttendQuerySet(models.query.QuerySet):
    def search(self, month_id, start_date=None, end_date=None):
        q = None
        if month_id:
            q = Q(month__id=month_id)
        if start_date and end_date:
            q = Q(date__gte=start_date) & Q(date__lte=end_date) | q
        return self.filter(q)


class AttendManager(models.Manager):
    def get_queryset(self):
        return AttendQuerySet(self.model, using=self._db)

    def search(self, month_id, start_date, end_date):
        return self.get_queryset().search(month_id, start_date, end_date)

    def sum(self, month_id):
        queryset = self.get_queryset().search(month_id).values("person__id", "person__name", "person__no").annotate( \
            Sum('attend'), Sum('workhour'), Sum('climbhour')).values( \
            'person__id', 'person__name', 'attend__sum', 'workhour__sum', 'climbhour__sum').order_by('person__no')
        return queryset


class MonthManager(models.Manager):
    def active(self):
        id = self.get_queryset().last().id
        return self.get_queryset().filter(id=id)
        # return self.get_queryset().reverse()[0]


class Person(models.Model):
    """
    人员管理
    """
    name = models.CharField(max_length=100, unique=True)
    no = models.IntegerField(validators=[MaxValueValidator(999)], default=0, verbose_name="序号")
    active = models.BooleanField(default=True, verbose_name="隐藏")

    class Meta:
        ordering = ['no']
        verbose_name = '人员管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class MonthInfo(models.Model):
    """
    月份管理
    """
    monthname = models.CharField(max_length=100, verbose_name='月份名称')
    comment = models.CharField(max_length=100, blank=True, default="杜文有监督员加100元")
    log_user = models.CharField(max_length=100, blank=True)
    # 已归档为1，不存在为0
    archived = models.IntegerField(validators=[MaxValueValidator(999)], default=0, verbose_name='已存档', )
    timestamps = models.DateField(auto_now_add=True)

    objects = MonthManager()

    class Meta:
        ordering = ['-timestamps']
        verbose_name = '月信息管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.monthname


class Attend(models.Model):
    """
    出勤管理
    """
    date = models.DateField(verbose_name='日期', )
    person = models.ForeignKey(Person, on_delete=models.CASCADE, verbose_name='姓名')
    attend = models.IntegerField(validators=[MaxValueValidator(999)], verbose_name='出勤', null=True, blank=True,
                                 default=1, )
    workhour = models.IntegerField(validators=[MaxValueValidator(999)], verbose_name='出工', null=True, blank=True,
                                   default=0)
    climbhour = models.IntegerField(validators=[MaxValueValidator(999)], verbose_name='上杆', null=True, blank=True,
                                    default=0)
    month = models.ForeignKey(MonthInfo, on_delete=models.CASCADE, verbose_name='月份')
    comment = models.CharField(max_length=500, verbose_name='备注', null=True, blank=True)

    objects = AttendManager()

    # 引起聚合错误，person会重复
    class Meta:
        ordering = ['date']
        verbose_name = '出勤管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return "{date} , {person}, {month}".format(date=self.date, person=self.person, month=self.month)

import datetime
from django.db import models
from django.db.models import Sum, Count, Q
from django.core.validators import MaxValueValidator
from django.conf import settings


class WorkStatisticsManager(models.Manager):
    def get_sum(self, year=None, start_date=None, end_date=None):
        if not year:
            year = datetime.date.today().year
        qs = self.get_queryset().filter(date__year=year)
        if start_date and end_date:
            qs = qs.filter(Q(date__gte=start_date) & Q(date__lte=end_date))
        myqs = qs.values('cat__name').annotate(Sum('amount'))
        return myqs

    def get_days(self, year=None):
        if not year:
            year = datetime.date.today().year
        days = self.get_queryset().filter(date__year=year).values('date').distinct().count()
        return days


class Branch(models.Model):
    name = models.CharField(max_length=180, verbose_name='分支名称')
    no = models.IntegerField(validators=[MaxValueValidator(100)], verbose_name='编号', blank=True, null=True)

    def __str__(self):
        return self.name


class Line(models.Model):
    name = models.CharField(max_length=180, verbose_name='线路名称')
    branch = models.ManyToManyField(Branch)

    no = models.IntegerField(validators=[MaxValueValidator(100)], verbose_name='编号', blank=True, null=True)
    production_date = models.IntegerField(verbose_name='投产时间', null=True, blank=True)
    transformer = models.IntegerField(verbose_name='变压器', null=True, blank=True)
    single_disconnector = models.IntegerField(verbose_name='单刀闸', null=True, blank=True)
    breaker = models.IntegerField(verbose_name='开关', null=True, blank=True)
    disconnector = models.IntegerField(verbose_name='刀闸', null=True, blank=True)
    grounding_device = models.IntegerField(verbose_name='接地装置', null=True, blank=True)
    arrester = models.IntegerField(verbose_name='避雷器', null=True, blank=True)
    pole = models.IntegerField(verbose_name='电杆', null=True, blank=True)
    length = models.FloatField(verbose_name='公里', null=True, blank=True)
    well = models.IntegerField(verbose_name='油井', null=True, blank=True)
    comment = models.TextField(max_length=180, verbose_name='备注', null=True, blank=True)

    def __str__(self):
        return self.name


class ProductionRecord(models.Model):
    """
    投产验收记录
    """
    production_date = models.DateField(verbose_name='投产时间', null=True, blank=True)
    line = models.ForeignKey(Line, verbose_name="线路名称")
    branch = models.ForeignKey(Branch, verbose_name="分支名称")
    position = models.CharField(max_length=180, null=True, blank=True, verbose_name="位置")
    transformer = models.IntegerField(verbose_name='变压器', null=True, blank=True, default=0)
    single_disconnector = models.IntegerField(verbose_name='单刀闸', null=True, blank=True, default=0)
    breaker = models.IntegerField(verbose_name='开关', null=True, blank=True, default=0)
    disconnector = models.IntegerField(verbose_name='刀闸', null=True, blank=True, default=0)
    grounding_device = models.IntegerField(verbose_name='接地装置', null=True, blank=True, default=0)
    arrester = models.IntegerField(verbose_name='避雷器', null=True, blank=True, default=0)
    pole = models.IntegerField(verbose_name='电杆', null=True, blank=True, default=0)
    # pole = models.IntegerField(verbose_name='电杆', null=True, blank=True)
    length = models.FloatField(verbose_name='公里', null=True, blank=True)
    well = models.IntegerField(verbose_name='油井', null=True, blank=True)
    comment = models.CharField(max_length=180, verbose_name='备注', null=True, blank=True, default="变压器容量 kVA")

    def __str__(self):
        return self.name


# 线路加装投产记录，电容器等
class FacilityCategory(models.Model):
    """
    设备类型
    """
    name = models.CharField(max_length=180, verbose_name='设备名称')

    def __str__(self):
        return self.name


class Facility(models.Model):
    line = models.ForeignKey(Line, verbose_name='线路名称')
    branch = models.ForeignKey(Branch, verbose_name='分支名称')
    position = models.IntegerField(verbose_name='杆号',
                                   validators=[
                                       MaxValueValidator(300, message='没有大于300基杆的分支')
                                   ])
    category = models.ForeignKey(FacilityCategory, verbose_name='设备名称')
    description = models.CharField(max_length=180, verbose_name='详情')
    comment = models.CharField(max_length=180, verbose_name='备注', blank=True, null=True)
    date = models.DateField(verbose_name='日期', help_text='使用 2017-03-03 这种格式')


# 指导卡录入

class WorkCard(models.Model):
    line = models.ForeignKey(Line, verbose_name='线路名称')
    branch = models.ForeignKey(Branch, verbose_name='分支名称')
    person = models.CharField(max_length=180, verbose_name='工作人员')
    description = models.CharField(max_length=180, verbose_name='详情', blank=True, null=True)
    comment = models.CharField(max_length=180, verbose_name='备注', blank=True, null=True)
    date = models.DateField(verbose_name='日期', help_text='使用 2017-03-03 这种格式填写')

    def __str__(self):
        date = self.date.strftime('%Y-%m-%d')
        return date + '.' + self.person
    # return self.person + self.date.strftime("%Y 年%m 月")


# 指导卡工作量类型

class WorkSummaryCategory(models.Model):
    name = models.CharField(max_length=180, verbose_name='类型')
    no = models.IntegerField(verbose_name='编号', blank=True, null=True)

    def __str__(self):
        return self.name


# 指导卡工作量汇总
class WorkStatistics(models.Model):
    line = models.ForeignKey(Line, verbose_name='线路名称')
    branch = models.ForeignKey(Branch, verbose_name='分支名称')
    cat = models.ForeignKey(WorkSummaryCategory, verbose_name='类型')
    amount = models.IntegerField(verbose_name='数量', blank=True, null=True)
    person = models.CharField(max_length=180, verbose_name='工作人员')
    date = models.DateField(verbose_name='日期', help_text='使用 2017-03-03 这种格式')
    comment = models.CharField(max_length=180, verbose_name='备注', blank=True, null=True)

    objects = WorkStatisticsManager()


class DefectCategory(models.Model):
    """
    缺陷类型
    """
    name = models.CharField(max_length=180, verbose_name='缺陷分类')

    def __str__(self):
        return self.name


class DefectType(models.Model):
    """
    缺陷种类：一般，紧急，重大
    """
    name = models.CharField(max_length=180, verbose_name='缺陷分类', null=True, blank=True)

    def __str__(self):
        return self.name


class Defect(models.Model):
    """
    缺陷模型
    """
    line = models.ForeignKey(Line, verbose_name='线路名称')
    branch = models.ForeignKey(Branch, verbose_name='分支名称')
    position = models.IntegerField(verbose_name='杆号',
                                   validators=[
                                       MaxValueValidator(300, message='没有大于300基杆的分支')
                                   ])
    description = models.CharField(max_length=180, verbose_name='缺陷内容')
    comment = models.CharField(max_length=180, verbose_name='备注', blank=True, null=True)
    date = models.DateField(verbose_name='日期', help_text='使用 2017-03-03 这种格式')
    finish_date = models.DateField(verbose_name='处理日期', help_text='使用 2017-03-03 这种格式', blank=True, null=True)
    person = models.CharField(max_length=180, verbose_name='巡视人员')
    category = models.ForeignKey(DefectCategory, verbose_name='缺陷分类')
    type = models.ForeignKey(DefectType, verbose_name='缺陷种类')


class Tour(models.Model):
    line = models.ForeignKey(Line, verbose_name='线路名称')
    description = models.CharField(max_length=180, verbose_name='巡视位置')
    person = models.CharField(max_length=180, verbose_name='巡视人员')
    length = models.FloatField(verbose_name='公里数')
    date = models.DateField(verbose_name='日期', help_text='使用 2017-03-03 这种格式')

    def __str__(self):
        return "{line}, {description} , {person} , {date}".format(line=self.line, description=self.description,
                                                                  person=self.person, date=self.date)


class LineUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=30, verbose_name='姓名')

    def __str__(self):
        return self.user.username

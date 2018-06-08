# 独立使用 django 的 model
import os
import sys

from django.db.models import Sum

pwd = os.path.dirname(os.path.relpath(__file__))
sys.path.append(pwd + "../")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testform.settings")
os.environ.update({"DJANGO_SETTINGS_MODULE": "testform.settings"})

import django

django.setup()

from apps.attendance.models import Attend
from apps.line.models import Record
# date__annotate = Attend.objects.values('person').annotate(sums=Sum('workhour')).order_by()
date__annotate = Record.objects.values('name', 'unit',).annotate(sums=Sum('count')).order_by()
# date__annotate = Record.objects.values('name').annotate(sums=Sum('count')).order_by()
for index, item in enumerate(date__annotate):
    print(index, item)

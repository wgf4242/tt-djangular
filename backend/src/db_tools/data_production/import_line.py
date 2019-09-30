# 序号,线路名称,投产时间,"变压器 （台）",单刀闸（座）,"开关 （台）","刀闸 （座）","接地装置 （处）","避雷器 （组）","电杆 （基）",公里
import sys

import os


pwd = os.path.dirname(os.path.relpath(__file__))
sys.path.append(pwd + "../../")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testform.settings")

import django

django.setup()

import csv
import codecs

d_list = []
with codecs.open('line.txt', 'rU', encoding='utf-8-sig') as csv_file:
    # with open('line.txt') as csv_file:
    csv_reader = csv.reader(csv_file)
    line_count = 0
    it = iter(csv_reader)
    next(it)
    for row in it:
        # print(row)
        d_dict = {}
        d_dict["name"] = row[1]
        d_dict["branch"] = 1
        d_dict["transformer"] = row[3] or 0
        d_dict["pole"] = row[9] or 0
        d_dict["length"] = row[10] or 0
        d_dict["disconnector"] = row[5] or 0
        d_dict["grounding_device"] = row[7] or 0
        d_dict["arrester"] = row[8] or 0
        d_dict["well"] = row[11] or 0
        d_list.append(d_dict) or 0
# print(d_list)
from apps.line.models import Line

for d in d_list:
    # Line.objects.create(**d)
    branch = d.pop('branch')
    x = Line(**d)
    x.save()
    # print(d)
    print(x)

import sys

import os


pwd = os.path.dirname(os.path.relpath(__file__))
sys.path.append(pwd + "../../")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testform.settings")

import django

django.setup()


import xlrd

data = xlrd.open_workbook('data.xlsx')
table = data.sheets()[0]

nrows = table.nrows
ncols = table.ncols

row_iter = iter(range(nrows))
next(row_iter)

from datetime import datetime
def conv(mydate):
    dt = datetime.fromordinal(datetime(1900, 1, 1).toordinal() + int(mydate) - 2)
    # return dt.timetuple()
    return dt

d_list = []
for row in row_iter:
    row_data = table.row_values(row)
    d_dict = {}
    d_dict["production_date"] = conv(row_data[0])
    d_dict["line"] = row_data[1]
    d_dict["branch"] = 1
    d_dict["position"] = row_data[2]
    d_dict["transformer"] = row_data[5]
    d_dict["pole"] = row_data[4]
    d_dict["length"] = row_data[3]
    d_dict["single_disconnector"] = 0
    d_dict["breaker"] = 0
    d_dict["disconnector"] = d_dict["transformer"]
    d_dict["grounding_device"] = d_dict["transformer"]
    d_dict["arrester"] = d_dict["transformer"]
    d_dict["well"] = d_dict["transformer"]
    d_dict["comment"] = ""
    d_list.append(d_dict)

print(d_dict)

from apps.line.models import ProductionRecord
from apps.line.models import Line,Branch
for i_dict in d_list:
    ins = ProductionRecord.objects.create(line_id=1, branch_id=1)
    ins.production_date = i_dict["production_date"]
    line = Line.objects.get(name=i_dict["line"])
    ins.line = line
    ins.branch = Branch.objects.get(pk=1)
    ins.position = i_dict["position"]
    ins.transformer = i_dict["transformer"]
    ins.pole = i_dict["pole"]
    ins.length = i_dict["length"]
    ins.single_disconnector = i_dict["single_disconnector"]
    ins.breaker = i_dict["breaker"]
    ins.disconnector = i_dict["disconnector"]
    ins.grounding_device = i_dict["grounding_device"]
    ins.arrester = i_dict["arrester"]
    ins.well = i_dict["well"]
    ins.comment = i_dict["comment"]
    ins.save()

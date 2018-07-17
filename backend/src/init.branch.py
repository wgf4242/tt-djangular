import os, sys, django
from django.db import connection
from django.conf import settings

os.environ['DJANGO_SETTINGS_MODULE'] = 'testform.settings'

django.setup()  # if not will raise AppRegistryNotReady("Apps aren't loaded yet.")


# sys.path.append('d:\\wgf\\My Documents\\GitHub\\testform')
# sys.path.append('d:/wgf/My Documents/GitHub/testform')

# Method 1 
# filename = settings.BASE_DIR + '\\init_person.sql'
# with connection.cursor() as cursor:
	# cursor.execute(database_init)
	# for line in open(filename,encoding='utf-8'):
	# 	cursor.execute(line)

## Method 2
# init person
# from attendance.utils import init_sql
# init_sql()

# init person
from attendance.models import *
import datetime
if MonthInfo.objects.all().count() < 1:
	name = datetime.datetime.now().strftime("%Y{0}%m{1}").format(*'年月')
	# name = str(datetime.datetime.now().year) + '年' + str(datetime.datetime.now().month) + '月'
	MonthInfo.objects.create(monthname=name)


## Method 3
person_list = ['姜泽光','孙洪涛','朱永刚','王泽','杜文有','商贺','王涛','王鹏','温立君','于华俊','孙玉','于景丹','许磊','王光夫','王宇航','唐硕','王封霖','黄秋远']

for index, person_name in enumerate(person_list):
	Person.objects.create(name=person_name, no=index)

# update no
# for index,name in enumerate(person_list):
# 	obj = Person.objects.get(name=name)
# 	obj.no = index


from line.models import *
import datetime

line_list = ['生活甲线', '生活乙线', '生活丙线', '一号线', '二号线', 'M508线', '西环线', '西干线', '中干线', '东干线', '源油甲线', '源油乙线', '源油丙线', '源二甲线', '源二乙线', '源二丙线', '源二丁线', '源二戊线', '转油甲线', '转油乙线']
for index, name in enumerate(line_list):
	print(index, name)
	Line.objects.create(name=name, no=index)

print(settings.BASE_DIR)

with open('init.txt','r',encoding='utf-8') as f:
	next(f)
	for line in f.readlines():
		name_branch_list = line.strip().split('\t')
		name = name_branch_list[0]
		branch = name_branch_list[1]
		print(name, branch)
		obj = Line.objects.get_or_create(name=name)[0]
		obj_branch = Branch.objects.get_or_create(name=branch)[0]
		print(obj_branch)
		obj.branch.add(obj_branch)

workcat_list = '检修变台（个）','检修单刀闸（座）','检修开关（台）','正立瓶（个）','更换绝缘子（只）','更换避雷器（只）','更换设备线夹（个）','更换绝缘导线（米）','更换刀闸（片/座）','调整弛度（相）','更换横担（个）','装设驱鸟器（个）','更换跌落保险（个）','修补接地极（处）','并沟线夹 （个）','拆除拉线 （条）'
for index,item in enumerate(workcat_list):
	WorkSummaryCategory.objects.get_or_create(no=index,name=item)


# ---初始化检修线路公里数
with open('init_overhaul.txt','r',encoding='utf-8') as f:
	for line in f.readlines():
		print(line)
		list = line.split('\t')
		line = list[0]
		branch = list[1]
		length = list[2]
		Overhaul.objects.get_or_create(line=line, branch=branch, length=length, checked=False)
		# break

overhauled = [1,2,3,4,5,7,9,10,12,14,16,17,18,19,20,21,25,26,27,28,31]
for i in overhauled:
	obj = Overhaul.objects.get(id=i)
	obj.checked = True
	obj.save()
	
# ---初始化线路基本资料
with open('init_linedata.txt','r',encoding='utf-8') as f:
	for line in f.readlines():
		print(line)
		list = line.split('\t')
		line = list[0]
		production_date = list[1]
		transformer = list[2]
		single_disconnector = list[3]
		breaker = list[4]
		disconnector = list[5]
		grounding_device = list[6]
		arrester = list[7]
		pole = list[8]
		length = list[9]
		well = list[10]
		# branch = list[1]
		# length = list[2]
		Line.objects.filter(name=line).update(production_date=production_date, transformer=transformer, single_disconnector=single_disconnector, breaker=breaker, disconnector=disconnector, grounding_device=grounding_device, arrester=arrester, pole=pole, length=length, well=well)
		# l.save()
		# # break

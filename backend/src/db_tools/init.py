# 独立使用 django 的 model
import sys
import os
database_init = 'create database if not exists myform default charset utf8 COLLATE utf8_general_ci'
# database_init = 'create database if not exists myform'

pwd = os.path.dirname(os.path.relpath(__file__))
sys.path.append(pwd + "../")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testform.settings")

import django
django.setup()

import MySQLdb
db = MySQLdb.connect(host="localhost", user="root", passwd="WGF1234", db="mysql")
db.query(database_init)

# from apps.attendance.models import Person
# from db_tools.data.person_data import persons

# for person in persons:
#     name = person["name"]
#     no = person["no"]
#     # print(name)
#     personObj = Person.objects.get(name=name)
#     personObj.no = no
#     personObj.save()
#     print(personObj.no)

# obj = Person.objects.get(name="于华俊")
# obj.active = False
# obj.save()

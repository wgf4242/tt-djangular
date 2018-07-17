import os, sys, django
from django.db import connection
from django.conf import settings

database_init = 'create database if not exists myform1'
os.environ['DJANGO_SETTINGS_MODULE'] = 'testform.settings'
django.setup()

from django.contrib.auth.models import User
from apps.line.models import LineUser

# user=User.objects.create_user('foo', password='bar')
# user.is_superuser=True
# user.is_staff=True
# user.save()

user_list = [['jiangzg', 'jiangzg56'], ['sunht', 'sunht74'], ['zhuyg', 'zhuyg30'], ['wangz', 'wangz65'], ['duwy', 'duwy07'], ['shangh', 'shangh95'], ['wangt', 'wangt53'], ['wangp', 'wangp61'], ['wenlj', 'wenlj89'], ['yuhj', 'yuhj29'], ['suny', 'suny36'], ['yujd', 'yujd17'], ['xul', 'xul43'], ['wanggf', 'wanggf48'], ['wangyh', 'wangyh27'], ['tangs', 'tangs98'], ['wangfl', 'wangfl42'], ['huangqy', 'huangqy30'], ['panhx', '111111']]

for user,pwd in user_list:
	user, created = User.objects.get_or_create(username=user)
	user.set_password(pwd)
	# user=User.objects.get_or_create(user, password=pwd)
	user.save()


user_name_list = [['jiangzg', '姜泽光'], ['sunht', '孙洪涛'], ['zhuyg', '朱永刚'], ['wangz', '王泽'], ['duwy', '杜文有'], ['shangh', '商贺'], ['wangt', '王涛'], ['wangp', '王鹏'], ['wenlj', '温立君'], ['yuhj', '于华俊'], ['suny', '孙玉'], ['yujd', '于景丹'], ['xul', '许磊'], ['wanggf', '王光夫'], ['wangyh', '王宇航'], ['tangs', '唐硕'], ['wangfl', '王封霖'], ['huangqy', '黄秋远'], ['panhx', '潘洪祥']]
for k,v in user_name_list:
	user = User.objects.get(username=k)
	LineUser.objects.get_or_create(user=user, name=v)

"""testform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import apps.line.views
import apps.attendance.views
from django.views.generic.base import TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/persons/?$', apps.attendance.views.PersonList.as_view(), name='person-list'),
    url(r'^api/months/?$', apps.attendance.views.MonthList.as_view(), name='month-list'),
    url(r'^api/months/(?P<pk>[0-9]+)/?$', apps.attendance.views.MonthDetail.as_view(), name='month-detail'),
    url(r'^api/attends/sum/(?P<month_id>[0-9]+)/?$', apps.attendance.views.AttendSumList.as_view(), name='attend-sum'),
    url(r'^api/attends/(?P<pk>[0-9]+)/?$', apps.attendance.views.AttendDetail.as_view(), name='attend-detail'),
    url(r'^api/attends/', apps.attendance.views.AttendList.as_view(), name='attend-list'),
    url(r'^.*', TemplateView.as_view(template_name="ang_home.html"), name='home'),
]


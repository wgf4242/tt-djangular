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
import apps.attendance.views
import apps.line.views
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

router = DefaultRouter()
router.register(r'lines', apps.line.views.LineList, base_name="line")
router.register(r'defects', apps.line.views.DefectViewSet, base_name="defect")
router.register(r'defects-cat', apps.line.views.DefectCategoryViewSet, base_name="defects-cat")
router.register(r'defects-type', apps.line.views.DefectTypeViewSet, base_name="defects-type")
router.register(r'production-records', apps.line.views.ProductionRecordViewSet, base_name="production-record")
router.register(r'attends', apps.attendance.views.AttendViewSet, base_name="attend")
router.register(r'months', apps.attendance.views.MonthViewSet, base_name="month")
router.register(r'tours', apps.line.views.TourListViewSet, base_name="tour")
router.register(r'facilities', apps.line.views.FacilityViewSet, base_name="facility")
router.register(r'facilities-cat', apps.line.views.FacilityCategoryViewSet, base_name="facility-cat")

urlpatterns = [
    url(r'^api/', include(router.urls, namespace='api')),
    url(r'^docs/', include_docs_urls(title="头台管理系统")),

    url(r'^admin/', admin.site.urls),
    url(r'^api/persons/?$', apps.attendance.views.PersonList.as_view(), name='person-list'),
    url(r'^api/attends/sum/(?P<month_id>[0-9]+)/?$', apps.attendance.views.AttendSumList.as_view(), name='attend-sum'),
    # url(r'^api/tours/(?P<pk>[0-9]+)/?$', apps.line.views.TourDetail.as_view()),
    # url(r'^api/tours/?$', apps.line.views.TourList.as_view()),
    url(r'^api/branches/?$', apps.line.views.BranchList.as_view()),
    # url(r'^api/facilities/?$', apps.line.views.FacilityList.as_view()),
    # url(r'^api/facilitiescat/?$', apps.line.views.FacilityCategoryList.as_view()),

    url(r'^api/authenticate/', obtain_jwt_token),
    url(r'^.*', TemplateView.as_view(template_name="ang_home.html"), name='home'),
]

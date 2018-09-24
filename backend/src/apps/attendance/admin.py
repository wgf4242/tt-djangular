from apps.attendance.models import MonthInfo, Attend, Person
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.shortcuts import render


class AttendAdmin(admin.ModelAdmin):
    actions = ['attend_update_month']

    def attend_update_month(self, request, queryset):
        months = MonthInfo.objects.all()

        if 'apply' in request.POST:
            request_month = request.POST['month']
            m = months.get(id=request_month)
            queryset.update(month=m.id)

            self.message_user(request,
                              "修改选中项目的月份为{}".format(m.monthname))
            return HttpResponseRedirect(request.get_full_path())

        return render(request,
                      'admin/attend_update_month.html',
                      context={
                          'orders': queryset,
                          'items': months
                      })

    attend_update_month.short_description = "批量修改选中项目月份"

    def update_status(self, request, queryset):
        if 'apply' in request.POST:
            self.message_user(request,
                              "Changed status on {} orders".format(queryset.count()))
            return HttpResponseRedirect(request.get_full_path())

        return render(request,
                      'admin/order_intermediate.html',
                      context={'orders': queryset})

    update_status.short_description = "Update status"

    def get_actions(self, request):
        actions = super(AttendAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions


class DeleteNotAllowedModelAdmin(admin.ModelAdmin):
    # Other stuff here
    def get_actions(self, request):
        actions = super(DeleteNotAllowedModelAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions


# class ArticleAdmin(admin.ModelAdmin):
#     # list_display = ['date', 'person', 'month']
#     ordering = ['date']
#     actions = [make_published, export_as_json, export_selected_objects]
#     form = MyInvoiceAdminForm
admin.site.register(Attend, AttendAdmin)
admin.site.register(MonthInfo, DeleteNotAllowedModelAdmin)
admin.site.register(Person, DeleteNotAllowedModelAdmin)

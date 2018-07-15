from apps.attendance.models import MonthInfo, Attend
from django import forms
from django.contrib import admin
from django.core import urlresolvers
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.template.response import TemplateResponse

if MonthInfo.objects.all().count() > 2:
    obj = MonthInfo.objects.all()[:2]
else:
    obj = MonthInfo.objects.all();
name_0 = obj[0].monthname
name_1 = obj[1].monthname


def make_published0(modeladmin, request, queryset):
    queryset.update(month=obj[0].id)


def make_published1(modeladmin, request, queryset):
    queryset.update(month=obj[1].id)


make_published0.short_description = "批量修改为{}".format(name_0)
make_published1.short_description = "批量修改为{}".format(name_1)


class CustomUserChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.monthname


class ItemForm(forms.ModelForm):
    user = CustomUserChoiceField(queryset=MonthInfo.objects.all())

    class Meta:
        model = Attend
        fields = '__all__'


class ArticleAdmin(admin.ModelAdmin):
    # form = ItemForm
    actions = [make_published0, make_published1, 'howmany', 'update_status']

    def get_actions(self, request):
        actions = super().get_actions(request)
        # changelist_url = urlresolvers.reverse('admin:checkout_order_changelist')
        if request.user.username[0].upper() != 'J':
            if 'delete_selected' in actions:
                del actions['delete_selected']
        return actions

    def howmany (modeladmin, request, queryset):
        people = queryset.count()
        # amount_per = [3]
        amount_per = 3
        Amount_of_groups = people/amount_per

        if 'apply' in request.POST:
            form = ItemForm(request.POST)

            if form.is_valid():
                amount_per = form.cleaned_data['amount_per']
                # self.message_user(request, u'You selected - %s' % amount_per)
            return HttpResponseRedirect(request.get_full_path())
        else:
            form = ItemForm()

        return render(request, 'admin/amount_per_form.html', {
            'items': queryset.order_by('pk'),
            'form': form,
            'title': u'Your title'
            })


    def update_status(self, request, queryset):
        months = MonthInfo.objects.all()

        if 'apply' in request.POST:
            queryset.update(status='NEW_STATUS')

            self.message_user(request,
                              "Changed status on {} orders".format(queryset.count()))
            return HttpResponseRedirect(request.get_full_path())

        return render(request,
                      'admin/order_intermediate.html',
                      context={'orders': queryset})

    update_status.short_description = "Update status"



# class ArticleAdmin(admin.ModelAdmin):
#     # list_display = ['date', 'person', 'month']
#     ordering = ['date']
#     actions = [make_published, export_as_json, export_selected_objects]
#     form = MyInvoiceAdminForm


# admin.site.register(Attend)
# admin.site.add_action(make_published)
admin.site.register(Attend, ArticleAdmin)
admin.site.register(MonthInfo)

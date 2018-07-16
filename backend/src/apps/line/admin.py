from apps.line.models import ProductionRecord, LineFault, Tour
from django.contrib import admin

# Register your models here.
admin.site.register(ProductionRecord)
admin.site.register(LineFault)
admin.site.register(Tour)

from django.contrib import admin

from ..models.Company import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    pass

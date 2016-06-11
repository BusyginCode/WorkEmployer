from django.contrib import admin
from main.models import Tip
# Register your models here.

class UserAdmin(admin.ModelAdmin):
	fields = ['username']
admin.site.register(Tip)
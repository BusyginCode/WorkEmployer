from django.contrib import admin
from main.models import Tip, Resume
# Register your models here.

class UserAdmin(admin.ModelAdmin):
	fields = ['username']
admin.site.register(Tip)
admin.site.register(Resume)
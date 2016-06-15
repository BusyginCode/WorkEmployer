from django.db import models
from django.contrib.auth.models import User
from datetime import datetime  

# Create your models here.

class UserProfile(models.Model):
	class Meta():
		db_table='user_profiles'
	user = models.OneToOneField(User,unique=True, null=True)
	description = models.CharField(max_length=10000)

class Tip(models.Model):
	class Meta():
		db_table='tips'
	text = models.TextField()
	title = models.CharField(max_length=1000)
	date = models.DateField()
	image = models.ImageField(upload_to='static/images/tips/')

	def delete(self, *args, **kwargs):
		storage, path = self.image.storage, self.image.path
		super(Tip, self).delete(*args, **kwargs)
		try:
			storage.delete(path)
		except OSError:
			pass

class Resume(models.Model):
	class Meta():
		db_table='resumes'
	resume_user = models.ForeignKey(User)	
	name = models.TextField()
	email = models.CharField(max_length=1000)
	post = models.CharField(max_length=1000)
	phone = models.CharField(max_length=1000)
	about = models.TextField()
	city = models.CharField(max_length=1000)
	education = models.CharField(max_length=1000)
	institution = models.CharField(max_length=1000)
	profession = models.TextField()
	data = models.DateField(auto_now_add=True)
	lastChanges = models.DateField(auto_now=True)

class Skill(models.Model):
	class Meta():
		db_table='skills'
	post = models.CharField(max_length=1000)
	skill_user = models.ForeignKey(User)
	skill = models.CharField(max_length=1000)
	text = models.TextField()

class Company(models.Model):
	class Meta():
		db_table='companies'
	post = models.CharField(max_length=1000)
	skill_user = models.ForeignKey(User)
	company = models.CharField(max_length=1000)
	expirience = models.TextField()
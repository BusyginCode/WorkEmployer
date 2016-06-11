from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'addUser', views.addUser),
	url(r'getMainData', views.getMainData),
	url(r'login', views.login),
	url(r'getUserInfo', views.getUserInfo),
	url(r'addResume', views.addResume),
	url(r'deleteResume', views.deleteResume),
	url(r'editResume', views.editResume),
	url(r'getWorkerInfo', views.getWorkerInfo),
	url(r'getResume', views.getResume),
    url(r'', views.main),
]
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from main.models import UserProfile, Tip, Resume, Skill, Company
from django.shortcuts import render, redirect
from django.contrib import auth
from django.core.mail import send_mail
# Create your views here.
import json
from datetime import datetime
from post_office import mail
def main(request):
	return render(request, 'index.html')

def addUser(request):
	if (request.method == 'POST'):
		login = request.body.decode("utf-8")
		parsed_json = json.loads(login)
		if (not auth.authenticate(username=parsed_json['login'], password=parsed_json['password']) and not User.objects.filter(password=parsed_json['password']).exists() and not User.objects.filter(username=parsed_json['login']).exists() and not User.objects.filter(email=parsed_json['email']).exists()):
			user = User.objects.create_user(parsed_json['login'], parsed_json['email'], parsed_json['password'])
			user.last_name = 0
			if (len(parsed_json['description'])):
				user.last_name = 1
			user.save()
			if (len(parsed_json['description'])):
			 	userProfile = UserProfile.objects.create(description=parsed_json['description'])
			 	userProfile.user_id = User.objects.get(username=parsed_json['login']).id
			 	userProfile.save()
			newuser = auth.authenticate(username=parsed_json['login'], password=parsed_json['password'])
			auth.login(request, newuser)
			return JsonResponse({'success': True, 'userId': user.id, 'worker': user.last_name })
		elif (User.objects.filter(email=parsed_json['email']).exists()):
			return JsonResponse({'errorCode': 1 })
		elif (User.objects.filter(password=parsed_json['password']).exists()):
			return JsonResponse({'errorCode': 2 })
		elif (User.objects.filter(username=parsed_json['login']).exists()):
			return JsonResponse({'errorCode': 3 })
		elif (auth.authenticate(username=parsed_json['login'], password=parsed_json['password'])):
			newuser = auth.authenticate(username=parsed_json['login'], password=parsed_json['password'])
			auth.login(request, newuser)
	else:
		return redirect('/')

def login(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		user = auth.authenticate(username = parsed_json['username'], password = parsed_json['password'])
		if user is not None:
			auth.login(request, user)
			return JsonResponse({'success': True, 'userId': user.id, 'worker': user.last_name })
		else:
			return JsonResponse({'errorCode': 1 })
	else:
		return redirect('/')

def logout(request):
	auth.logout(request)
	return redirect('/')

def getMainData(request):
	developers = User.objects.filter(last_name=0)
	employers = UserProfile.objects.all()
	tips = Tip.objects.all()
	resTips = []
	for tip in tips:
		resTips.append({
			"text": tip.text,
			"title": tip.title,
			"date": tip.date,
			"img": str(tip.image)
		})
	return JsonResponse({ 
		"developers": len(developers), 
		"employers": len(employers) ,
		"tips": resTips,
		"tipsAllCount": len(resTips)
	})

def getUserInfo(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		resumes = Resume.objects.filter(resume_user_id=parsed_json['id'])
		resResumes = []
		for resume in resumes:
			resResumes.append({
				"id": resume.id,
				"name": resume.name,
				"email": resume.email,
				"post": resume.post,
				"phone": resume.phone,
				"about": resume.about,
				"city": resume.phone,
				"education": resume.education,
				"institution": resume.institution,
				"profession": resume.profession,
				"date": resume.data,
				"userId": resume.resume_user_id
			})
		return JsonResponse({ 
			"username": User.objects.get(id = parsed_json['id']).username, 
			"email": User.objects.get(id = parsed_json['id']).email,
			'resumes': resResumes
		})
	else:
		return redirect('/')

def getWorkerInfo(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		resResumes = []
		print(parsed_json['data'])
		if parsed_json['data']:
			resumes = Resume.objects.filter(**parsed_json['data'])
		else:
			resumes = Resume.objects.all() 
		index = 0
		for resume in resumes:
			if index > parsed_json['count']:
				break
			index+=1
			resResumes.append({
				"id": resume.id,
				"name": resume.name,
				"email": resume.email,
				"post": resume.post,
				"phone": resume.phone,
				"about": resume.about,
				"education": resume.education,
				"institution": resume.institution,
				"profession": resume.profession,
				'date': resume.data,
				"userId": resume.resume_user_id
			})
		return JsonResponse({ 
			"username": User.objects.get(id = parsed_json['id']).username, 
			"email": User.objects.get(id = parsed_json['id']).email,
			'description': UserProfile.objects.get(user_id=parsed_json['id']).description,
			'resumes': resResumes,
			'allResumesCount': resumes.count()
		})
	else:
		return redirect('/')
		
def addResume(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		resume = Resume(name=parsed_json['name'], email=parsed_json['email'], post=parsed_json['post'], phone=parsed_json['phone'], about=parsed_json['about'], resume_user_id=parsed_json['id'], city=parsed_json['city'], education=parsed_json['education'], institution=parsed_json['institution'], profession=parsed_json['profession'])
		resume.save()
		for skill in parsed_json['skills']:
			skill = Skill(skill=skill['skill'], text=skill['description'], skill_user_id=parsed_json['id'], post=parsed_json['post'])
			skill.save()
		for company in parsed_json['companies']:
			company = Company(company=company['company'], expirience=company['expirience'], skill_user_id=parsed_json['id'], post=parsed_json['post'], date=company['date'])
			company.save()
	return redirect('/')

def deleteResume(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		Resume.objects.filter(id=parsed_json['id']).delete()
		Skill.objects.filter(post=parsed_json['post'], skill_user_id=parsed_json['userId']).delete()
		Company.objects.filter(post=parsed_json['post'], skill_user_id=parsed_json['userId']).delete()
	return redirect('/')

def editResume(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		resume = Resume.objects.get(id=parsed_json['resumeId'])
		resume.name = parsed_json['data']['name']
		resume.email = parsed_json['data']['email']
		resume.post = parsed_json['data']['post']
		resume.phone = parsed_json['data']['phone']
		resume.about = parsed_json['data']['about']
		resume.education = parsed_json['data']['education']
		resume.institution = parsed_json['data']['institution']
		resume.profession = parsed_json['data']['profession']
		resume.save()
		Skill.objects.filter(post=parsed_json['data']['post'], skill_user_id=parsed_json['data']['id']).delete()
		Company.objects.filter(post=parsed_json['data']['post'], skill_user_id=parsed_json['data']['id']).delete()
		for skill in parsed_json['data']['skills']:
			skill = Skill(skill=skill['skill'], text=skill['description'], skill_user_id=parsed_json['data']['id'], post=parsed_json['data']['post'])
			skill.save()
		for company in parsed_json['data']['companies']:
			company = Company(company=company['company'], expirience=company['expirience'], skill_user_id=parsed_json['data']['id'], post=parsed_json['data']['post'], date=company['date'])
			company.save()
	return redirect('/')

def getResume(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		resume = Resume.objects.get(id=parsed_json['id']).id
		skills = Skill.objects.filter(post=Resume.objects.get(id=parsed_json['id']).post, skill_user_id=parsed_json['userId'])
		companies = Company.objects.filter(post=Resume.objects.get(id=parsed_json['id']).post, skill_user_id=parsed_json['userId'])
		resSkills = []
		resCompanies = []
		for skill in skills:
			resSkills.append({
				'skill': skill.skill,
				'description': skill.text
			})
		for company in companies:
			resCompanies.append({
				'company': company.company,
				'expirience': company.expirience,
				'date': company.date
			})
		return JsonResponse({
			'name': Resume.objects.get(id=parsed_json['id']).name,
	        'email': Resume.objects.get(id=parsed_json['id']).email,
	        'post': Resume.objects.get(id=parsed_json['id']).post,
	        'phone': Resume.objects.get(id=parsed_json['id']).phone,
	        'about': Resume.objects.get(id=parsed_json['id']).about,
	        'education': Resume.objects.get(id=parsed_json['id']).education,
			'institution': Resume.objects.get(id=parsed_json['id']).institution,
			'profession': Resume.objects.get(id=parsed_json['id']).profession,
	        'skills': resSkills,
	        'city': Resume.objects.get(id=parsed_json['id']).city,
	        "companies": resCompanies
		})
	else:
		return redirect('/')

def getResumes(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		if parsed_json["samples"]:
			resumes = Resume.objects.filter(resume_user_id=24)
		else:
			resumes = Resume.objects.all()
		resResumes = []
		index = 0
		for resume in resumes:
			if (index >= parsed_json["count"]):
				break
			resResumes.append({
				'post': resume.post,
				"id": resume.id,
				"userId": resume.resume_user_id,
				"date": resume.data
			})
			index+=1
		return JsonResponse({
			"resumes": resResumes,
			'allResumesCount': resumes.count()
		})
	else:
		return redirect('/')

def sendFeedback(request):
	if (request.method == 'POST'):
		parsed_json = json.loads(request.body.decode("utf-8"))
		description = UserProfile.objects.get(user_id=parsed_json['id']).description
		mail.send(
		    parsed_json['email'], # List of email addresses also accepted
		    'busygin576@gmail.com',
		    subject=parsed_json['subject'],
		    message=description + "\n" + parsed_json['message'],
		    priority='now'
		)
		return JsonResponse({ 'success': 1 })
	else:
		return redirect('/')


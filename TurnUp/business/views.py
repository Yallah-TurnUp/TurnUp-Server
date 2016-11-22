from django.shortcuts import render
import json
from django.http import HttpResponseRedirect, HttpResponse


# Business index
def index(request):
    context = {}
    return render(request, 'business/index.html', context)

def food(request):
    context = {}
    return render(request, 'business/food.html', context)

def invitation(request):
    context = {}
    return render(request, 'business/invitation.html', context)

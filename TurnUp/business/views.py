from django.shortcuts import render
import json
from firebase import firebase
import os
from TurnUp.settings import BASE_DIR

with open(os.path.join(BASE_DIR, 'TurnUp/auth.json')) as auth_file:
    auth_info = json.loads(auth_file.read())
    firebase_secret = auth_info.get('firebase_secret')
    firebase_user= auth_info.get('firebase_user')
    firebase_url= auth_info.get('firebase_url')
    admin_uid = auth_info.get('admin_uid')

# Business index
def index(request):
    context = {}
    return render(request, 'business/index.html', context)

def food(request):
    context = {}
    return render(request, 'business/food.html', context)

def rsvp(request):
    context = {}
    rsvp_data = json.loads(request.body)
    u = rsvp_data.get('u')
    e = rsvp_data.get('e')
    i = rsvp_data.get('i')
    if not (u and e and i):
        return render(request, 'business/index.html', context)

    attending = rsvp_data.get('attending')
    common_availability = rsvp_data.get('commonAvailability')

    auth = firebase.FirebaseAuthentication(firebase_secret,
                                           firebase_user, extra={'uid': admin_uid})
    fb = firebase.FirebaseApplication(firebase_url, authentication=auth)
    invitee = fb.get('/events/%s/%s/invitees' % (u, e), i)
    if invitee:
        fb.patch('/events/%s/%s/invitees/%s' % (u, e, i), {'attending': attending, 'commonAvailability': common_availability})
    return render(request, 'business/index.html', context)

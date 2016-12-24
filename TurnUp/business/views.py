from django.shortcuts import render
import json
from firebase import firebase
import os
from TurnUp.settings import BASE_DIR
from django.views.decorators.csrf import csrf_exempt

with open(os.path.join(BASE_DIR, 'TurnUp/auth.json')) as auth_file:
    auth_info = json.loads(auth_file.read())
    firebase_secret = auth_info.get('firebase_secret')
    firebase_user= auth_info.get('firebase_user')
    firebase_url= auth_info.get('firebase_url')
    admin_uid = auth_info.get('admin_uid')

auth = firebase.FirebaseAuthentication(firebase_secret,
                                       firebase_user, extra={'uid': admin_uid})
fb = firebase.FirebaseApplication(firebase_url, authentication=auth)

# Business index
def index(request):
    id = request.GET.get('id')
    if not id:
        return render(request, 'business/invitation.html', context)
    shortcut_target = fb.get('/shortcutMap', id)
    u = shortcut_target.get('u')
    e = shortcut_target.get('e')
    if not (u and e):
        return render(request, 'business/invitation.html', context)
    event = fb.get('/events/%s' % u, e)
    type = event.get('type')
    dates = event.get('dates')
    context = dict(dates=dates)
    if type == 'FOOD':
        return render(request, 'business/food.html', context)
    elif type == 'BUSINESS':
        return render(request, 'business/index.html', context)
    else:
        return render(request, 'business/invitation.html', context)


def food(request):
    context = {}
    return render(request, 'business/food.html', context)


def invitation(request):
    context = {}
    return render(request, 'business/invitation.html', context)


def business(request):
    context = {}
    return render(request, 'business/index.html', context)


def rsvp(request):
    context = {}
    rsvp_data = json.loads(request.body)
    id = rsvp_data.get('id')
    if not id:
        return render(request, 'business/index.html', context)
    shortcut_target = fb.get('/shortcutMap', id)
    u = shortcut_target.get('u')
    e = shortcut_target.get('e')
    i = shortcut_target.get('i')
    if not (u and e and i):
        return render(request, 'business/index.html', context)

    attending = rsvp_data.get('attending')
    common_availability = rsvp_data.get('commonAvailability')

    invitee = fb.get('/events/%s/%s/invitees' % (u, e), i)
    if invitee:
        fb.patch('/events/%s/%s/invitees/%s' % (u, e, i), {'attending': attending, 'commonAvailability': common_availability})
    return render(request, 'business/index.html', context)

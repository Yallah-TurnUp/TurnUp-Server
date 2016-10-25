from django.shortcuts import render
import json
from django.http import HttpResponseRedirect, HttpResponse


# Business index
def index(request):
    context = {}
    return render(request, 'business/index.html', context)


# Contact us page
def contact_link(request):
    result = True

    your_name = request.POST.get('your_name', '')
    email = request.POST.get('email', '')
    comment = request.POST.get('comment', '')

    body_html = ("New business inquiry was received.<br /><br />"
                 "Customer name: " + your_name + ".<br /><br />"
                 "Customer email: " + email + ".<br /><br />"
                 "Message: " + comment + ".<br /><br />")

    body_text = body_html.replace('<br />', '\n')

    from_address = [SITE_NAME, EMAIL_SUPPORT]
    recipient = ['Flytrex Corp', EMAIL_CORP]
    subject = "New business inquiry"

    # send_email(subject, from_address, recipient, body_text, body_html)

    # Prepare json result
    json_results = {
        'result': result,
    }
    return HttpResponse(json.dumps(json_results), content_type="application/json")


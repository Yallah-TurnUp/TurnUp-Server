function showContactLoading() {

    $('#ContactUsForm').hide();
    $('#loading').show();
}

function submitContactUs(csrf_token) {

    showContactLoading();

    var fd = new FormData();
    fd.append("your_name", $('#your_name').val());
    fd.append("email", $('#contact_email').val());
    fd.append("comment", $('#comment').val());
    fd.append("csrfmiddlewaretoken", csrf_token);

    $.ajax({
        url: '/business/contact-link/',
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: fd,
        success: function (result) {

            $('#loading').hide();
            $('#form_complete').show();

            // Show form back again after delay
            setTimeout(function () {
                var form = document.getElementById("ContactUsForm");
                form.reset();
                $('#form_complete').hide();
                $('#ContactUsForm').show();
            }, 8500);
        }
    });

    return false;
}

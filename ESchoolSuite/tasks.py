from __future__ import absolute_import, unicode_literals
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from students.models import AdmissionApplication
from django.utils.html import strip_tags
from django.template.loader import render_to_string

@shared_task
def send_application_submitted_email(application_id):
    try:
        application = AdmissionApplication.objects.get(pk=application_id)

        # Customize the email subject and body as needed
        subject = 'Your Application Has Been Submitted'

        # Render the HTML version of the email
        html_message = render_to_string('students/application_submitted_email.html', {'application': application})
        # Create a plain text version for email clients that don't support HTML
        plain_message = strip_tags(html_message)

        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,  # Use the DEFAULT_FROM_EMAIL from settings
            [application.email],
            fail_silently=False,
            html_message=html_message
        )

        print(f"Application submitted email sent successfully for application ID: {application_id}")

    except AdmissionApplication.DoesNotExist:
        print(f"Application with ID {application_id} does not exist.")
    except Exception as e:
        print(f"Error sending email for application {application_id}: {e}")
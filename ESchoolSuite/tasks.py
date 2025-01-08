from __future__ import absolute_import, unicode_literals
from time import sleep
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
import requests
from students.models import AdmissionApplication, Student
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
        

# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_bulk_email_task(subject, message_body, from_email, recipient_list):
    try:
        send_mail(
            subject=subject,
            message=message_body,
            from_email=from_email,
            recipient_list=recipient_list,
            fail_silently=False,
        )
        return "success"  # Indicate successful sending
    except Exception as e:
        return f"failed: {str(e)}"  # Indicate failure
    


@shared_task
def send_bulk_sms_task(api_key, sender_id, message_body, recipients):
    """
    Sends bulk SMS messages using Arkesel's API with rate limiting.

    Args:
        api_key: Your Arkesel API key.
        sender_id: Your Arkesel sender ID.
        message_body: The message content.
        recipients: A list of recipient phone numbers.
    """
    url = "https://sms.arkesel.com/v2/sms/send"
    headers = {'api-key': api_key}

    # Arkesel API rate limit: 100 messages per minute (adjust if needed)
    rate_limit = 100
    delay = 60 / rate_limit  # Delay in seconds between messages

    for recipient_chunk in chunks(recipients, rate_limit):
        for recipient in recipient_chunk:
            payload = {
                'sender': sender_id,
                'message': message_body,
                'recipients': [recipient]
            }
            try:
                response = requests.post(url, headers=headers, json=payload)
                response.raise_for_status()  # Raise an exception for bad status codes

                # Check for successful response from Arkesel
                if response.json()['status'] == 'success':
                    print(f"SMS sent to {recipient}")
                else:
                    print(f"Failed to send SMS to {recipient}: {response.json()}")

            except requests.exceptions.RequestException as e:
                print(f"Error sending SMS to {recipient}: {e}")
            except (KeyError, ValueError):
                print(f"Error sending SMS to {recipient}: Invalid response format")

            sleep(delay)  # Delay to respect rate limit

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]
        
        

@shared_task
def send_report_card_sms_task(student_id, report_card_url):
    """Sends a report card link to the parent via SMS."""
    try:
        student = Student.objects.get(pk=student_id)
        parent_phone_number = student.parent.phone_number  # Get parent's phone number
    except Student.DoesNotExist:
        print(f"Error: Student with ID {student_id} not found.")
        return
    except Exception as e:
        print(f"Error getting parent details for student ID {student_id}: {e}")
        return

    if not parent_phone_number:
        print(f"Error: No parent phone number found for student ID {student_id}")
        return

    api_key = settings.ARKESEL_API_KEY
    sender_id = settings.ARKESEL_SENDER_ID
    message = f"Dear Parent, your child's report card is ready. Download it here: {report_card_url}"

    url = "https://sms.arkesel.com/v2/sms/send"
    headers = {'api-key': api_key}
    payload = {
        'sender': sender_id,
        'message': message,
        'recipients': [parent_phone_number]
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()

        if response.json()['status'] == 'success':
            print(f"Report card SMS sent to {parent_phone_number}")
        else:
            print(f"Failed to send report card SMS to {parent_phone_number}: {response.json()}")

    except requests.exceptions.RequestException as e:
        print(f"Error sending SMS to {parent_phone_number}: {e}")
    except (KeyError, ValueError):
        print(f"Error sending SMS to {parent_phone_number}: Invalid response format")
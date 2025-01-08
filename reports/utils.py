# reports/utils.py
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, Table, TableStyle, Spacer
from reportlab.lib import colors
import os
from django.conf import settings

def generate_report_card_pdf(student, term, academic_year):
    """
    Generates a PDF report card for a student.

    Args:
        student: The Student object.
        term: The term (e.g., "Term 1", "Term 2").
        academic_year: The academic year (e.g., "2023-2024").

    Returns:
        The path to the generated PDF file.
    """

    # Create a unique filename for the report card
    file_name = f"report_card_{student.student_id}_{term}_{academic_year}.pdf"
    file_path = os.path.join(settings.MEDIA_ROOT, 'report_cards', file_name)

     # Ensure the directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # Create a new PDF document
    c = canvas.Canvas(file_path, pagesize=letter)

    # Set up styles
    styles = getSampleStyleSheet()
    normal_style = styles['Normal']
    heading_style = styles['Heading1']
    heading_style.alignment = 1  # Center align
    table_style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ])

    # Title
    title = Paragraph("ESchoolSuite Report Card", heading_style)
    title.wrapOn(c, 400, 100)
    title.drawOn(c, 100, 750)

    c.setFont("Helvetica", 12)
    c.drawString(100, 700, f"Name: {student.first_name} {student.last_name}")
    c.drawString(100, 680, f"Student ID: {student.student_id}")
    c.drawString(100, 660, f"Term: {term}")
    c.drawString(100, 640, f"Academic Year: {academic_year}")

    # Add some space before the table
    spacer = Spacer(1, 36)
    spacer.wrapOn(c, 400, 100)
    spacer.drawOn(c, 100, 604)

    # Fetch and display grades
    grades = student.grades.filter(course__classes__academic_year=academic_year)
    if grades.exists():
        data = [["Course Name", "Final Grade", "Letter Grade"]]
        for grade in grades:
            data.append([
                grade.course.name,
                str(grade.final_grade),
                grade.letter_grade
            ])

        table = Table(data)
        table.setStyle(table_style)
        table.wrapOn(c, 400, 600)
        table.drawOn(c, 100, 450)
    else:
        c.drawString(100, 500, "No grades available for this term.")

    # Save the PDF
    c.save()

    return file_path
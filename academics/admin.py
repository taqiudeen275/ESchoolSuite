from django.contrib import admin
from .models import Course, Class, Enrollment, Attendance, Grade, GradingScale, GradeComponent, Score

# Register your models here.
admin.site.site_header = "ESchoolSuite Admin"
admin.site.site_title = "ESchoolSuite Admin Portal"
admin.site.index_title = "Welcome to ESchoolSuite Portal"

@admin.register(GradingScale)
class GradingScaleAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'is_active')
    list_filter = ('level', 'is_active')
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(GradeComponent)
class GradeComponentAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'component_type', 'max_score', 'weight', 'grading_scale')
    list_filter = ('course', 'component_type')
    search_fields = ('name', 'course__name')

@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
    list_display = ('student', 'component', 'score', 'date')
    list_filter = ('component__course', 'component__component_type')
    search_fields = ('student__first_name', 'student__last_name', 'component__name')

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'final_grade', 'letter_grade', 'date')
    list_filter = ('course__level', 'grading_scale')
    search_fields = ('student__first_name', 'student__last_name', 'course__name')
    readonly_fields = ('final_grade', 'letter_grade', 'date')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'level', 'credit_hours', 'grading_scale')
    list_filter = ('level', 'grading_scale')
    search_fields = ('name', 'code')

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'academic_year', 'class_teacher', 'start_time', 'end_time', 'room')
    list_filter = ('academic_year', 'class_teacher')
    search_fields = ('name', 'academic_year', 'class_teacher__first_name', 'class_teacher__last_name', 'room')
    filter_horizontal = ('courses',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'class_enrolled', 'enrollment_date')
    list_filter = ('course', 'class_enrolled')
    search_fields = ('student__first_name', 'student__last_name', 'course__name')

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'class_session', 'date', 'status', 'remark')
    list_filter = ('status', 'date')
    search_fields = ('student__first_name', 'student__last_name', 'class_session__name', 'remark')
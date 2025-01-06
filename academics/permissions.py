from rest_framework import permissions
from academics.models import Enrollment
from users.models import User


class IsStudentEnrolled(permissions.BasePermission):
    """
    Custom permission to only allow students enrolled in a course to access its details.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.user.role == User.Role.STUDENT:
            # Check if the student is enrolled in the course related to the object
            if isinstance(obj, Enrollment):
                return obj.student.user == request.user
            # Add other checks for related models if needed
        return False
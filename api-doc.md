## API Documentation

### `users` app

**Authentication and User Management**

*   **`POST /api/users/login/`**

    *   **Description:** Obtains a JWT access and refresh token pair for a user.
    *   **Use Case:** User login functionality on the frontend.
    *   **Request Body:**

        ```json
        {
            "username": "user's username",
            "password": "user's password"
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "refresh": "refresh_token_string",
            "access": "access_token_string"
        }
        ```

*   **`POST /api/users/login/refresh/`**

    *   **Description:** Refreshes an access token using a valid refresh token.
    *   **Use Case:** Used to maintain user sessions without requiring them to log in frequently.
    *   **Request Body:**

        ```json
        {
            "refresh": "refresh_token_string"
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "access": "new_access_token_string"
        }
        ```

*   **`POST /api/users/register/`**

    *   **Description:** Registers a new user.
    *   **Use Case:** User registration functionality on the frontend.
    *   **Request Body:**

        ```json
        {
            "username": "new_user's_username",
            "email": "new_user's_email",
            "role": "new_user's_role",  // (e.g., "STUDENT", "TEACHER", "PARENT", etc.)
            "first_name": "new_user's_first_name",
            "last_name": "new_user's_last_name",
            "password": "new_user's_password",
            "confirm_password": "new_user's_password"
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": user_id,
            "username": "new_user's_username",
            "email": "new_user's_email",
            // ... other user details
        }
        ```

*   **`POST /api/users/logout/`**

    *   **Description:** Logs out a user by blacklisting the provided refresh token.
    *   **Use Case:** User logout functionality on the frontend.
    *   **Request Body:**

        ```json
        {
            "refresh_token": "refresh_token_to_blacklist"
        }
        ```

    *   **Response (205 Reset Content):** (Indicates successful logout)

*   **`GET /api/users/`**

    *   **Description:** Lists all users.
    *   **Use Case:** Admin functionality to manage users (view all users).
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": user_id,
                "username": "user's_username",
                "email": "user's_email",
                // ... other user details
            },
            // ... more users
        ]
        ```

*   **`GET /api/users/<int:pk>/`**

    *   **Description:** Retrieves a specific user by ID.
    *   **Use Case:** Admin functionality to view user details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        {
            "id": user_id,
            "username": "user's_username",
            "email": "user's_email",
            // ... other user details
        }
        ```

*   **`PUT /api/users/<int:pk>/`**

    *   **Description:** Updates a specific user by ID.
    *   **Use Case:** Admin functionality to edit user details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to user creation, but fields are optional)

        ```json
        {
            "username": "updated_username",
            "email": "updated_email",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": user_id,
            "username": "updated_username",
            "email": "updated_email",
            // ... updated user details
        }
        ```

*   **`PATCH /api/users/<int:pk>/`**

    *   **Description:** Partially updates a specific user by ID.
    *   **Use Case:** Admin functionality to edit specific user details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/users/<int:pk>/`**

    *   **Description:** Deletes a specific user by ID.
    *   **Use Case:** Admin functionality to remove users.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

*   **`GET /api/users/me/`**

    *   **Description:** Retrieves the profile of the currently authenticated user.
    *   **Use Case:** Used on the frontend to display the logged-in user's profile information.
    *   **Permissions:** Authenticated users.
    *   **Response (200 OK):**

        ```json
        {
            "id": user_id,
            "username": "user's_username",
            "email": "user's_email",
            "role": "user's_role",
            // ... other user details, including nested profile data if requested
        }
        ```

*   **`PATCH /api/users/me/`**

    *   **Description:** Updates the profile of the currently authenticated user.
    *   **Use Case:** Used on the frontend to allow users to edit their own profile information.
    *   **Permissions:** Authenticated users (can only update their own profile).
    *   **Request Body:**

        ```json
        {
            "first_name": "New First Name",
            "last_name": "New Last Name",
            // ... other fields to update (except "role")
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": user_id,
            "username": "user's_username",
            // ... updated profile details
        }
        ```

**Parent Management**

*   **`GET /api/users/parents/`**

    *   **Description:** Lists all parents.
    *   **Use Case:** Admin functionality to manage parents (view all parents).
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": parent_id,
                // ... parent details
            },
            // ... more parents
        ]
        ```

*   **`POST /api/users/parents/`**

    *   **Description:** Creates a new parent.
    *   **Use Case:** Admin functionality to add new parents.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            // ... parent details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": parent_id,
            // ... created parent details
        }
        ```

*   **`GET /api/users/parents/<int:pk>/`**

    *   **Description:** Retrieves a specific parent by ID.
    *   **Use Case:** Admin functionality to view parent details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        {
            "id": parent_id,
            // ... parent details
        }
        ```

*   **`PUT /api/users/parents/<int:pk>/`**

    *   **Description:** Updates a specific parent by ID.
    *   **Use Case:** Admin functionality to edit parent details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            // ... fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": parent_id,
            // ... updated parent details
        }
        ```

*   **`PATCH /api/users/parents/<int:pk>/`**

    *   **Description:** Partially updates a specific parent by ID.
    *   **Use Case:** Admin functionality to edit specific parent details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/users/parents/<int:pk>/`**

    *   **Description:** Deletes a specific parent by ID.
    *   **Use Case:** Admin functionality to remove parents.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Password Reset**

*   **`POST /api/users/password-reset/`**

    *   **Description:** Initiates a password reset request. Sends a password reset email to the specified email address.
    *   **Use Case:** "Forgot password" functionality on the frontend.
    *   **Request Body:**

        ```json
        {
            "email": "user's_email"
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "detail": "Password reset email sent."
        }
        ```

*   **`POST /api/users/password-reset/confirm/<str:uid>/<str:token>/`**

    *   **Description:** Confirms a password reset using a unique user ID (`uid`) and a one-time `token`.
    *   **Use Case:** Completing the password reset process after clicking the link in the reset email.
    *   **Request Body:**

        ```json
        {
            "new_password": "user's_new_password"
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "detail": "Password has been reset successfully."
        }
        ```

**Parent Portal (Children Information)**

*   **`GET /api/users/parent/children/`**

    *   **Description:** Lists all children associated with the logged-in parent.
    *   **Use Case:** Parent Portal - displaying a list of the parent's children.
    *   **Permissions:** Parent only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": student_id,
                "first_name": "Child's First Name",
                "last_name": "Child's Last Name",
                // ... other basic student information
            },
            // ... more children
        ]
        ```

*   **`GET /api/users/parent/children/<int:pk>/`**

    *   **Description:** Retrieves details of a specific child associated with the logged-in parent.
    *   **Use Case:** Parent Portal - viewing detailed information for a selected child.
    *   **Permissions:** Parent only (can only access their own children's information).
    *   **Response (200 OK):**

        ```json
        {
            "id": student_id,
            "first_name": "Child's First Name",
            "last_name": "Child's Last Name",
            // ... other student details
        }
        ```

*   **`GET /api/users/parent/children/<int:student_id>/enrollments/`**

    *   **Description:** Lists enrollments for a specific child of the logged-in parent.
    *   **Use Case:** Parent Portal - viewing a child's enrolled courses.
    *   **Permissions:** Parent only (can only access their own children's information).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": enrollment_id,
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "class_enrolled": {
                    "id": class_id,
                    "name": "Class Name"
                },
                // ... other enrollment details
            },
            // ... more enrollments
        ]
        ```

*   **`GET /api/users/parent/children/<int:student_id>/grades/`**

    *   **Description:** Lists grades for a specific child of the logged-in parent.
    *   **Use Case:** Parent Portal - viewing a child's grades.
    *   **Permissions:** Parent only (can only access their own children's information).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": grade_id,
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "final_grade": 85.5,
                "letter_grade": "A",
                // ... other grade details
            },
            // ... more grades
        ]
        ```

*   **`GET /api/users/parent/children/<int:student_id>/attendance/`**

    *   **Description:** Lists attendance records for a specific child of the logged-in parent.
    *   **Use Case:** Parent Portal - viewing a child's attendance.
    *   **Permissions:** Parent only (can only access their own children's information).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": attendance_id,
                "class_session": {
                    "id": class_id,
                    "name": "Class Name"
                },
                "date": "2023-12-18",
                "status": "PRESENT",
                // ... other attendance details
            },
            // ... more attendance records
        ]
        ```

*   **`GET /api/users/parent/children/<int:student_id>/assignments/`**

    *   **Description:** Lists assignments for a specific child of the logged-in parent.
    *   **Use Case:** Parent Portal - viewing a child's assignments.
    *   **Permissions:** Parent only (can only access their own children's information).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": assignment_id,
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "title": "Assignment Title",
                "due_date": "2023-12-31",
                // ... other assignment details
            },
            // ... more assignments
        ]
        ```

*   **`GET /api/users/parent/children/<int:student_id>/classes/`**

    *   **Description:** Lists classes for a specific child of the logged-in parent.
    *   **Use Case:** Parent Portal - viewing a child's class schedule.
    *   **Permissions:** Parent only (can only access their own children's information).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": class_id,
                "name": "Class Name",
                "academic_year": "2023/2024",
                // ... other class details
            },
            // ... more classes
        ]
        ```

### `students` app

**Student Management**

*   **`GET /api/students/`**

    *   **Description:** Lists all students.
    *   **Use Case:** Admin functionality to manage students (view all students).
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": student_id,
                "first_name": "Student's First Name",
                "last_name": "Student's Last Name",
                // ... other student details
            },
            // ... more students
        ]
        ```

*   **`POST /api/students/`**

    *   **Description:** Creates a new student.
    *   **Use Case:** Admin functionality to add new students.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "first_name": "New Student's First Name",
            "last_name": "New Student's Last Name",
            // ... other student details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": student_id,
            "first_name": "New Student's First Name",
            // ... other student details
        }
        ```

*   **`GET /api/students/<int:pk>/`**

    *   **Description:** Retrieves a specific student by ID.
    *   **Use Case:** Admin functionality to view student details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        {
            "id": student_id,
            "first_name": "Student's First Name",
            "last_name": "Student's Last Name",
            // ... other student details
        }
        ```

*   **`PUT /api/students/<int:pk>/`**

    *   **Description:** Updates a specific student by ID.
    *   **Use Case:** Admin functionality to edit student details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "first_name": "Updated First Name",
            "last_name": "Updated Last Name",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": student_id,
            "first_name": "Updated First Name",
            // ... updated student details
        }
        ```

*   **`PATCH /api/students/<int:pk>/`**

    *   **Description:** Partially updates a specific student by ID.
    *   **Use Case:** Admin functionality to edit specific student details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/students/<int:pk>/`**

    *   **Description:** Deletes a specific student by ID.
    *   **Use Case:** Admin functionality to remove students.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Admission Applications**

*   **`GET /api/students/applications/`**

    *   **Description:** Lists all admission applications.
    *   **Use Case:** Admin functionality to review admission applications. Also used in the frontend for listing applications
    *   **Permissions:** Admin only, anyone can list.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": application_id,
                "first_name": "Applicant's First Name",
                "last_name": "Applicant's Last Name",
                "program_of_study": "Applied Program",
                "status": "PENDING",
                // ... other application details
            },
            // ... more applications
        ]
        ```

*   **`POST /api/students/applications/`**

    *   **Description:** Creates a new admission application.
    *   **Use Case:** Frontend functionality for submitting admission applications.
    *   **Permissions:** Anyone can create
    *   **Request Body:**

        ```json
        {
            "first_name": "Applicant's First Name",
            "last_name": "Applicant's Last Name",
            "email": "Applicant's Email",
            // ... other application details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": application_id,
            "first_name": "Applicant's First Name",
            // ... other application details
        }
        ```

*   **`GET /api/students/applications/<int:pk>/`**

    *   **Description:** Retrieves a specific admission application by ID.
    *   **Use Case:** Admin functionality to view application details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        {
            "id": application_id,
            "first_name": "Applicant's First Name",
            "last_name": "Applicant's Last Name",
            "program_of_study": "Applied Program",
            "status": "PENDING",
            // ... other application details
        }
        ```

*   **`PUT /api/students/applications/<int:pk>/`**

    *   **Description:** Updates a specific admission application by ID.
    *   **Use Case:** Admin functionality to update application details (e.g., change status).
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "status": "ACCEPTED", // Or "REJECTED"
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": application_id,
            "first_name": "Applicant's First Name",
            // ... updated application details
        }
        ```

*   **`PATCH /api/students/applications/<int:pk>/`**

    *   **Description:** Partially updates a specific admission application by ID.
    *   **Use Case:** Admin functionality to update specific application details (e.g., change status).
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/students/applications/<int:pk>/`**

    *   **Description:** Deletes a specific admission application by ID.
    *   **Use Case:** Admin functionality to remove applications.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

### `staff` app

**Staff Management**

*   **`GET /api/staff/`**

    *   **Description:** Lists all staff members.
    *   **Use Case:** Admin functionality to manage staff (view all staff).
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": staff_id,
                "first_name": "Staff's First Name",
                "last_name": "Staff's Last Name",
                // ... other staff details
            },
            // ... more staff members
        ]
        ```

*   **`POST /api/staff/`**

    *   **Description:** Creates a new staff member.
    *   **Use Case:** Admin functionality to add new staff.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "first_name": "New Staff's First Name",
            "last_name": "New Staff's Last Name",
            // ... other staff details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": staff_id,
            "first_name": "New Staff's First Name",
            // ... other staff details
        }
        ```

*   **`GET /api/staff/<int:pk>/`**

    *   **Description:** Retrieves a specific staff member by ID.
    *   **Use Case:** Admin functionality to view staff details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        {
            "id": staff_id,
            "first_name": "Staff's First Name",
            "last_name": "Staff's Last Name",
            // ... other staff details
        }
        ```

*   **`PUT /api/staff/<int:pk>/`**

    *   **Description:** Updates a specific staff member by ID.
    *   **Use Case:** Admin functionality to edit staff details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "first_name": "Updated First Name",
            "last_name": "Updated Last Name",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": staff_id,
            "first_name": "Updated First Name",
            // ... updated staff details
        }
        ```

*   **`PATCH /api/staff/<int:pk>/`**

    *   **Description:** Partially updates a specific staff member by ID.
    *   **Use Case:** Admin functionality to edit specific staff details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/staff/<int:pk>/`**

    *   **Description:** Deletes a specific staff member by ID.
    *   **Use Case:** Admin functionality to remove staff members.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Payroll Management**

*   **`GET /api/staff/payroll/`**

    *   **Description:** Lists all payroll records.
    *   **Use Case:** Admin functionality to view payroll history.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": payroll_id,
                "staff": {
                    "id": staff_id,
                    "first_name": "Staff's First Name",
                    // ... other staff details
                },
                "start_date": "2023-12-01",
                "end_date": "2023-12-31",
                "net_pay": 2500.00,
                // ... other payroll details
            },
            // ... more payroll records
        ]
        ```

*   **`POST /api/staff/payroll/`**

    *   **Description:** Creates a new payroll record.
    *   **Use Case:** Admin functionality to generate payroll.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "staff": staff_id,
            "start_date": "2023-12-01",
            "end_date": "2023-12-31",
            "basic_salary": 3000.00,
            "allowances": 200.00,
            "deductions": 100.00,
            "payment_date": "2023-12-15",
            "status": "Pending",
            "notes": "December payroll"
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": payroll_id,
            "staff": {
                "id": staff_id,
                "first_name": "Staff's First Name",
                // ... other staff details
            },
            "start_date": "2023-12-01",
            // ... other payroll details (including calculated net_pay)
        }
        ```

*   **`GET /api/staff/payroll/<int:pk>/`**

    *   **Description:** Retrieves a specific payroll record by ID.
    *   **Use Case:** Admin functionality to view payroll details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):** (Similar to the response in `POST /api/staff/payroll/`)

*   **`PUT /api/staff/payroll/<int:pk>/`**

    *   **Description:** Updates a specific payroll record by ID.
    *   **Use Case:** Admin functionality to edit payroll details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to POST request body, but fields are optional)

    *   **Response (200 OK):** (Similar to the response in `POST /api/staff/payroll/`, but with updated values)

*   **`PATCH /api/staff/payroll/<int:pk>/`**

    *   **Description:** Partially updates a specific payroll record by ID.
    *   **Use Case:** Admin functionality to edit specific payroll details (e.g., change status to "Paid").
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/staff/payroll/<int:pk>/`**

    *   **Description:** Deletes a specific payroll record by ID.
    *   **Use Case:** Admin functionality to remove payroll records.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

### `academics` app

**Course Management**

*   **`GET /api/academics/courses/`**

    *   **Description:** Lists all courses.
    *   **Use Case:** Admin, Teachers, or any authenticated user functionality to view available courses.
    *   **Permissions:** Admin, teacher, parent, student (read-only).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": course_id,
                "name": "Course Name",
                "code": "COURSE101",
                // ... other course details
            },
            // ... more courses
        ]
        ```

*   **`POST /api/academics/courses/`**

    *   **Description:** Creates a new course.
    *   **Use Case:** Admin functionality to add new courses.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "New Course Name",
            "code": "NEWCOURSE101",
            // ... other course details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": course_id,
            "name": "New Course Name",
            // ... other course details
        }
        ```

*   **`GET /api/academics/courses/<int:pk>/`**

    *   **Description:** Retrieves a specific course by ID.
    *   **Use Case:** Admin or any authenticated functionality to view course details.
    *   **Permissions:** Admin, teacher, parent, student (read-only).
    *   **Response (200 OK):**

        ```json
        {
            "id": course_id,
            "name": "Course Name",
            "code": "COURSE101",
            // ... other course details
        }
        ```

*   **`PUT /api/academics/courses/<int:pk>/`**

    *   **Description:** Updates a specific course by ID.
    *   **Use Case:** Admin functionality to edit course details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "Updated Course Name",
            "code": "UPDATEDCODE101",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": course_id,
            "name": "Updated Course Name",
            // ... updated course details
        }
        ```

*   **`PATCH /api/academics/courses/<int:pk>/`**

    *   **Description:** Partially updates a specific course by ID.
    *   **Use Case:** Admin functionality to edit specific course details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/courses/<int:pk>/`**

    *   **Description:** Deletes a specific course by ID.
    *   **Use Case:** Admin functionality to remove courses.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Class Management**

*   **`GET /api/academics/classes/`**

    *   **Description:** Lists all classes.
    *   **Use Case:** Admin or any authenticated user functionality to view available classes.
    *   **Permissions:** Admin, teacher, parent, student (read-only).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": class_id,
                "name": "Class Name",
                "academic_year": "2023/2024",
                // ... other class details
            },
            // ... more classes
        ]
        ```

*   **`POST /api/academics/classes/`**

    *   **Description:** Creates a new class.
    *   **Use Case:** Admin functionality to add new classes.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "New Class Name",
            "academic_year": "2023/2024",
            // ... other class details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": class_id,
            "name": "New Class Name",
            // ... other class details
        }
        ```

*   **`GET /api/academics/classes/<int:pk>/`**

    *   **Description:** Retrieves a specific class by ID.
    *   **Use Case:** Admin or any authenticated user functionality to view class details.
    *   **Permissions:** Admin, teacher, parent, student (read-only).
    *   **Response (200 OK):**

        ```json
        {
            "id": class_id,
            "name": "Class Name",
            "academic_year": "2023/2024",
            // ... other class details
        }
        ```

*   **`PUT /api/academics/classes/<int:pk>/`**

    *   **Description:** Updates a specific class by ID.
    *   **Use Case:** Admin functionality to edit class details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "Updated Class Name",
            "academic_year": "2024/2025",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": class_id,
            "name": "Updated Class Name",
            // ... updated class details
        }
        ```

*   **`PATCH /api/academics/classes/<int:pk>/`**

    *   **Description:** Partially updates a specific class by ID.
    *   **Use Case:** Admin functionality to edit specific class details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/classes/<int:pk>/`**

    *   **Description:** Deletes a specific class by ID.
    *   **Use Case:** Admin functionality to remove classes.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Enrollment Management**

*   **`GET /api/academics/enrollments/`**

    *   **Description:** Lists all enrollments.
    *   **Use Case:** Admin functionality to view all enrollments.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": enrollment_id,
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "class_enrolled": {
                    "id": class_id,
                    "name": "Class Name"
                },
                "enrollment_date": "2023-12-18"
            },
            // ... more enrollments
        ]
        ```

*   **`POST /api/academics/enrollments/`**

    *   **Description:** Creates a new enrollment.
    *   **Use Case:** Admin functionality to enroll students in courses and classes.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "student": student_id,
            "course": course_id,
            "class_enrolled": class_id
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": enrollment_id,
            "student": student_id,
            "course": course_id,
            "class_enrolled": class_id,
            "enrollment_date": "2023-12-18"
        }
        ```

*   **`GET /api/academics/enrollments/<int:pk>/`**

    *   **Description:** Retrieves a specific enrollment by ID.
    *   **Use Case:** Admin functionality to view enrollment details.
    *   **Permissions:** Admin or student (own enrollment only).
    *   **Response (200 OK):** (Similar to the response in `POST /api/academics/enrollments/`)

*   **`DELETE /api/academics/enrollments/<int:pk>/`**

    *   **Description:** Deletes a specific enrollment by ID.
    *   **Use Case:** Admin functionality to remove enrollments.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Student Self-Enrollment**

*   **`GET /api/academics/student/enrollments/`**

    *   **Description:** Lists the current student's enrollments.
    *   **Use Case:** Student Portal - viewing enrolled courses.
    *   **Permissions:** Student only (can only view their own enrollments).
    *   **Response (200 OK):** (Similar to `GET /api/academics/enrollments/`, but filtered for the logged-in student)

*   **`POST /api/academics/student/enrollments/`**

    *   **Description:** Enrolls the current student in a course and class.
    *   **Use Case:** Student Portal - self-enrollment functionality.
    *   **Permissions:** Student only.
    *   **Request Body:**

        ```json
        {
            "course": course_id,
            "class_enrolled": class_id
        }
        ```

    *   **Response (201 Created):** (Similar to `POST /api/academics/enrollments/`, but with student details inferred)

*   **`GET /api/academics/student/enrollments/<int:pk>/`**

    *   **Description:** Retrieves a specific enrollment for the current student.
    *   **Use Case:** Student Portal - viewing enrollment details.
    *   **Permissions:** Student only (can only view their own enrollments).
    *   **Response (200 OK):** (Similar to `GET /api/academics/enrollments/<int:pk>/`, but filtered for the logged-in student)

*   **`DELETE /api/academics/student/enrollments/<int:pk>/`**

    *   **Description:** Unenrolls the current student from a course.
    *   **Use Case:** Student Portal - self-unenrollment functionality.
    *   **Permissions:** Student only (can only unenroll from their own enrollments).
    *   **Response (204 No Content):** (Indicates successful unenrollment)

*   **`GET /api/academics/courses/available/`**

    *   **Description:** Lists all courses with available slots in at least one class.
    *   **Use Case:** Student Portal - browsing available courses for enrollment.
    *   **Permissions:** Authenticated users.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": course_id,
                "name": "Course Name",
                "code": "COURSE101",
                // ... other course details
            },
            // ... more courses
        ]
        ```

**Attendance Tracking**

*   **`GET /api/academics/attendance/teacher/`**

    *   **Description:** Lists attendance records for the current teacher's classes for the current day.
    *   **Use Case:** Teacher Portal - viewing attendance records for today.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": attendance_id,
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "class_session": {
                    "id": class_id,
                    "name": "Class Name"
                },
                "date": "2023-12-18",
                "status": "PRESENT",
                // ... other attendance details
            },
            // ... more attendance records
        ]
        ```

*   **`POST /api/academics/attendance/teacher/`**

    *   **Description:** Creates attendance records for a class.
    *   **Use Case:** Teacher Portal - taking attendance.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        [
            {
                "student": student_id,
                "class_session": class_id,
                "date": "2023-12-18",
                "status": "PRESENT",
                "remark": "remark"
            }
        ]
        ```

    *   **Response (201 Created):** (Similar to GET response, but for the newly created records)

*   **`GET /api/academics/attendance/student/`**

    *   **Description:** Lists the current student's attendance records.
    *   **Use Case:** Student Portal - viewing attendance.
    *   **Permissions:** Student only.
    *   **Response (200 OK):** (Similar to `GET /api/academics/attendance/teacher/`, but filtered for the logged-in student)

*   **`GET /api/academics/attendance/parent/`**

    *   **Description:** Lists attendance records for the parent's children.
    *   **Use Case:** Parent Portal - viewing children's attendance.
    *   **Permissions:** Parent only.
    *   **Response (200 OK):** (Similar to `GET /api/academics/attendance/teacher/`, but filtered for the parent's children)

**Grading System**

*   **`GET /api/academics/grades/teacher/`**

    *   **Description:** Lists grades for the current teacher's courses.
    *   **Use Case:** Teacher Portal - viewing grades.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": grade_id,
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "final_grade": 85.5,
                "letter_grade": "A",
                // ... other grade details
            },
            // ... more grades
        ]
        ```

*   **`POST /api/academics/grades/teacher/`**

    *   **Description:** Creates a grade for a student in a course.
    *   **Use Case:** Teacher Portal - entering grades.
    *   **Permissions:** Teacher only.
    *   **Request Body:**
        ```json
        {
            "student": student_id,
            "course": course_id,
            "grading_scale": grading_scale_id
        }
        ```
    *   **Response (201 Created):** (Similar to GET response, but for the newly created grade)

*   **`GET /api/academics/grades/student/`**

    *   **Description:** Lists the current student's grades.
    *   **Use Case:** Student Portal - viewing grades.
    *   **Permissions:** Student only.
    *   **Response (200 OK):** (Similar to `GET /api/academics/grades/teacher/`, but filtered for the logged-in student)

*   **`GET /api/academics/grades/parent/`**

    *   **Description:** Lists grades for the parent's children.
    *   **Use Case:** Parent Portal - viewing children's grades.
    *   **Permissions:** Parent only.
    *   **Response (200 OK):** (Similar to `GET /api/academics/grades/teacher/`, but filtered for the parent's children)

*   **`GET /api/academics/grading-scales/`**

    *   **Description:** Lists all grading scales.
    *   **Use Case:** Admin functionality to manage grading scales.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": grading_scale_id,
                "name": "BECE",
                "level": "JHS",
                "grades": {"1": "Excellent", "2": "Very Good", ...}
            },
            // ... more grading scales
        ]
        ```

*   **`POST /api/academics/grading-scales/`**

    *   **Description:** Creates a new grading scale.
    *   **Use Case:** Admin functionality to add new grading scales.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "New Grading Scale",
            "level": "UNIVERSITY",
            "grades": {"4.0": "A", "3.7": "A-", ...}
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": grading_scale_id,
            "name": "New Grading Scale",
            // ... other grading scale details
        }
        ```

*   **`GET /api/academics/grading-scales/<int:pk>/`**

    *   **Description:** Retrieves a specific grading scale by ID.
    *   **Use Case:** Admin functionality to view grading scale details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        {
            "id": grading_scale_id,
            "name": "BECE",
            "level": "JHS",
            "grades": {"1": "Excellent", "2": "Very Good", ...}
        }
        ```

*   **`PUT /api/academics/grading-scales/<int:pk>/`**

    *   **Description:** Updates a specific grading scale by ID.
    *   **Use Case:** Admin functionality to edit grading scale details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "Updated Grading Scale",
            "level": "SHS",
            "grades": {"A1": "Excellent", "B2": "Very Good", ...}
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": grading_scale_id,
            "name": "Updated Grading Scale",
            // ... updated grading scale details
        }
        ```

*   **`PATCH /api/academics/grading-scales/<int:pk>/`**

    *   **Description:** Partially updates a specific grading scale by ID.
    *   **Use Case:** Admin functionality to edit specific grading scale details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/grading-scales/<int:pk>/`**

    *   **Description:** Deletes a specific grading scale by ID.
    *   **Use Case:** Admin functionality to remove grading scales.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

*   **`GET /api/academics/grade-components/`**

    *   **Description:** Lists all grade components.
    *   **Use Case:** Teacher functionality to view grade components for their courses.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": component_id,
                "name": "Quiz 1",
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "component_type": "QUIZ",
                "max_score": 20.0,
                "weight": 0.1
            },
            // ... more grade components
        ]
        ```

*   **`POST /api/academics/grade-components/`**

    *   **Description:** Creates a new grade component.
    *   **Use Case:** Teacher functionality to add grade components to their courses.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "name": "Mid-Semester Exam",
            "course": course_id,
            "component_type": "MIDSEM",
            "max_score": 50.0,
            "weight": 0.3,
            "grading_scale": grading_scale_id
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": component_id,
            "name": "Mid-Semester Exam",
            // ... other grade component details
        }
        ```

*   **`GET /api/academics/grade-components/<int:pk>/`**

    *   **Description:** Retrieves a specific grade component by ID.
    *   **Use Case:** Teacher functionality to view grade component details.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        {
            "id": component_id,
            "name": "Quiz 1",
            "course": {
                "id": course_id,
                "name": "Course Name"
            },
            "component_type": "QUIZ",
            "max_score": 20.0,
            "weight": 0.1,
            "grading_scale": grading_scale_id
        }
        ```

*   **`PUT /api/academics/grade-components/<int:pk>/`**

    *   **Description:** Updates a specific grade component by ID.
    *   **Use Case:** Teacher functionality to edit grade component details.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "name": "Updated Quiz 1",
            "max_score": 25.0,
            "weight": 0.15
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": component_id,
            "name": "Updated Quiz 1",
            // ... updated grade component details
        }
        ```

*   **`PATCH /api/academics/grade-components/<int:pk>/`**

    *   **Description:** Partially updates a specific grade component by ID.
    *   **Use Case:** Teacher functionality to edit specific grade component details.
    *   **Permissions:** Teacher only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/grade-components/<int:pk>/`**

    *   **Description:** Deletes a specific grade component by ID.
    *   **Use Case:** Teacher functionality to remove grade components.
    *   **Permissions:** Teacher only.
    *   **Response (204 No Content):** (Indicates successful deletion)

*   **`GET /api/academics/scores/`**

    *   **Description:** Lists all scores.
    *   **Use Case:** Teacher functionality to view scores for their courses.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": score_id,
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "component": {
                    "id": component_id,
                    "name": "Quiz 1"
                },
                "score": 18.0
            },
            // ... more scores
        ]
        ```

*   **`POST /api/academics/scores/`**

    *   **Description:** Creates a new score for a student in a grade component.
    *   **Use Case:** Teacher functionality to enter student scores.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "student": student_id,
            "component": component_id,
            "score": 19.5
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": score_id,
            "student": student_id,
            "component": component_id,
            "score": 19.5,
            // ... other score details
        }
        ```

*   **`GET /api/academics/scores/<int:pk>/`**

    *   **Description:** Retrieves a specific score by ID.
    *   **Use Case:** Teacher functionality to view score details.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        {
            "id": score_id,
            "student": {
                "id": student_id,
                "first_name": "Student's First Name",
                // ... other student details
            },
            "component": {
                "id": component_id,
                "name": "Quiz 1"
            },
            "score": 18.0
        }
        ```

*   **`PUT /api/academics/scores/<int:pk>/`**

    *   **Description:** Updates a specific score by ID.
    *   **Use Case:** Teacher functionality to edit scores.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "score": 17.5
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": score_id,
            "student": student_id,
            "component": component_id,
            "score": 17.5,
            // ... updated score details
        }
        ```

*   **`PATCH /api/academics/scores/<int:pk>/`**

    *   **Description:** Partially updates a specific score by ID.
    *   **Use Case:** Teacher functionality to edit specific score details.
    *   **Permissions:** Teacher only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/scores/<int:pk>/`**

    *   **Description:** Deletes a specific score by ID.
    *   **Use Case:** Teacher functionality to remove scores.
    *   **Permissions:** Teacher only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Teacher Tools**

*   **`GET /api/academics/lesson-plans/teacher/`**

    *   **Description:** Lists all lesson plans for the current teacher.
    *   **Use Case:** Teacher Portal - viewing lesson plans.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": lesson_plan_id,
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "title": "Lesson Plan Title",
                "date": "2023-12-18",
                // ... other lesson plan details
            },
            // ... more lesson plans
        ]
        ```

*   **`POST /api/academics/lesson-plans/teacher/`**

    *   **Description:** Creates a new lesson plan for the current teacher.
    *   **Use Case:** Teacher Portal - creating lesson plans.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "course": course_id,
            "title": "New Lesson Plan Title",
            "content": "Lesson plan content...",
            "date": "2023-12-20",
            "start_time": "09:00:00",
            "end_time": "10:00:00",
            "class_taught": class_id,
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": lesson_plan_id,
            "course": course_id,
            "title": "New Lesson Plan Title",
            // ... other lesson plan details
        }
        ```

*   **`GET /api/academics/lesson-plans/teacher/<int:pk>/`**

    *   **Description:** Retrieves a specific lesson plan for the current teacher.
    *   **Use Case:** Teacher Portal - viewing lesson plan details.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        {
            "id": lesson_plan_id,
            "course": {
                "id": course_id,
                "name": "Course Name"
            },
            "title": "Lesson Plan Title",
            "content": "Lesson plan content...",
            "date": "2023-12-18",
            // ... other lesson plan details
        }
        ```

*   **`PUT /api/academics/lesson-plans/teacher/<int:pk>/`**

    *   **Description:** Updates a specific lesson plan for the current teacher.
    *   **Use Case:** Teacher Portal - editing lesson plans.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "title": "Updated Lesson Plan Title",
            "content": "Updated lesson plan content...",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": lesson_plan_id,
            "course": course_id,
            "title": "Updated Lesson Plan Title",
            // ... updated lesson plan details
        }
        ```

*   **`PATCH /api/academics/lesson-plans/teacher/<int:pk>/`**

    *   **Description:** Partially updates a specific lesson plan for the current teacher.
    *   **Use Case:** Teacher Portal - editing specific lesson plan details.
    *   **Permissions:** Teacher only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/lesson-plans/teacher/<int:pk>/`**

    *   **Description:** Deletes a specific lesson plan for the current teacher.
    *   **Use Case:** Teacher Portal - deleting lesson plans.
    *   **Permissions:** Teacher only.
    *   **Response (204 No Content):** (Indicates successful deletion)

*   **`GET /api/academics/assignments/teacher/`**

    *   **Description:** Lists all assignments for the current teacher.
    *   **Use Case:** Teacher Portal - viewing assignments.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": assignment_id,
                "course": {
                    "id": course_id,
                    "name": "Course Name"
                },
                "title": "Assignment Title",
                "due_date": "2023-12-31",
                // ... other assignment details
            },
            // ... more assignments
        ]
        ```

*   **`POST /api/academics/assignments/teacher/`**

    *   **Description:** Creates a new assignment for the current teacher.
    *   **Use Case:** Teacher Portal - creating assignments.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "course": course_id,
            "title": "New Assignment Title",
            "description": "Assignment description...",
            "due_date": "2024-01-15",
            "max_score": 100.0,
            "class_assigned": class_id,
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": assignment_id,
            "course": course_id,
            "title": "New Assignment Title",
            // ... other assignment details
        }
        ```

*   **`GET /api/academics/assignments/teacher/<int:pk>/`**

    *   **Description:** Retrieves a specific assignment for the current teacher.
    *   **Use Case:** Teacher Portal - viewing assignment details.
    *   **Permissions:** Teacher only.
    *   **Response (200 OK):**

        ```json
        {
            "id": assignment_id,
            "course": {
                "id": course_id,
                "name": "Course Name"
            },
            "title": "Assignment Title",
            "description": "Assignment description...",
            "due_date": "2023-12-31",
            // ... other assignment details
        }
        ```

*   **`PUT /api/academics/assignments/teacher/<int:pk>/`**

    *   **Description:** Updates a specific assignment for the current teacher.
    *   **Use Case:** Teacher Portal - editing assignments.
    *   **Permissions:** Teacher only.
    *   **Request Body:**

        ```json
        {
            "title": "Updated Assignment Title",
            "description": "Updated assignment description...",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": assignment_id,
            "course": course_id,
            "title": "Updated Assignment Title",
            // ... updated assignment details
        }
        ```

*   **`PATCH /api/academics/assignments/teacher/<int:pk>/`**

    *   **Description:** Partially updates a specific assignment for the current teacher.
    *   **Use Case:** Teacher Portal - editing specific assignment details.
    *   **Permissions:** Teacher only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/academics/assignments/teacher/<int:pk>/`**

    *   **Description:** Deletes a specific assignment for the current teacher.
    *   **Use Case:** Teacher Portal - deleting assignments.
    *   **Permissions:** Teacher only.
    *   **Response (204 No Content):** (Indicates successful deletion)

### `communications` app

**Parent-Teacher Communication**

*   **`GET /api/communications/messages/`**

    *   **Description:** Lists messages for the current user (parent or teacher).
    *   **Use Case:** Parent/Teacher Portals - viewing messages.
    *   **Permissions:** Authenticated users (Parent or Teacher).
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": message_id,
                "sender": {
                    "id": user_id,
                    "first_name": "Sender's First Name",
                    "last_name": "Sender's Last Name"
                },
                "recipient": {
                    "id": user_id,
                    "first_name": "Recipient's First Name",
                    "last_name": "Recipient's Last Name"
                },
                "subject": "Message Subject",
                "body": "Message body...",
                "timestamp": "2023-12-18T10:00:00Z",
                "is_read": false,
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                }
            },
            // ... more messages
        ]
        ```

*   **`POST /api/communications/messages/`**

    *   **Description:** Creates a new message.
    *   **Use Case:** Parent/Teacher Portals - sending messages.
    *   **Permissions:** Authenticated users (Parent or Teacher).
    *   **Request Body:**

        ```json
        {
            "recipient": recipient_user_id,
            "subject": "Message Subject",
            "body": "Message body...",
            "student": student_id // Optional: Only required if the message is about a specific student
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": message_id,
            "sender": user_id, // ID of the current user
            "recipient": recipient_user_id,
            "subject": "Message Subject",
            // ... other message details
        }
        ```

*   **`GET /api/communications/messages/<int:pk>/`**

    *   **Description:** Retrieves a specific message by ID.
    *   **Use Case:** Parent/Teacher Portals - viewing message details.
    *   **Permissions:** Authenticated users (Parent or Teacher, sender or recipient of the message).
    *   **Response (200 OK):** (Similar to the response in `GET /api/communications/messages/`)

*   **`PATCH /api/communications/messages/<int:pk>/`**

    *   **Description:** Partially updates a specific message by ID (e.g., marks it as read).
    *   **Use Case:** Parent/Teacher Portals - marking messages as read.
    *   **Permissions:** Authenticated users (Parent or Teacher, only the recipient of the message can update it).
    *   **Request Body:**

        ```json
        {
            "is_read": true
        }
        ```

    *   **Response (200 OK):** (Similar to the response in `GET /api/communications/messages/`, but with updated `is_read` status)

*   **`DELETE /api/communications/messages/<int:pk>/`**

    *   **Description:** Deletes a specific message by ID.
    *   **Use Case:** Parent/Teacher Portals - deleting messages (only the sender can delete).
    *   **Permissions:** Authenticated users (Parent or Teacher, only the sender of the message can delete it).
    *   **Response (204 No Content):** (Indicates successful deletion)

### `counselors` app

**Counselor Portal**

*   **`GET /api/counselors/students/`**

    *   **Description:** Lists all students.
    *   **Use Case:** Counselor Portal - viewing a list of all students.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": student_id,
                "user": {
                    "id": user_id,
                    "first_name": "Student's First Name",
                    "last_name": "Student's Last Name",
                    // ... other user details
                }
            },
            // ... more students
        ]
        ```

*   **`GET /api/counselors/students/<int:pk>/`**

    *   **Description:** Retrieves a specific student's basic information.
    *   **Use Case:** Counselor Portal - viewing student details.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):**

        ```json
        {
            "id": student_id,
            "user": {
                "id": user_id,
                "first_name": "Student's First Name",
                "last_name": "Student's Last Name",
                // ... other user details
            }
        }
        ```

*   **`GET /api/counselors/sessions/`**

    *   **Description:** Lists all counseling sessions for the current counselor.
    *   **Use Case:** Counselor Portal - viewing past counseling sessions.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": session_id,
                "student": {
                    "id": student_id,
                    "user": {
                        "id": user_id,
                        "first_name": "Student's First Name",
                        // ... other student details
                    }
                },
                "session_date": "2023-12-18T14:00:00Z",
                "notes": "Session notes...",
                "summary": "Session summary...",
                "is_confidential": true
            },
            // ... more sessions
        ]
        ```

*   **`POST /api/counselors/sessions/`**

    *   **Description:** Creates a new counseling session.
    *   **Use Case:** Counselor Portal - adding notes from a counseling session.
    *   **Permissions:** Counselor only.
    *   **Request Body:**

        ```json
        {
            "student": student_id,
            "session_date": "2023-12-18T14:00:00Z",
            "notes": "Detailed session notes...",
            "summary": "Session summary...",
            "is_confidential": true
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": session_id,
            "student": student_id,
            "session_date": "2023-12-18T14:00:00Z",
            // ... other session details
        }
        ```

*   **`GET /api/counselors/sessions/<int:pk>/`**

    *   **Description:** Retrieves a specific counseling session by ID.
    *   **Use Case:** Counselor Portal - viewing session details.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):** (Similar to the response in `GET /api/counselors/sessions/`)

*   **`PATCH /api/counselors/sessions/<int:pk>/`**

    *   **Description:** Partially updates a specific counseling session by ID.
    *   **Use Case:** Counselor Portal - editing session notes or summary.
    *   **Permissions:** Counselor only.
    *   **Request Body:** (Similar to POST request body, but fields are optional)

    *   **Response (200 OK):** (Similar to the response in `GET /api/counselors/sessions/`, but with updated values)

*   **`DELETE /api/counselors/sessions/<int:pk>/`**

    *   **Description:** Deletes a specific counseling session by ID.
    *   **Use Case:** Counselor Portal - removing sessions.
    *   **Permissions:** Counselor only.
    *   **Response (204 No Content):** (Indicates successful deletion)

### `fees` app

**Fee Management**

*   **`GET /api/fees/fees/`**

    *   **Description:** Lists all fees.
    *   **Use Case:** Admin functionality to view all fees.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": fee_id,
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "name": "Tuition Fee",
                "amount": 1000.00,
                "due_date": "2024-01-31"
            },
            // ... more fees
        ]
        ```

*   **`POST /api/fees/fees/`**

    *   **Description:** Creates a new fee.
    *   **Use Case:** Admin functionality to add new fees.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "student": student_id,
            "name": "Book Fee",
            "description": "Fee for course textbooks",
            "amount": 150.00,
            "due_date": "2024-01-15"
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": fee_id,
            "student": student_id,
            "name": "Book Fee",
            // ... other fee details
        }
        ```

*   **`GET /api/fees/fees/<int:pk>/`**

    *   **Description:** Retrieves a specific fee by ID.
    *   **Use Case:** Admin functionality to view fee details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):** (Similar to the response in `POST /api/fees/fees/`)

*   **`PUT /api/fees/fees/<int:pk>/`**

    *   **Description:** Updates a specific fee by ID.
    *   **Use Case:** Admin functionality to edit fee details.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "name": "Updated Fee Name",
            "amount": 1200.00,
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": fee_id,
            "name": "Updated Fee Name",
            // ... updated fee details
        }
        ```

*   **`PATCH /api/fees/fees/<int:pk>/`**

    *   **Description:** Partially updates a specific fee by ID.
    *   **Use Case:** Admin functionality to edit specific fee details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/fees/fees/<int:pk>/`**

    *   **Description:** Deletes a specific fee by ID.
    *   **Use Case:** Admin functionality to remove fees.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Payment Management**

*   **`GET /api/fees/payments/`**

    *   **Description:** Lists all payments.
    *   **Use Case:** Admin functionality to view all payments.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": payment_id,
                "fee": {
                    "id": fee_id,
                    "name": "Tuition Fee"
                },
                "amount_paid": 500.00,
                "payment_date": "2023-12-15",
                "status": "Completed"
            },
            // ... more payments
        ]
        ```

*   **`POST /api/fees/payments/`**

    *   **Description:** Creates a new payment.
    *   **Use Case:** Admin functionality to record payments.
    *   **Permissions:** Admin only.
    *   **Request Body:**

        ```json
        {
            "fee": fee_id,
            "amount_paid": 500.00,
            "payment_date": "2023-12-15",
            "transaction_id": "TXN12345",
            "payment_method": "Credit Card",
            "status": "Completed"
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": payment_id,
            "fee": fee_id,
            "amount_paid": 500.00,
            // ... other payment details
        }
        ```

*   **`GET /api/fees/payments/<int:pk>/`**

    *   **Description:** Retrieves a specific payment by ID.
    *   **Use Case:** Admin functionality to view payment details.
    *   **Permissions:** Admin only.
    *   **Response (200 OK):** (Similar to the response in `POST /api/fees/payments/`)

*   **`PUT /api/fees/payments/<int:pk>/`**

    *   **Description:** Updates a specific payment by ID.
    *   **Use Case:** Admin functionality to edit payment details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to POST request body, but fields are optional)

    *   **Response (200 OK):** (Similar to the response in `POST /api/fees/payments/`, but with updated values)

*   **`PATCH /api/fees/payments/<int:pk>/`**

    *   **Description:** Partially updates a specific payment by ID.
    *   **Use Case:** Admin functionality to edit specific payment details.
    *   **Permissions:** Admin only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/fees/payments/<int:pk>/`**

    *   **Description:** Deletes a specific payment by ID.
    *   **Use Case:** Admin functionality to remove payments.
    *   **Permissions:** Admin only.
    *   **Response (204 No Content):** (Indicates successful deletion)

**Parent Portal - Payment History and Unpaid Fees**

*   **`GET /api/fees/parent/payments/`**

    *   **Description:** Retrieves the payment history for the logged-in parent.
    *   **Use Case:** Parent Portal - viewing payment history.
    *   **Permissions:** Parent only.
    *   **Response (200 OK):** (Similar to `GET /api/fees/payments/`, but filtered for the parent's children)

*   **`GET /api/users/parent/children/<int:student_id>/fees/unpaid-fees/`**

    *   **Description:** Retrieves the unpaid fees for a specific child of the logged-in parent.
    *   **Use Case:** Parent Portal - viewing unpaid fees.
    *   **Permissions:** Parent only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": fee_id,
                "name": "Tuition Fee",
                "amount": 500.00, // Remaining amount after partial payments
                "due_date": "2024-01-31"
            },
            // ... more unpaid fees
        ]
        ```

### `librarians` app

**Librarian Portal**

*   **`GET /api/librarians/books/`**

    *   **Description:** Lists all books.
    *   **Use Case:** Librarian Portal - viewing all books.
    *   **Permissions:** Librarian only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": book_id,
                "title": "Book Title",
                "author": "Author Name",
                "copies_available": 5,
                "total_copies": 10,
                // ... other book details
            },
            // ... more books
        ]
        ```

*   **`POST /api/librarians/books/`**

    *   **Description:** Creates a new book.
    *   **Use Case:** Librarian Portal - adding new books.
    *   **Permissions:** Librarian only.
    *   **Request Body:**

        ```json
        {
            "title": "New Book Title",
            "author": "Author Name",
            "isbn": "1234567890",
            "copies_available": 10,
            "total_copies": 10
            // ... other book details
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": book_id,
            "title": "New Book Title",
            // ... other book details
        }
        ```

*   **`GET /api/librarians/books/<int:pk>/`**

    *   **Description:** Retrieves a specific book by ID.
    *   **Use Case:** Librarian Portal - viewing book details.
    *   **Permissions:** Librarian only.
    *   **Response (200 OK):**

        ```json
        {
            "id": book_id,
            "title": "Book Title",
            "author": "Author Name",
            "copies_available": 5,
            "total_copies": 10,
            // ... other book details
        }
        ```

*   **`PUT /api/librarians/books/<int:pk>/`**

    *   **Description:** Updates a specific book by ID.
    *   **Use Case:** Librarian Portal - editing book details.
    *   **Permissions:** Librarian only.
    *   **Request Body:**

        ```json
        {
            "title": "Updated Book Title",
            "author": "Updated Author Name",
            // ... other fields to update
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": book_id,
            "title": "Updated Book Title",
            // ... updated book details
        }
        ```

*   **`PATCH /api/librarians/books/<int:pk>/`**

    *   **Description:** Partially updates a specific book by ID.
    *   **Use Case:** Librarian Portal - editing specific book details.
    *   **Permissions:** Librarian only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

*   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/librarians/books/<int:pk>/`**

    *   **Description:** Deletes a specific book by ID.
    *   **Use Case:** Librarian Portal - removing books.
    *   **Permissions:** Librarian only.
    *   **Response (204 No Content):** (Indicates successful deletion)

*   **`GET /api/librarians/borrowing-records/`**

    *   **Description:** Lists all borrowing records.
    *   **Use Case:** Librarian Portal - viewing all borrowing records.
    *   **Permissions:** Librarian only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": borrowing_record_id,
                "book": {
                    "id": book_id,
                    "title": "Book Title"
                },
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "borrow_date": "2023-12-01",
                "due_date": "2023-12-15",
                "return_date": null,
                "status": "Borrowed"
            },
            // ... more borrowing records
        ]
        ```

*   **`POST /api/librarians/borrowing-records/`**

    *   **Description:** Creates a new borrowing record.
    *   **Use Case:** Librarian Portal - recording book borrowing.
    *   **Permissions:** Librarian only.
    *   **Request Body:**

        ```json
        {
            "book": book_id,
            "student": student_id,
            "due_date": "2024-01-15"
        }
        ```

    *   **Response (201 Created):**

        ```json
        {
            "id": borrowing_record_id,
            "book": book_id,
            "student": student_id,
            "borrow_date": "2023-12-18",
            // ... other borrowing record details
        }
        ```

*   **`GET /api/librarians/borrowing-records/<int:pk>/`**

    *   **Description:** Retrieves a specific borrowing record by ID.
    *   **Use Case:** Librarian Portal - viewing borrowing record details.
    *   **Permissions:** Librarian only.
    *   **Response (200 OK):** (Similar to the response in `POST /api/librarians/borrowing-records/`)

*   **`PUT /api/librarians/borrowing-records/<int:pk>/`**

    *   **Description:** Updates a specific borrowing record by ID.
    *   **Use Case:** Librarian Portal - editing borrowing record details (e.g., marking a book as returned).
    *   **Permissions:** Librarian only.
    *   **Request Body:**

        ```json
        {
            "return_date": "2023-12-14"
        }
        ```

    *   **Response (200 OK):**

        ```json
        {
            "id": borrowing_record_id,
            "book": book_id,
            "student": student_id,
            // ... other borrowing record details (including updated return_date and status)
        }
        ```

*   **`PATCH /api/librarians/borrowing-records/<int:pk>/`**

    *   **Description:** Partially updates a specific borrowing record by ID.
    *   **Use Case:** Librarian Portal - editing specific borrowing record details (e.g., marking a book as returned).
    *   **Permissions:** Librarian only.
    *   **Request Body:** (Similar to PUT, but fields are optional)

    *   **Response (200 OK):** (Similar to PUT response)

*   **`DELETE /api/librarians/borrowing-records/<int:pk>/`**

    *   **Description:** Deletes a specific borrowing record by ID.
    *   **Use Case:** Librarian Portal - removing borrowing records.
    *   **Permissions:** Librarian only.
    *   **Response (204 No Content):** (Indicates successful deletion)

*   **`GET /api/librarians/overdue-books/`**

    *   **Description:** Lists all overdue books.
    *   **Use Case:** Librarian Portal - viewing overdue books.
    *   **Permissions:** Librarian only.
    *   **Response (200 OK):**

        ```json
        [
            {
                "id": borrowing_record_id,
                "book": {
                    "id": book_id,
                    "title": "Book Title"
                },
                "student": {
                    "id": student_id,
                    "first_name": "Student's First Name",
                    // ... other student details
                },
                "borrow_date": "2023-11-15",
                "due_date": "2023-12-01",
                "return_date": null,
                "status": "Overdue"
            },
            // ... more overdue books
        ]
        ```

### `accountants` app

**Accountant Portal**

*   **`GET /api/accountants/fees/`**

    *   **Description:** Lists all fees.
    *   **Use Case:** Accountant Portal - viewing all fees.
    *   **Permissions:** Accountant only.
    *   **Response (200 OK):** (Same as `GET /api/fees/fees/` but accessible to Accountants)

*   **`GET /api/accountants/fees/<int:pk>/`**

    *   **Description:** Retrieves a specific fee by ID.
    *   **Use Case:** Accountant Portal - viewing fee details.
    *   **Permissions:** Accountant only.
    *   **Response (200 OK):** (Same as `GET /api/fees/fees/<int:pk>/` but accessible to Accountants)

*   **`GET /api/accountants/payments/`**

    *   **Description:** Lists all payments.
    *   **Use Case:** Accountant Portal - viewing all payments.
    *   **Permissions:** Accountant only.
    *   **Response (200 OK):** (Same as `GET /api/fees/payments/` but accessible to Accountants)

*   **`GET /api/accountants/payments/<int:pk>/`**

    *   **Description:** Retrieves a specific payment by ID.
    *   **Use Case:** Accountant Portal - viewing payment details.
    *   **Permissions:** Accountant only.
    *   **Response (200 OK):** (Same as `GET /api/fees/payments/<int:pk>/` but accessible to Accountants)

### `counselors` app

**Counselor Portal**

*   **`GET /api/counselors/students/`**

    *   **Description:** Lists all students.
    *   **Use Case:** Counselor Portal - viewing a list of all students.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):** (Same as in the Counselor Portal description above)

*   **`GET /api/counselors/students/<int:pk>/`**

    *   **Description:** Retrieves a specific student's basic information.
    *   **Use Case:** Counselor Portal - viewing student details.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):** (Same as in the Counselor Portal description above)

*   **`GET /api/counselors/sessions/`**

    *   **Description:** Lists all counseling sessions for the current counselor.
    *   **Use Case:** Counselor Portal - viewing past counseling sessions.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):** (Same as in the Counselor Portal description above)

*   **`POST /api/counselors/sessions/`**

    *   **Description:** Creates a new counseling session.
    *   **Use Case:** Counselor Portal - adding notes from a counseling session.
    *   **Permissions:** Counselor only.
    *   **Request Body:** (Same as in the Counselor Portal description above)

    *   **Response (201 Created):** (Same as in the Counselor Portal description above)

*   **`GET /api/counselors/sessions/<int:pk>/`**

    *   **Description:** Retrieves a specific counseling session by ID.
    *   **Use Case:** Counselor Portal - viewing session details.
    *   **Permissions:** Counselor only.
    *   **Response (200 OK):** (Same as in the Counselor Portal description above)

*   **`PATCH /api/counselors/sessions/<int:pk>/`**

    *   **Description:** Partially updates a specific counseling session by ID.
    *   **Use Case:** Counselor Portal - editing session notes or summary.
    *   **Permissions:** Counselor only.
    *   **Request Body:** (Similar to POST request body, but fields are optional)

    *   **Response (200 OK):** (Similar to GET response, but with updated values)

*   **`DELETE /api/counselors/sessions/<int:pk>/`**

    *   **Description:** Deletes a specific counseling session by ID.
    *   **Use Case:** Counselor Portal - removing sessions.
    *   **Permissions:** Counselor only.
    *   **Response (204 No Content):** (Indicates successful deletion)

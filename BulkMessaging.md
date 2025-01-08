## **`communications` app - Bulk Messaging API Endpoints**

**Base URL:** `/api/communications/`

**Authentication:** Requires a valid JWT access token for an authenticated user with the `ADMIN` role.

**Permissions:** `IsAdmin` (Only admin users can access these endpoints).

---

**1. List Bulk Messages**

*   **Endpoint:** `GET /api/communications/bulk-messages/`
*   **Description:** Retrieves a list of all bulk messages.
*   **Permissions:** Admin only.
*   **Filtering:**
    *   `recipient_group`: Filter by the recipient group (e.g., `?recipient_group=All Students`).
    *   `status`: Filter by the message status (e.g., `?status=Pending`, `?status=Sent`, `?status=Failed`).
    *   `delivery_method`: Filter by the delivery method (e.g., `?delivery_method=email`, `?delivery_method=sms`).
*   **Searching:**
    *   `search`: Search by subject or message body (e.g., `?search=Important Announcement`).
*   **Response (200 OK):**

```json
[
    {
        "id": 1,
        "sender": "admin",
        "recipient_group": "All Students",
        "custom_recipients": "test@example.com,+15551234567",
        "subject": "Important Announcement",
        "message_body": "This is a test bulk message.",
        "delivery_method": "email",
        "status": "Sent",
        "scheduled_time": null,
        "sent_time": "2023-12-19T12:00:00Z"
    },
    // ... more bulk messages
]
```

**2. Create Bulk Message**

*   **Endpoint:** `POST /api/communications/bulk-messages/`
*   **Description:** Creates a new bulk message and sends it (asynchronously via Celery) to the specified recipients.
*   **Permissions:** Admin only.
*   **Request Body:**

```json
{
    "recipient_group": "All Students",  // Or another group from choices, leave empty if using custom_recipients
    "custom_recipients": "test@example.com,+15551234567",  // Optional. Comma or newline separated.
    "subject": "Important Announcement",  // Required for email.
    "message_body": "This is the message body.",
    "delivery_method": "email",  // "email" or "sms"
    "scheduled_time": null  // Optional. ISO 8601 format (e.g., "2024-01-15T10:30:00Z")
}
```

*   **Response (201 Created):**

```json
{
    "id": 2,
    "sender": "admin",
    "recipient_group": "All Students",
    "custom_recipients": "test@example.com,+15551234567",
    "subject": "Important Announcement",
    "message_body": "This is the message body.",
    "delivery_method": "email",
    "status": "Pending",  // Initial status
    "scheduled_time": null,
    "sent_time": null  // Will be updated later
}
```

**3. Retrieve Bulk Message**

*   **Endpoint:** `GET /api/communications/bulk-messages/<int:pk>/`
*   **Description:** Retrieves a specific bulk message by ID.
*   **Permissions:** Admin only.
*   **Response (200 OK):**

```json
{
    "id": 2,
    "sender": "admin",
    "recipient_group": "All Students",
    "custom_recipients": "test@example.com,+15551234567",
    "subject": "Important Announcement",
    "message_body": "This is the message body.",
    "delivery_method": "email",
    "status": "Sent",
    "scheduled_time": null,
    "sent_time": "2023-12-19T12:05:00Z"
}
```

**4. Update Bulk Message**

*   **Endpoint:** `PATCH /api/communications/bulk-messages/<int:pk>/`
*   **Description:** Partially updates a specific bulk message by ID. You can only update specific fields like `status`.
*   **Permissions:** Admin only.
*   **Request Body:**

```json
{
    "status": "Failed"  // Example: Update the status
}
```

*   **Response (200 OK):** (Similar to the response in `GET /api/communications/bulk-messages/<int:pk>/`, but with updated values)

**5. Delete Bulk Message**

*   **Endpoint:** `DELETE /api/communications/bulk-messages/<int:pk>/`
*   **Description:** Deletes a specific bulk message by ID.
*   **Permissions:** Admin only.
*   **Response (204 No Content):** (Indicates successful deletion)

**Notes:**

*   **Asynchronous Sending:** Bulk messages are sent asynchronously using Celery tasks. The `status` field will initially be "Pending" and will change to "Sent" or "Failed" depending on the outcome of the Celery task.
*   **Rate Limiting:** SMS messages are sent with a delay to respect Arkesel's API rate limits (currently set to 100 messages per minute).
*   **Recipient Groups:** The `recipient_group` field supports predefined groups like "All Students," "All Parents," "All Teachers," and "All Staff", as well as specific class names.
*   **Custom Recipients:** The `custom_recipients` field allows you to enter a comma-separated or newline-separated list of email addresses or phone numbers (must start with the country code).
*   **Error Handling:** The API will return appropriate error responses (e.g., 400 Bad Request, 403 Forbidden, 404 Not Found) for invalid requests or if any errors occur during message sending.
*   **Email and SMS Configuration:** You need to configure your email settings (in `settings.py`) and provide your Arkesel API key and Sender ID in the environment variables.

**Example Usage (Frontend - Conceptual):**

```javascript
// Sending a bulk email message:
const messageData = {
    recipient_group: "All Students",
    subject: "School Closure Announcement",
    message_body: "School will be closed tomorrow due to...",
    delivery_method: "email"
};

fetch('/api/communications/bulk-messages/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${your_jwt_token}`
    },
    body: JSON.stringify(messageData)
})
.then(response => {
    if (response.ok) {
        // Handle success
    } else {
        // Handle error
    }
})
.catch(error => {
    // Handle error
});
```

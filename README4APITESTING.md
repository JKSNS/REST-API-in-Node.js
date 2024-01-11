# Todo API Documentation

## Authentication

### Google Login
- **Endpoint:** `/api/v1/auth/google`
- **Description:** Initiates the Google authentication process.
- **Request Type:** GET
- **Authentication:** None
- **Response:** Redirects to the Google Login page.

### Google Callback
- **Endpoint:** `/api/v1/auth/google/callback`
- **Description:** Handles the callback after successful Google authentication.
- **Request Type:** GET
- **Authentication:** Google OAuth
- **Response:** Redirects to the CLIENT_ORIGIN (configured in .env).

### Logout
- **Endpoint:** `/api/v1/logout`
- **Description:** Logs out the user and destroys the session.
- **Request Type:** GET
- **Authentication:** Google OAuth
- **Response:** Redirects to CLIENT_ORIGIN.

## Task Operations

### Create Task
- **Endpoint:** `/api/v1/tasks`
- **Description:** Creates a new task for the authenticated user.
- **Request Type:** POST
- **Authentication:** Google OAuth
- **Request Body Example:**
    ```json
    {
      "text": "Finish Lab 4B",
      "date": false
    }
    ```
- **Response Body Example:**
    ```json
    {
      "_id": "609bb9f17b173854b8a2353a",
      "userId": "google-oauth2|123456789012345678901",
      "text": "Finish Lab 4B",
      "done": false,
      "date": "2023-05-13T10:30:00.000Z",
      "__v": 0
    }
    ```

### Get All Tasks
- **Endpoint:** `/api/v1/tasks`
- **Description:** Retrieves all tasks for the authenticated user.
- **Request Type:** GET
- **Authentication:** Google OAuth
- **Response Body Example:**
    ```json
    [
      {
        "_id": "609bb9f17b173854b8a2353a",
        "userId": "google-oauth2|123456789012345678901",
        "text": "Finish Lab 4B",
        "done": false,
        "date": "2023-05-13T10:30:00.000Z",
        "__v": 0
      },
    ]
    ```

### Update Task
- **Endpoint:** `/api/v1/tasks/:id`
- **Description:** Updates an existing task for the authenticated user.
- **Request Type:** PUT
- **Authentication:** Google OAuth
- **Path Parameters:**
    - `id` - Task ID
- **Request Body Example:**
    ```json
    {
      "text": "Complete Lab 4B",
      "done": true
    }
    ```
- **Response Body Example:**
    ```json
    {
      "_id": "609bb9f17b173854b8a2353a",
      "userId": "google-oauth2|123456789012345678901",
      "text": "Complete Lab 4B",
      "done": true,
      "date": "2023-05-13T10:30:00.000Z",
      "__v": 0
    }
    ```

### Delete Task
- **Endpoint:** `/api/v1/tasks/:id`
- **Description:** Deletes an existing task for the authenticated user.
- **Request Type:** DELETE
- **Authentication:** Google OAuth
- **Path Parameters:**
    - `id` - Task ID
- **Response Body Example:**
    ```json
    {
      "message": "Task deleted successfully."
    }
    ```
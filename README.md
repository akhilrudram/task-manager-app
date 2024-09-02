# Task Management app

Task Management application built using **Node.js**, **Express**, and **MongoDB**. This app allows users to manage their tasks and provides an admin interface for user management. Authentication is handled via **JWT** tokens.

## Features

- User Registration and Login
- Task Management (Create, Update, Delete, View)
- Admin User Management
- JWT Authentication
- Pagination and Sorting

## Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)
- **MongoDB** (ensure it’s running on your machine)

### Installation

1. **Clone the repository**:

   git clone https://github.com/akhilrudram/task-manager-app.git

2. **Install the dependencies**:

   npm install

3. **Set up environment variables**:

   Create a `.env` file

-Mongodb Atlas
MONGO_URL= mongodb+srv://akhil:123@task-manager-api.ctgae.mongodb.net/TaskManagerDB
(OR)
MONGO_URL=mongodb://localhost:27017/TaskManagerDB
JWT_SECRET = BVwd8nV1sK
PORT=3000

4. **Run the application**:

   npm start

   The app will run at `http://localhost:3000`.

## API Endpoints

- Base Url : http://localhost:3000

### User Routes

| Method | Endpoint         | Access | Description            |
| ------ | ---------------- | ------ | ---------------------- |
| POST   | /api/v1/register | Public | Register a new user    |
| POST   | /api/v1/login    | Public | Log in and get a token |

### Task Routes (Requires JWT)

| Method | Endpoint         | Access        | Description               |
| ------ | ---------------- | ------------- | ------------------------- |
| POST   | /api/v1/task     | Private (JWT) | Create a new task         |
| PUT    | /api/v1/task/:id | Private (JWT) | Update a task by ID       |
| DELETE | /api/v1/task/:id | Private (JWT) | Delete a task by ID       |
| GET    | /api/v1/task     | Private (JWT) | Get all tasks             |
| GET    | /api/v1/task/:id | Private (JWT) | Get a specific task by ID |

### Admin Routes (Requires Admin JWT)

| Method | Endpoint              | Access      | Description                              |
| ------ | --------------------- | ----------- | ---------------------------------------- |
| GET    | /api/v1/users         | Admin (JWT) | Get all users                            |
| GET    | /api/v1/:userId/tasks | Admin (JWT) | Get tasks for a specific user by user ID |

## Request Payloads and Responses

### **User Registration**

- **Endpoint:** `POST /api/v1/register`
- Payload

  {
  "name": "akhil",
  "email": "akhil@gmail.com",
  "password": "123",
  "isAdmin": false // true for admin
  }

- Response

{
"status": true,
"message": "User Registered successfully"
}

### **User Login**

- Endpoint: `POST /api/v1/login`
- Payload:

{
"email":"akhil@gmail.com",
"password":"123"
}

- Response:

  {
  "status": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ0NDI1YjBjODEwNzU0MTA1ZTFmYzIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzI1MjU3NTk5LCJleHAiOjE3MjU4NjIzOTl9.209KVanAT_VuGHDXf928Wz9YF78cMPH7_y69E3EjAe4",
  "message": "Login successfully"
  }

### **Create Task**

- **Endpoint:** `POST /api/v1/task`
- **Payload:**

  ```json
  {
    "title": "My Task",
    "description": "Task description"
  }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "message": "Task created successfully",
    "task": {
      "_id": "task_id",
      "title": "My Task",
      "description": "Task description",
      "userId": "user_id",
      "createdAt": "2023-09-01T00:00:00.000Z",
      "updatedAt": "2023-09-01T00:00:00.000Z"
    }
  }
  ```

### **Get All Tasks**

- **Endpoint:** `GET /api/v1/task`
- **Response:**

  ```json
  {
    "status": "success",
    "tasks": [
      {
        "_id": "task_id_1",
        "title": "Task 1",
        "description": "Task 1 description",
        "userId": "user_id",
        "createdAt": "2023-09-01T00:00:00.000Z",
        "updatedAt": "2023-09-01T00:00:00.000Z"
      },
      {
        "_id": "task_id_2",
        "title": "Task 2",
        "description": "Task 2 description",
        "userId": "user_id",
        "createdAt": "2023-09-01T00:00:00.000Z",
        "updatedAt": "2023-09-01T00:00:00.000Z"
      }
    ],
    "pageInfo": {
      "currentPage": 1,
      "totalPages": 2,
      "count": 15
    }
  }
  ```

### **Update Task**

- **Endpoint:** `PUT /api/v1/task/:id`
- **Payload:**

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description"
  }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "message": "Task updated successfully",
    "task": {
      "_id": "task_id",
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "userId": "user_id",
      "createdAt": "2023-09-01T00:00:00.000Z",
      "updatedAt": "2023-09-01T00:00:00.000Z"
    }
  }
  ```

### **Delete Task**

- **Endpoint:** `DELETE /api/v1/task/:id`
- **Response:**

  ```json
  {
    "status": "success",
    "message": "Task deleted successfully"
  }
  ```

### **Get Specific Task**

- **Endpoint:** `GET /api/v1/task/:id`
- **Response:**

  ```json
  {
    "status": "success",
    "task": {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "userId": "user_id",
      "createdAt": "2023-09-01T00:00:00.000Z",
      "updatedAt": "2023-09-01T00:00:00.000Z"
    }
  }
  ```

### **Admin: Get All Users**

- **Endpoint:** `GET /api/v1/users`
- **Response:**

  ```json
  {
    "status": "success",
    "users": [
      {
        "_id": "user_id_1",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "isAdmin": false
      },
      {
        "_id": "user_id_2",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "isAdmin": false
      }
    ]
  }
  ```

### **Admin: Get Tasks for a Specific User**

- **Endpoint:** `GET /api/v1/:userId/tasks`
- **Response:**

  ```json
  {
    "status": "success",
    "userName": "John Doe",
    "tasks": [
      {
        "_id": "task_id_1",
        "title": "Task 1",
        "description": "Task 1 description",
        "userId": "user_id",
        "createdAt": "2023-09-01T00:00:00.000Z",
        "updatedAt": "2023-09-01T00:00:00.000Z"
      },
      {
        "_id": "task_id_2",
        "title": "Task 2",
        "description": "Task 2 description",
        "userId": "user_id",
        "createdAt": "2023-09-01T00:00:00.000Z",
        "updatedAt": "2023-09-01T00:00:00.000Z"
      }
    ]
  }
  ```

# Task Manager Application

A full-stack Task Manager application built using the MERN Stack. This project enables users to register, log in securely, and manage their tasks efficiently through a modern web interface.

## Features

* User Authentication (Register/Login)
* JWT-based Authorization
* Create, Read, Update, and Delete Tasks
* Protected Routes
* MongoDB Atlas Integration
* Responsive Dashboard
* RESTful API Architecture

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Folder Structure

```bash
project-root
│
├── frontend
│
├── backend
│
├── .gitignore
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Tasks

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id

## Future Enhancements

* Task Categories
* Task Priorities
* Due Dates & Reminders
* Search and Filtering
* Dark Mode

## Author

**Timoty Soren**

MERN Stack Developer

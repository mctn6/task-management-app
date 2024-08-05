# Task Management Application

This is a full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js) and GraphQL.

## Features

- User authentication (register, login)
- Create, read, update, and delete tasks
- Assign tasks to users
- View tasks by status (Todo, In Progress, Done)
- Set due dates for tasks

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm
- You have a MongoDB database set up (local or cloud-based like MongoDB Atlas)

## Installing Task Management Application

To install the Task Management Application, follow these steps:

1. Clone the repository:
git clone https://github.com/mctn6/task-management-app.git
cd task-management-app

2. Install the dependencies for both server and client:
npm install
cd client
npm install

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


## Using Task Management Application

To use the Task Management Application, follow these steps:

1. Start the server:
npm run server

2. In a new terminal, start the client:
cd client
npm start

3. Open your browser and navigate to `http://localhost:3000`

## Application Flow

1. **Register/Login**: 
- New users can register with a username, email, and password
- Existing users can log in with their email and password

Login :
![image](https://github.com/user-attachments/assets/3f47d11f-a260-49f4-9620-09a16355161d)

Register :
![image](https://github.com/user-attachments/assets/f9ff9249-41ff-43dd-8003-2deed2920b1a)


2. **View Tasks**:
- After logging in, users are directed to the task list
- The task list shows all tasks created by or assigned to the user

![image](https://github.com/user-attachments/assets/9208cad3-ffcf-450a-ad0a-3734d619d406)


3. **Create a Task**:
- Click on the "Create New Task" button
- Fill in the task details (title, description, due date)
- Optionally assign the task to a user
- Click "Create Task" to save

![image](https://github.com/user-attachments/assets/fbf8b9f8-952c-4d7f-88a8-a291b2e14f26)


4. **Update a Task**:
- Click on the "Edit" button next to a task
- Modify the task details
- Click "Update Task" to save changes

![image](https://github.com/user-attachments/assets/48e52e78-4eee-41ab-8171-fdbf8863260f)


5. **Delete a Task**:
- Click on the "Delete" button next to a task
- Confirm the deletion

![image](https://github.com/user-attachments/assets/883c8cc6-9dd3-4bf7-8db6-b5b12b1a200c)


6. **Logout**:
- Click on the "Logout" button in the navigation bar

## API Endpoints

The application uses GraphQL for its API. The main endpoint is:

- `/graphql`: Handles all GraphQL queries and mutations

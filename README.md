# Introduction to Git and GitHub Branching for Collaborative Group Projects

# User Management API by Vince Bryant Cabunilas, Erica Juarez, Justine Paraiso, and Liezel Tumbaga

## Project Overview
This project is a REST API for user management, allowing CRUD (Create, Read, Update, Delete) operation on user data. It enables users to be created, retrieved, updated, and deleted through API endpoints.

## Features
- Perform CRUD (Create, Read, Update, Delete)
- MySQL database integration
- RESTful API structure
- Uses Postman for API testing
- Automatic database and table creation upon running the application

## Pre-requisites
Before setting up the project, ensure you have the following installed:
- Node.js
- MySQL
- Postman

 
# Clone the repository:
git clone https://github.com/your-username/user-management-api.git 
cd user-management-api 

# Install dependencies:
npm install

# Set up environment variables:
# Create a .env file and add:
DB_HOST=localhost  
DB_PORT=3306  
DB_USER=root  
DB_PASS=  
DB_NAME=user_management  

# Run the server:
npm start

# Authentication:
POST /api/auth/register → Register a user,
POST /api/auth/login → Authenticate and get JWT

# Users:
POST /api/users/ → Create a user,
GET /api/users/ → Get all users,
GET /api/users/:id → Get user by ID,
DELETE /api/users/:id → Delete user
# KimLof-TG-Suite-Coding-exercise---CRUD-app

# CRUD App

This is a CRUD application that allows users to manage users and events. It includes functionalities for adding, updating, and deleting users. Also you can add events for users.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)


## Installation

### Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/kimlof/KimLof-TG-Suite-Coding-exercise---CRUD-app.git
```
```
cd KimLof-TG-Suite-Coding-exercise---CRUD-app
```

## Install Dependencies

Navigate to the project directory and install the necessary dependencies:
```
npm install
```

## Running the Application

### Development Mode

To start the development server and run the app in development mode:
```bash
cd/frontend
```
```bash
npm start
```
```bash
cd ..
```

```bash
cd/backend
```
```bash
npm run start
```
This will start the app on http://localhost:3001 by default. Open this URL in your browser to view the app.

## Changing the Port

If the default port (`http://localhost:3001`) is already in use, you can change the port by updating the configuration files in both the backend and frontend:

- **Backend Port**: Change the port in `backend/src/main.ts`.
- **Frontend API URL**: Change the API URL in `frontend/src/api.ts` to match the backend port.




# Auth MERN Stack

A full-stack authentication system built with the MERN stack for learning purposes. This project demonstrates modern authentication patterns including JWT tokens, email verification, and secure password management.

## Features

-   User registration and login
-   Email verification system
-   Password reset functionality
-   Protected routes with three-tier authentication
-   HTTP-only cookies for secure token storage
-   Responsive UI with Tailwind CSS

## Tech Stack

**Frontend:**

-   React 19 + Vite
-   Zustand for state management
-   React Router for navigation
-   Tailwind CSS for styling
-   Axios for API calls

**Backend:**

-   Node.js + Express
-   MongoDB with Mongoose
-   JWT for authentication
-   Nodemailer for emails

## Quick Start

### Prerequisites

-   Node.js (v16+)
-   MongoDB (local or Atlas)
-   Email service

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/DaniilBaida/auth-mern.git
    cd auth-mern
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

    Create `.env` file:

    ```env
    PORT=5000
    DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=http://localhost:5173
    GOOGLE_APP_PASSWORD=your_gmail_app_password
    ```

3. **Frontend Setup**

    ```bash
    cd frontend
    npm install
    ```

    Create `.env` file:

    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

### Running the Application

1. **Start Backend**

    ```bash
    cd backend
    npm run dev
    ```

2. **Start Frontend**
    ```bash
    cd frontend
    npm run dev
    ```

The application will be available at `http://localhost:5173`

## Authentication Flow

1. **Register** → User creates account
2. **Email Verification** → User verifies email via code
3. **Login** → User signs in with credentials
4. **Dashboard Access** → Full access to protected content

## Learning Objectives

This project demonstrates:

-   Full-stack JavaScript development
-   Modern authentication patterns
-   State management with Zustand
-   HTTP-only cookie security
-   Email integration
-   Route protection strategies
-   Environment configuration
-   RESTful API design

## License

This project is for learning purposes. Feel free to use and modify as needed.

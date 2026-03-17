# React Native Authentication App

## Overview
This is a **React Native (Expo) mobile application** demonstrating **full authentication flow** with **JWT-based access and refresh tokens**, secure login, registration, profile management, and avatar uploads.  

It implements a **rotating refresh token mechanism** to automatically renew access tokens every 15 minutes, providing a **secure and smooth user experience**.

This project is designed as a learning project for **full-stack authentication, state management, and secure file handling**.

---

## Features

### Authentication
- Registration with required fields: `name`, `email`, `password`, `gender`.  
- Optional fields: `dateOfBirth`, `country`, `state`, `phone`, `avatar`.  
- Login using email and password.  
- JWT **access token** (expires every 15 minutes) and **rotating refresh token**.  
- Automatic token renewal using Axios interceptor.

### Profile Management
- Update profile fields and avatar in Account tab.  
- Avatar uploaded and stored on **Cloudinary**.  
- Profile modal in Home tab for quick user info.

### Navigation & UI
- Bottom Tab Navigation with **Home** and **Account** tabs.  
- Conditional routing for authenticated users.  
- Expo Router used for file-based routing.  
- Scrollable forms for login, registration, and account update.

### State Management
- **AuthContext** tracks `user` state and `loading` status globally.  
- Automatically loads user profile if valid tokens exist.  
- Logout clears stored tokens and resets context.

### Secure Storage
- Access and refresh tokens stored in **Expo Secure Store**.  
- Axios automatically refreshes access token when expired.

---

## Tech Stack

**Frontend:**
- React Native (Expo)  
- Expo Router (file-based navigation)  
- Context API (global state management)  
- Axios (API requests + token auto-refresh)  
- Expo Secure Store (token storage)  

**Backend:**
- Node.js, Express.js  
- MongoDB with Mongoose  
- JWT (access + refresh tokens)  
- Bcrypt (password hashing)  
- Cloudinary (avatar uploads)  

---

## Frontend Folder Structure
```
/frontend
├── auth
│ ├── login.tsx
│ ├── register.tsx
│ └── layout.tsx
├── tabs
│ ├── home.tsx
│ ├── account.tsx
│ └── layout.tsx
│── index.tsx
│── layout.tsx
|
├── context
│ └── authContext.tsx
├── services
│ ├── authApi.ts
│ └── userApi.ts
├── utils
│ ├── api.ts
│ ├── storage.ts
│ └── screen.tsx
├── components
│ └── Box, InputBox, ProfileModal, etc.

## Backend Folder Structure

/backend
├── controllers
│ ├── auth.controller.js
│ └── user.controller.js
├── middlewares
│ ├── auth.middlewares.js
│ ├── error.middleware.js
│ └── multer.middleware.js
├── models
│ └── user.model.js
├── utils
│ ├── ApiError.js
│ ├── ApiResponse.js
│ ├── AsyncHandler.js
│ └── cloudinary.js
├── routes
│ ├── auth.routes.js
│ └── user.routes.js
├── config
│ └── db.js
├── constants.js
├── app.js
└── server.js

```
---

## Installation

### Backend
```bash
cd server
npm install
npm run dev
```
### Frontend
```bash
cd mobile
npm install
expo start
```

## Crate a .env file
```
 PORT=3000
 MONGO_URI=your_mongodb_uri
 ACCESS_TOKEN_SECRET=your_access_token_secret
 ACCESS_TOKEN_EXPIRY=15m
 REFRESH_TOKEN_SECRET=your_refresh_token_secret
 REFRESH_TOKEN_EXPIRY=7d
 CLOUDINARY_CLOUD_NAME=your_cloud_name
 CLOUDINARY_API_KEY=your_api_key
 CLOUDINARY_API_SECRET=your_api_secret
```

## Authentication
| Method | Endpoint                            | Description                              |
| ------ | ----------------------------------- | ---------------------------------------- |
| POST   | `/api/auth/register`                | Register new user with optional avatar   |
| POST   | `/api/auth/login`                   | Login user and receive tokens            |
| POST   | `/api/auth/logout`                  | Logout user and delete refresh token     |
| GET    | `/api/auth/regenerate-access-token` | Refresh access token using refresh token |



## User profile
| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| GET    | `/api/user/me`        | Fetch current user profile     |
| PATCH  | `/api/user/update-me` | Update profile fields & avatar |


 ## Token Management
- Access Token: expires every 15 minutes.
- Refresh Token: rotates after every refresh.
- Axios automatically handles token rotation.
- Tokens stored securely using Expo Secure Store.

### 👨‍💻 Author

Built as a learning project for learning React Native Expo , Authentication, Full stack Implemention etc.

Made with ❤️ by **Anupam Raj** (To View Demo of project clik this link )
https://github.com/user-attachments/assets/70ad9fbe-7e9f-475c-b836-06f286c31087

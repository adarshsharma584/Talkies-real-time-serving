# Chat-Bird — Chat App

A modern real-time chat application built with React (Vite) on the client, Express + MongoDB on the server, Redux Toolkit for state management, and Socket.IO for live messaging.

## Features
- User authentication: register, login, logout (secure httpOnly cookie handling)
- Fetch own profile and list of other participants
- Real-time messaging via Socket.IO (send/receive, typing indicator)
- Message alignment: your messages on the right (blue), incoming on the left (gray)
- Light/Dark-friendly UI

## Tech Stack
- Client: React, Vite, Redux Toolkit, axios, react-hot-toast, socket.io-client
- Server: Node.js, Express, MongoDB (Mongoose), JWT, cookie-parser, CORS, Socket.IO

## Prerequisites
- Node.js 18+
- A running MongoDB instance (local or Atlas)

## Project Structure
- `client/` — React front-end
- `server/` — Express back-end API + Socket.IO

## Environment Variables

### Server (.env)
- `MONGODB_URI` — MongoDB connection string
- `PORT` — optional, defaults to 5000
- `REFRESH_TOKEN_SECRET` — secret for refresh token verification (used by middleware)
- `ACCESS_TOKEN_SECRET` — secret for access token generation (used in user model)

### Client (.env)
- `VITE_API_URL` — base URL for API (defaults to `http://localhost:5000/api/v1`)

## Setup & Run

### Install dependencies
```bash
# In root or each folder separately
cd server && npm install
cd ../client && npm install
```

### Start the backend (API + Socket.IO)
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

### Start the frontend (Vite dev server)
```bash
cd client
npm run dev
# Vite runs on http://localhost:5173 (or 5174 if 5173 is in use)
```

The server CORS/socket configuration allows both `http://localhost:5173` and `http://localhost:5174`.

## Usage
1. Open the client in your browser.
2. Sign up or log in.
3. Select a user from the sidebar and start chatting.

### Testing multiple users
Because authentication uses an httpOnly cookie, sessions are shared across tabs in the same browser. To test two different users at the same time:
- Use two different browsers (e.g., Chrome and Edge), or
- Use one normal window and one incognito/private window.

## API Overview
Base: `/api/v1`

- Users
  - `POST /users/register`
  - `POST /users/login`
  - `POST /users/logout`
  - `GET /users/profile`
  - `GET /users/participants`

- Messages
  - `POST /messages/send-message/:receiverId`
  - `GET /messages/get-messages/:receiverId`

## Socket Events
- Client emits: `join`, `sendMessage`, `typing`
- Server emits: `receiveMessage`

## Troubleshooting
- If messages align incorrectly, ensure your profile is loaded and the app recognizes your user ID. The client normalizes ID comparisons.
- If Vite switches ports (5173 → 5174), both are allowed by CORS/socket settings.
- Make sure both client and server are running, and MongoDB is reachable.

## License
This project is for learning/demo purposes.
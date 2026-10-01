🤖 ChattyBot --- Real-Time AI Chatbot

A modern, responsive, real-time AI chatbot built with React, Vite,
Tailwind CSS, Node.js, Express.js, Socket.IO, and OpenRouter API.

ChattyBot lets users send messages and receive AI-generated responses in
real time. The project also includes a typing indicator, automatic
scrolling, Markdown rendering, and browser-based chat persistence.

✨ Features

💬 Real-time messaging with Socket.IO

🤖 OpenRouter AI integration

⌨️ AI typing indicator

📜 Automatic scrolling

💾 Chat persistence using browser localStorage

📝 Markdown rendering with react-markdown

🌙 Dark modern UI

📱 Responsive layout

🔐 Environment-variable based API configuration

⚡ React + Vite frontend

🖥️ Node.js + Express.js backend

🛠️ Tech Stack

Frontend

React

Vite

Tailwind CSS

Socket.IO Client

React Markdown

Backend

Node.js

Express.js

Socket.IO

dotenv

AI

OpenRouter API

🏗️ Architecture

React + Vite
     │
     │ Socket.IO
     ▼
Node.js + Express
     │
     │ OpenRouter API
     ▼
OpenRouter AI Model
     │
     ▼
Node.js Backend
     │
     │ Socket.IO
     ▼
React UI

🔄 How It Works

User enters a message in the React frontend.

React sends the message through Socket.IO.

The Node.js backend receives the ai-message event.

The backend sends the prompt to OpenRouter.

OpenRouter generates the AI response.

The backend emits ai-response.

React displays the response.

Messages are saved in browser localStorage.

📁 Project Structure

ai-chatbot/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   └── services/
│   │       └── ai.service.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── .gitignore
└── README.md

⚙️ Prerequisites

Node.js 18+

npm

OpenRouter API key

Check versions:

node -v
npm -v

🚀 Installation

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/ai-chatbot.git
cd ai-chatbot

2. Install backend dependencies

cd backend
npm install

3. Install frontend dependencies

Open another terminal:

cd frontend
npm install

🔐 Environment Variables

Backend

Create backend/.env:

PORT=4000
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_model_name

Never commit your real API key to GitHub.

Frontend

Create frontend/.env:

VITE_BACKEND_URL=http://localhost:4000

The Socket.IO connection should use:

const socket = io(import.meta.env.VITE_BACKEND_URL);

▶️ Run Locally

Backend

From backend:

npm start

Backend runs on:

http://localhost:4000

Frontend

From frontend:

npm run dev

Frontend runs on:

http://localhost:5173

Open the frontend URL in your browser.

🔌 Socket.IO Events

ai-message

Frontend → Backend:

socket.emit("ai-message", {
  prompt: message
});

ai-typing

Backend → Frontend:

socket.emit("ai-typing");

Indicates that the AI is processing the request.

ai-response

Backend → Frontend:

socket.emit("ai-response", {
  response
});

Sends the AI-generated response to the frontend.

💾 Chat Persistence

The current version stores messages in browser localStorage under:

chatMessages

This means messages remain after a page reload.

This is not database persistence. Clearing browser/site data removes
the stored chat, and the chat is not synchronized across devices or
browsers.

🔒 Security

Keep the OpenRouter API key on the backend.

Your .gitignore should include:

node_modules/
.env
.env.*
!.env.example
dist/

If an API key is accidentally exposed publicly, revoke or rotate it
immediately.

🌐 Deployment

The application can be deployed as separate frontend and backend
services.

Frontend

Vercel

Backend

Railway

Render

Production architecture:

React + Vite
     │
     ▼
  Vercel
     │
     │ Socket.IO
     ▼
Node.js + Express
     │
     ▼
Railway / Render
     │
     │ API
     ▼
OpenRouter

After deploying the backend, set the frontend environment variable to
the production backend URL:

VITE_BACKEND_URL=https://your-backend-domain.com

Also configure backend CORS to allow the deployed frontend domain.

🧪 Project Status

Implemented

React + Vite frontend

Tailwind CSS UI

Node.js backend

Express.js

Socket.IO real-time communication

OpenRouter integration

AI typing indicator

Automatic scrolling

Markdown rendering

Local chat persistence

Environment variables

Basic error handling

Not Implemented

User authentication

Database storage

Multiple chat sessions

Cross-device chat synchronization

Server-side conversation history/context

Streaming AI responses

File/image uploads

🔮 Future Improvements

JWT authentication

MongoDB/PostgreSQL chat storage

Multiple conversations

Server-side AI conversation history

AI model selector

Streaming responses

Regenerate response

Edit messages

Copy response

File/image uploads

Voice input

Rate limiting

📸 Screenshot

Add a screenshot to:

screenshots/chatbot.png

Then use:

![ChattyBot Screenshot](./screenshots/chatbot.png)

📌 Important Notes

ChattyBot is a real-time AI chatbot.

Chat persistence currently uses browser localStorage.

The current version does not send previous messages to the AI model
as conversation context.

The OpenRouter API key must stay on the backend.

Frontend and backend production URLs must be configured separately.

👨‍💻 Author

Your Name

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://www.linkedin.com/in/YOUR_USERNAME

⭐ Contributing

Fork the repository.

Create a new branch.

Make your changes.

Commit the changes.

Push the branch.

Open a Pull Request.

📄 License

This project is available for educational and personal use.

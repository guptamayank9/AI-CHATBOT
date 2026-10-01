# 🤖 ChattyBot - Real-Time AI Chatbot

A modern, responsive, real-time AI chatbot built with React, Vite, Tailwind CSS, Node.js, Express.js, Socket.IO, and OpenRouter API.

ChattyBot allows users to send messages and receive AI-generated responses in real time. The application also includes a typing indicator, automatic scrolling, Markdown rendering, and browser-based chat persistence.

---

## ✨ Features

### 💬 Real-Time Messaging

- Real-time communication using Socket.IO
- Instant messaging between frontend and backend
- AI response handling through WebSocket events
- Automatic Socket.IO connection management

### 🤖 AI Integration

- OpenRouter API integration
- Configurable AI model using environment variables
- AI requests are handled securely by the backend
- API key is kept on the backend

### 💾 Chat Persistence

- Chat messages are stored in browser localStorage
- Messages remain available after page reload
- No database is required for the current version
- Chat data is stored locally in the user's browser

### ⌨️ User Experience

- AI typing indicator
- Send message using Send button
- Press Enter to send a message
- Input is disabled while AI is responding
- Automatic scrolling to the latest message
- Empty messages are prevented
- Smooth chat experience

### 📝 Markdown Support

AI responses are rendered using React Markdown.

Supported formatting includes:

- Headings
- Bold text
- Italic text
- Lists
- Code
- Links
- Line breaks

### 🎨 Modern UI

- Dark-themed interface
- Responsive layout
- User and AI chat bubbles
- Tailwind CSS styling
- Smooth scrolling
- Clean and minimal design

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Socket.IO Client
- React Markdown

### Backend

- Node.js
- Express.js
- Socket.IO
- dotenv

### AI

- OpenRouter API

---

## 🏗️ Project Architecture

```text
                 ┌──────────────────────┐
                 │     React Frontend   │
                 │   Vite + Tailwind    │
                 └──────────┬───────────┘
                            │
                            │ Socket.IO
                            ▼
                 ┌──────────────────────┐
                 │     Node.js Server   │
                 │ Express + Socket.IO  │
                 └──────────┬───────────┘
                            │
                            │ API Request
                            ▼
                 ┌──────────────────────┐
                 │    OpenRouter API    │
                 │      AI Model        │
                 └──────────┬───────────┘
                            │
                            │ AI Response
                            ▼
                 ┌──────────────────────┐
                 │     React Frontend   │
                 └──────────────────────┘
````

---

## 🔄 How It Works

1. User enters a message in the React frontend.
2. React sends the message to the backend using Socket.IO.
3. Node.js receives the `ai-message` event.
4. The backend sends the prompt to OpenRouter.
5. OpenRouter generates the AI response.
6. Backend receives the response.
7. Backend emits the `ai-response` event.
8. React receives and displays the AI response.
9. Chat messages are stored in localStorage.
10. Saved messages are restored when the page is reloaded.

---

## 📁 Project Structure

```text
AI-ChatBot/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   └── services/
│   │       └── ai.service.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Before running this project, make sure you have:

* Node.js 18 or higher
* npm
* OpenRouter API key

Check Node.js version:

```bash
node -v
```

Check npm version:

```bash
npm -v
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-ChatBot.git
```

Go inside the project:

```bash
cd AI-ChatBot
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Install Frontend Dependencies

Open another terminal and run:

```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

Environment variables are required for the backend and frontend.

---

### Backend Environment Variables

Create a file:

```text
backend/.env
```

Add:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173

OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_model_name
```

Replace:

```text
your_openrouter_api_key
```

with your actual OpenRouter API key.

Replace:

```text
your_model_name
```

with the OpenRouter model you want to use.

---

### Frontend Environment Variables

Create:

```text
frontend/.env
```

Add:

```env
VITE_BACKEND_URL=http://localhost:4000
```

The frontend uses this URL to connect to the backend Socket.IO server.

---

## ▶️ Run the Project Locally

The frontend and backend need to run separately.

---

### Start Backend

Open a terminal:

```bash
cd backend
npm start
```

The backend will run on:

```text
http://localhost:4000
```

---

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

Open the frontend URL in your browser:

```text
http://localhost:5173
```

---

## 🔌 Socket.IO Events

The application uses Socket.IO for real-time communication.

### `ai-message`

Frontend sends the user's message to the backend.

```js
socket.emit("ai-message", {
  prompt: message
});
```

---

### `ai-typing`

Backend tells the frontend that the AI is processing the request.

```js
socket.emit("ai-typing");
```

---

### `ai-response`

Backend sends the AI-generated response to the frontend.

```js
socket.emit("ai-response", {
  response
});
```

---

## 💾 Local Storage

The current version uses browser `localStorage` to preserve chat messages.

Messages are stored using:

```text
chatMessages
```

The application:

1. Loads saved messages when the app starts.
2. Stores new messages in React state.
3. Saves updated messages to localStorage.
4. Restores messages after browser reload.

### Important

This is browser-based persistence.

It is not database storage.

Therefore:

* Clearing browser data will remove the chat.
* Chat is not synchronized between different devices.
* Chat is not synchronized between different browsers.
* Each browser stores its own chat data.

---

## 🔒 Security

The OpenRouter API key should only be used by the backend.

Never put this in the frontend:

```env
OPENROUTER_API_KEY=your_key
```

The `.env` file should not be uploaded to GitHub.

Add the following to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
```

If an API key is accidentally exposed publicly, revoke or rotate the key immediately.

---

## 🌐 Deployment

The application can be deployed as two separate services.

### Frontend

Recommended platform:

* Vercel

### Backend

Possible platforms:

* Render
* Railway

---

## 🚀 Production Architecture

```text
                ┌─────────────────────┐
                │      Frontend       │
                │    React + Vite     │
                │       Vercel        │
                └──────────┬──────────┘
                           │
                           │ Socket.IO
                           ▼
                ┌─────────────────────┐
                │       Backend       │
                │ Node + Express +    │
                │      Socket.IO      │
                │ Render / Railway    │
                └──────────┬──────────┘
                           │
                           │ API Request
                           ▼
                ┌─────────────────────┐
                │     OpenRouter      │
                │      AI Model       │
                └─────────────────────┘
```

---

## 🌍 Production Environment Variables

### Backend on Render/Railway

Set these environment variables in the hosting platform:

```env
PORT=4000
CLIENT_ORIGIN=https://your-frontend-url.vercel.app
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_model_name
```

`CLIENT_ORIGIN` should contain the deployed frontend URL.

Example:

```env
CLIENT_ORIGIN=https://chattybot.vercel.app
```


## 🧪 Current Project Status

### Implemented

* [x] React frontend
* [x] Vite
* [x] Tailwind CSS
* [x] Node.js backend
* [x] Express.js
* [x] Socket.IO
* [x] OpenRouter API
* [x] AI typing indicator
* [x] Automatic scrolling
* [x] React Markdown
* [x] Local chat persistence
* [x] Environment variables
* [x] Basic error handling
* [x] Responsive chat UI

### Not Implemented Yet

* [ ] User authentication
* [ ] Database integration
* [ ] Multiple chat sessions
* [ ] Cross-device chat synchronization
* [ ] Server-side conversation history
* [ ] AI conversation context
* [ ] Streaming AI responses
* [ ] File uploads
* [ ] Image uploads
* [ ] Voice input

---

## 🔮 Future Improvements

Some possible improvements for future versions:

* JWT authentication
* MongoDB or PostgreSQL integration
* User-specific chat history
* Multiple chat conversations
* Server-side conversation context
* AI model selection
* Streaming responses
* Regenerate AI response
* Edit messages
* Copy AI response
* File and image uploads
* Voice input
* Rate limiting
* Better error handling
* Message search

---

## 📌 Important Notes

* ChattyBot is a real-time AI chatbot.
* Socket.IO is used for real-time communication.
* OpenRouter is used for AI responses.
* Chat messages are currently stored in browser localStorage.
* The current version does not store chats in a database.
* The current version does not send previous messages as AI conversation context.
* The OpenRouter API key must remain on the backend.
* Frontend and backend have separate environment variables.
* Production CORS should allow the deployed frontend origin.

---

## 👨‍💻 Author

**Your Name**

GitHub:

```text
https://github.com/guptamayank9
```

LinkedIn:

```text
https://www.linkedin.com/in/mayank-gupta-8b0148327/
```

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and personal use.

```



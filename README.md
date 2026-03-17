# Startupstrategist
AI Startup Strategist is a full-stack web app that generates high-quality startup ideas and complete business blueprints in real time using AI. Built with React, Node.js, and the Hugging Face API, it helps users turn simple interests into actionable startup concepts instantly.
# 🚀 AI Startup Strategist

AI Startup Strategist is a full-stack web application that generates high-quality startup ideas and complete business blueprints in real time using AI.

---

## 💡 Features

* AI-powered startup idea generation
* Structured business blueprint (problem, solution, MVP, revenue model, etc.)
* Clean and responsive UI
* Idea history (local storage)
* Fast backend API integration

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Axios

**Backend**

* Node.js
* Express.js
* dotenv

**AI Integration**

* Hugging Face Inference API
* Model: Mistral-7B-Instruct

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd startup-strategist
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Add environment variables

Create a `.env` file inside `backend`:

```env
PORT=5000
HF_API_KEY=your_huggingface_api_key
```

---

### 4. Run the application

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

---

### 5. Open in browser

```
http://localhost:5173
```

---

## 🚀 How It Works

1. User selects industry and interest
2. Frontend sends request to backend
3. Backend calls Hugging Face API
4. AI generates startup idea
5. Results are displayed as a structured blueprint

---

## 🎯 Use Cases

* Students exploring startup ideas
* Hackathon projects
* Early-stage founders
* Product idea brainstorming

---

## 👨‍💻 Author

Gnan – B.Tech Student | AI Developer | Startup Builder

---

## 📌 Note

* Hugging Face free API may be slow or return unstructured responses
* For better performance, consider upgrading to paid APIs

---

## ⭐ Future Improvements

* User authentication
* Database integration
* AI mentor chat
* Better prompt engineering
* Deployment (Vercel + Render)

---

**Made with ❤️ using AI**

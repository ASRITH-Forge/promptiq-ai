# 🚀 PromptIQ AI

**PromptIQ AI** is a full-stack **MERN-based AI chat application** that enables users to interact with an intelligent assistant, generate text and images, and manage conversations in a modern SaaS-style platform.

---

## 🌟 Features

### 🤖 AI Chat System

* Generate intelligent responses using **Google Gemini API**
* Supports both **text and image generation**
* Markdown rendering + syntax highlighting (Prism.js)

### 💬 Chat Management

* Create, view, and delete chats
* Persistent chat history
* Smooth UI with auto-scroll

### 🔐 Authentication

* JWT-based login & registration
* Secure protected routes
* Password hashing using bcrypt

### 🌍 Community Sharing

* Publish AI-generated images
* Explore community-created content

### 💳 Credits System

* Buy credits using **Stripe**
* Credits deducted based on usage
* Webhook-based payment verification

### 🎨 Modern UI/UX

* Dark/Light mode support
* Responsive design
* Smooth animations & loaders

---

## 🏗️ Tech Stack

### Frontend (Client)

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* Prism.js (code highlighting)
* React Markdown

### Backend (Server)

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Stripe Payments
* ImageKit (image hosting)
* Gemini API (AI)

---

## 📂 Project Structure

```
promptiq-ai/
│
├── client/        # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│
├── server/        # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── configs/
│
└── README.md
```

---

## ⚙️ Environment Setup

### 🔹 Client (.env)

```
VITE_SERVER_URL=http://localhost:3000
```

### 🔹 Server (.env)

```
JWT_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_api_key

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url

STRIPE_PUBLISHABLE_KEY=your_key
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_key
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ASRITH-Forge/promptiq-ai.git
cd promptiq-ai
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run server
```

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔗 API Endpoints

### User

* `POST /api/user/register`
* `POST /api/user/login`
* `GET /api/user/data`

### Chat

* `POST /api/chat/create`
* `GET /api/chat/get`
* `DELETE /api/chat/delete`

### Messages

* `POST /api/message/text`
* `POST /api/message/image`

### Credits

* `GET /api/credit/plan`
* `POST /api/credit/purchase`

---

## 🔒 Security Notes

* Never commit `.env` files
* Use environment variables for all secrets
* Regenerate keys if exposed

---

## 📸 Screens (Optional)

* Chat Interface
* Community Page
* Credits Page

(Add screenshots here for better presentation)

---

## 🎯 Future Improvements

* Real-time chat (WebSockets)
* Chat search optimization
* User profile customization
* Multi-language support

---

## 👨‍💻 Author

**Asrith Raju**
GitHub: https://github.com/ASRITH-Forge

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 📢 Share it

---

## 📄 License

This project is licensed under the MIT License.

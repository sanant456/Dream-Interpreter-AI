# 🌙 Dream Analyzer



**Dream Analyzer** is a full-stack, production-ready web application that leverages artificial intelligence to interpret your dreams using Jungian psychology frameworks. With a sleek, dark futuristic UI/UX designed in Figma, users can securely log their dreams, receive deep psychological interpretations, and maintain an ongoing dream journal.

---

## ✨ Features

- **Deep AI Analysis:** Uses OpenAI to generate structured Jungian insights including archetypes, emotional tone, interpretations, and actionable suggestions.
- **Dark, Futuristic UI:** Built with Tailwind CSS and Framer Motion, featuring smooth animations, glassmorphic elements, and a mystical, space-like aesthetic.
- **Secure Authentication:** Implementation of JWT-based authentication for secure session management.
- **Robust API & Rate Limiting:** Backend built on Express with MVC architecture, request validation (`express-validator`), global error handling, and strict rate limits against abuse.
- **Interactive Dashboard:** Complete with skeleton loaders, toast notifications, and a split-view design for inputting new dreams and viewing history.

---

## 🛠 Tech Stack

**Frontend (`/client`)**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Axios (HTTP client)
- React Router DOM
- React-hot-toast & React-loading-skeleton

**Backend (`/server`)**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs
- OpenAI API
- express-validator & express-rate-limit

---

## 🏗 Architecture (Monorepo)

```bash
📦 dream-analyzer
 ┣ 📂 client                 # Frontend React Application
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components         # Reusable UI components (Navbar, DreamInput, etc.)
 ┃ ┃ ┣ 📂 context            # Auth Context state management
 ┃ ┃ ┣ 📂 pages              # Main views (Landing, Auth, Dashboard)
 ┃ ┃ ┗ 📜 index.css          # Global Tailwind overrides
 ┃ ┗ 📜 tailwind.config.js
 ┃
 ┗ 📂 server                 # Backend Express API
   ┣ 📂 src
   ┃ ┣ 📂 controllers        # Route logic and orchestration
   ┃ ┣ 📂 middleware         # Auth, Rate Limits, Error Handling, Validation
   ┃ ┣ 📂 models             # MongoDB Schemas (User, Dream)
   ┃ ┣ 📂 routes             # API Endpoints mapped to controllers
   ┃ ┗ 📂 services           # External AI API abstractions
   ┗ 📜 server.js            # Entry point
```

---

## 🚀 Setup Steps

### 1. Prerequisites
- Node.js (v16+)
- MongoDB running locally (default: port 27017) or a MongoDB Atlas URI
- An OpenAI API Key

### 2. Installation
Clone the repository, then install dependencies for both the client and server.

```bash
# Terminal 1 - Backend Setup
cd server
npm install
# Create an environment file based on the example
cp .env.example .env 
```

```bash
# Terminal 2 - Frontend Setup
cd client
npm install
```

### 3. Environment Variables
Update the `server/.env` file with your credentials:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/dream-analyzer
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your_openai_api_key_here
```
*(Frontend requires a `.env` file inside `/client` with `VITE_API_URL=http://localhost:5000/api` if deploying, otherwise the default handles localhost).*

### 4. Running the App
Start both servers simultaneously:

```bash
# In /server
npm run start

# In /client
npm run dev
```
Navigate to `http://localhost:5173`.

---

## 🔌 API Endpoints

### Authentication
*   `POST /api/auth/register` - Create a new account.
*   `POST /api/auth/login` - Exchange credentials for a JWT.
*   `GET /api/auth/me` - Fetch authenticated user profile.

### Dreams
*   `POST /api/dreams` - Submit a new dream text for AI interpretation and save it.
*   `GET /api/dreams` - Fetch historical dream logs for the authenticated user.

---

## 📸 Screenshots

### Landing Page
<img width="1470" height="834" alt="Screenshot 2026-04-06 at 4 35 08 PM" src="https://github.com/user-attachments/assets/161aa1df-4c6e-440d-a8ab-e6bdbb62af36" />
<img width="1470" height="712" alt="Screenshot 2026-04-06 at 4 35 46 PM" src="https://github.com/user-attachments/assets/897775cb-39dc-46f8-ba26-f0877275f3e9" />
<img width="1470" height="668" alt="Screenshot 2026-04-06 at 4 36 14 PM" src="https://github.com/user-attachments/assets/bbbd30a9-b063-4127-b6fd-9825582aaa0c" />


### Dashboard & Analysis
<img width="1470" height="833" alt="Screenshot 2026-04-06 at 4 37 22 PM" src="https://github.com/user-attachments/assets/94c2d487-4801-42c0-a923-79db6297b4fc" />


---

*Built by a Senior Full-Stack Engineer for precision, reliability, and scale.*

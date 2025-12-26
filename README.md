# VoiceBrief

**AI-powered voice note summarizer** — Record or upload audio, get instant transcripts with key points and action items.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)

## Features

-  **Record Voice Notes** — Record directly in browser with real-time waveform visualization
-  **Upload Audio Files** — Support for MP3, WAV, M4A, OGG, WebM (up to 50MB)
-  **AI Transcription** — Accurate speech-to-text using AssemblyAI
-  **Smart Summaries** — Structured summaries with key points and action items using Groq
-  **Real-time Updates** — Live status polling during processing
-  **Modern Dark UI** — Beautiful glassmorphism design with teal accents
-  **User Authentication** — JWT-based auth with secure password hashing

##  Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- TailwindCSS v4
- React Router v7

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)
- Cloudinary (audio storage)

### AI Services
- **AssemblyAI** — Speech-to-text transcription
- **Groq** — LLM summarization (Llama 3)

## 📁 Project Structure

```
VoiceBrief/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Auth context
│   │   ├── hooks/            # Custom hooks
│   │   └── services/         # API client
│   └── ...
├── backend/                  # Express backend
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── middlewares/      # Auth, error handling
│   │   └── config/           # DB, Cloudinary, etc.
│   └── ...
└── README.md
```

##  Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- AssemblyAI API key
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/suhaniawasthi10/VoiceBrief.git
   cd VoiceBrief
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

5. **Open** http://localhost:5173

### Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ASSEMBLYAI_API_KEY=your_assemblyai_key
GROQ_API_KEY=your_groq_key
```

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/audio/upload` | Upload audio file |
| GET | `/api/audio/jobs` | List user's jobs |
| GET | `/api/audio/jobs/:id` | Get job status |
| GET | `/api/audio/jobs/:id/result` | Get full result |
| DELETE | `/api/audio/jobs/:id` | Delete a job |

##  Processing Pipeline

```
Upload → Cloudinary → AssemblyAI (ASR) → Groq (LLM) → MongoDB
```

1. User uploads audio file
2. File stored in Cloudinary
3. AssemblyAI transcribes audio to text
4. Groq generates structured summary
5. Results saved and returned to user



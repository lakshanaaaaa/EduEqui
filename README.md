# EduEqui - Accessible Educational Platform

An inclusive, bilingual educational platform designed to provide accessible learning experiences for students with disabilities. Built with React, Flask, and MongoDB.

## 🌟 Features

### Accessibility First
- **Multi-Disability Support**: Vision, hearing, motor, and cognitive disabilities
- **Text-to-Speech**: Real-time TTS for both English and Tamil languages
- **Bilingual Interface**: Full support for English and Tamil
- **Adaptive UI**: Responsive design optimized for various assistive technologies

### Educational Content
- **Multiple Courses**: Mathematics, Science, English, and Tamil
- **Video Lessons**: Embedded video content with transcriptions
- **Interactive Quizzes**: Assessment tools for learning validation
- **Progress Tracking**: Monitor student progress across courses and lessons

### User Management
- **Secure Authentication**: JWT-based authentication system
- **Google OAuth**: Quick sign-in with Google accounts
- **User Profiles**: Customizable profiles with disability preferences
- **Onboarding**: Guided setup for accessibility needs

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Firebase** for Google authentication

### Backend
- **Flask** - Python web framework
- **FastAPI** - High-performance API (alternative backend)
- **MongoDB Atlas** - Cloud database
- **JWT** - Token-based authentication
- **gTTS** - Google Text-to-Speech

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EduEquiFinal/EduEqui
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Backend Setup
```bash
cd frontend/backend
pip install -r requirements.txt
```

### 4. Environment Configuration

#### Frontend Environment (.env)
Create `frontend/.env`:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Backend Environment (.env)
Create `frontend/backend/.env`:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=your_database_name
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
```

## 🎯 Running the Application

### Option 1: Run Both Servers Simultaneously
```bash
cd frontend
npm run dev:all
```

### Option 2: Run Servers Separately

#### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```

#### Terminal 2 - Backend
```bash
cd frontend/backend
python app.py
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
EduEqui/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx         # Main app component
│   ├── backend/
│   │   ├── app.py          # Flask application
│   │   ├── models.py       # Database models
│   │   └── requirements.txt
│   ├── public/             # Static assets
│   └── package.json
├── backend/
│   ├── server.py           # FastAPI server (alternative)
│   └── requirements.txt
└── README.md
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Courses & Lessons
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/lessons` - Get course lessons
- `GET /api/lessons/:id` - Get lesson details

### Text-to-Speech
- `POST /tts` - Convert text to speech (English/Tamil)

### Progress Tracking
- `POST /api/progress` - Save student progress
- `GET /api/students/progress` - Get student progress

## 🎨 Available Courses

1. **Mathematics (கணிதம்)**
   - Introduction to Numbers
   - Addition and Subtraction
   - Multiplication Basics

2. **Science (அறிவியல்)**
   - What is Science?
   - Plants and Animals
   - The Water Cycle

3. **English & Tamil**
   - Language fundamentals
   - Grammar and vocabulary
   - Reading comprehension

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm run test

# Run backend tests
cd frontend/backend
pytest
```

## 🏗️ Building for Production

### Frontend
```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

### Backend
For production deployment, use a WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure environment variable management

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Backend (Heroku/Railway)
1. Add `Procfile`: `web: gunicorn app:app`
2. Set environment variables
3. Deploy from repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Development Team - EduEqui

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB Atlas for database hosting
- Google Text-to-Speech for accessibility features
- Radix UI for accessible component primitives

## 📞 Support

For support, email support@eduequi.com or open an issue in the repository.

---

**Made with ❤️ for accessible education**

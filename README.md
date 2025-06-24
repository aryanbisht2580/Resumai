# ResumAI 🚀

**AI-Powered Resume Generator - Create Professional Resumes in Minutes**

ResumAI is a cutting-edge web application that harnesses the power of artificial intelligence to help job seekers create stunning, professional resumes. With intelligent content suggestions, customizable templates, and real-time previews, ResumAI transforms the resume creation process into a seamless, efficient experience.


## ✨ Features

### 🤖 AI-Powered Intelligence
- **Smart Content Generation**: AI suggests relevant skills, achievements, and descriptions based on your industry
- **Keyword Optimization**: Automatically optimizes your resume for ATS (Applicant Tracking Systems)
- **Content Enhancement**: AI improves existing content for better impact and clarity

### 🎨 Professional Templates
- **Multiple Design Options**: Choose from a variety of modern, professional templates
- **Customizable Layouts**: Adjust colors, fonts, and spacing to match your style
- **Industry-Specific Templates**: Tailored designs for different career fields

### ⚡ Real-Time Experience
- **Live Preview**: See changes instantly as you build your resume
- **Interactive Editor**: Intuitive drag-and-drop interface
- **Auto-Save**: Never lose your progress

### 🔒 Secure & Private
- **User Authentication**: Secure login with JWT-based sessions
- **Data Protection**: Encrypted password storage with bcrypt
- **Privacy First**: Your data stays secure and private

### 📱 Export & Share
- **PDF Export**: Download professional PDF resumes
- **Multiple Formats**: Export in various formats
- **Print-Ready**: Optimized for both digital and print use

## 📸 Screenshots

### 🏠 Homepage
<img width="1468" alt="image" src="https://github.com/user-attachments/assets/932fc65c-2910-43f5-97a5-905af277e4a8" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/18d0cf85-f98d-4e6a-b6f0-f89011ef2702" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/b5e33cef-b1a0-4037-97b2-f1a1aed8d309" />


*Clean and modern landing page showcasing ResumAI's key features and benefits*

### 🔐 Authentication
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/60698d1a-efef-4cb6-8f85-28fb4e8e87e6" />

*Secure sign-in page with social login options* | *Simple registration process with email verification*

### 📊 Dashboard
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/5b81636d-23c6-46b8-af88-a6f3496a597a" />
*User-friendly dashboard showing resume history, templates, and quick actions*

### ✏️ Resume Creation
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/c2d96ffe-2f34-452a-bac3-148fe2dc588f" />

*Interactive resume builder with AI suggestions and real-time preview*


### ⬇️ Download & Export
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/70b3fe88-39f2-4a65-b935-c9717fc8faeb" />

*Multiple export formats with preview before download*

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **Vite** - Fast build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

### AI Integration
- **Google Gemini API** - AI content generation
- **Natural Language Processing** - Content optimization

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryanbisht2580/resumai.git
   cd resumai
   ```

2. **Set up environment variables**

   Create `.env` in the `backend/` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/resumai
   PORT=5001
   JWT_SECRET_KEY=your_secret_key_here
   JWT_SECRET_EXPIRES_IN=7d
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Create `.env.local` in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5001
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Choose your setup method**

   #### Option A: Docker Setup (Recommended)
   ```bash
   # Start with Docker Compose
   docker-compose up -d
   
   # Install frontend dependencies and start
   cd frontend
   npm install
   npm run dev
   ```

   #### Option B: Manual Setup
   ```bash
   # Backend setup
   cd backend
   npm install
   npm run dev
   
   # Frontend setup (in new terminal)
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
resumai/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── store/          # Redux store configuration
│   │   ├── services/       # API service functions
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   └── services/       # Business logic
│   └── config/             # Configuration files
└── docker-compose.yml      # Docker configuration
```

## 🎯 Usage

1. **Sign Up/Login**: Create an account or log in to existing one
2. **Choose Template**: Select from available professional templates
3. **Fill Information**: Add your personal details, experience, education, and skills
4. **AI Enhancement**: Let AI suggest improvements and optimizations
5. **Preview**: Review your resume in real-time
6. **Export**: Download your professional resume as PDF

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/aryanbisht2580/resumai.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

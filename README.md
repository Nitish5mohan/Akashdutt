# Antigravity Drone Startup Website

## Project Overview
This is the repository for the Antigravity (AkashDutt) drone startup website. It consists of a Next.js frontend and a Node.js/Express backend.

## Prerequisites
- **Node.js** (v18 or later)
- **MongoDB** (Local or Atlas)

## Setup Instructions

### 1. Install Dependencies
Since the project structure was created manually, you need to install the dependencies once Node.js is installed.

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/antigravity
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

### 3. Running the Application

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

## Project Structure
- `frontend/`: Next.js application (Pages, Components, Styles)
- `backend/`: Express API (Routes, Controllers, Models)
- `docs/`: Project documentation and planning

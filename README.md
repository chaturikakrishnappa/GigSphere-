# GigSphere - AI Powered Freelancer Marketplace

Full-stack mini Upwork app with React + Node + MongoDB Atlas + JWT auth.

## 1) Project Setup

```bash
mkdir GigSphere
cd GigSphere
```

This repo contains:

- `client` - React + Vite + Tailwind frontend
- `server` - Node + Express + MongoDB backend

## 2) Environment Variables

### Backend (`server/.env`)

Use `server/.env.example` as template.

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`)

Use `client/.env.example` as template.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 3) Run Locally

### Terminal 1 - Backend

```bash
cd server
npm install
npm run dev
```

Backend runs at `http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## 4) Features Included

- Register/Login with JWT
- Role-based users: Client and Freelancer
- Clients can post gigs, view own gigs, view applicants
- Freelancers can browse gigs, apply to gigs, view applications
- AI skill matching score (%) between gig required skills and freelancer skills
- Protected frontend routes
- MongoDB Atlas via Mongoose

## 5) API Routes

- `/api/auth`
- `/api/users`
- `/api/gigs`
- `/api/applications`
- `/api/ai-match`

## 6) GitHub Commands

```bash
git init
git add .
git commit -m "Build complete AI-powered freelancer marketplace with MERN stack"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## 7) Deployment

### Backend to Render

1. Push code to GitHub.
2. In Render: New -> Web Service -> choose repo -> root is `server`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Set env vars:
   - `PORT=5000`
   - `MONGO_URI=...`
   - `JWT_SECRET=...`
   - `CLIENT_URL=https://your-vercel-domain.vercel.app`

### Frontend to Vercel

1. In Vercel: Add New Project -> choose repo -> root is `client`.
2. Framework preset: Vite.
3. Set environment variable:
   - `VITE_API_BASE_URL=https://your-render-service.onrender.com/api`
4. Deploy.


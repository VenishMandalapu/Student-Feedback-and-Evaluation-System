# 🚀 Complete Setup Guide - Student Feedback System

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Database Setup (Supabase)](#database-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running Locally](#running-locally)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (Recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Should show 2.x.x or higher
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd "Student Feedback and Evaluation System/backend"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- Express.js (Web framework)
- Prisma (Database ORM)
- TypeScript
- JWT for authentication
- bcrypt for password hashing
- And all other dependencies

### Step 3: Create Environment File
```bash
# Copy the example file
copy .env.example .env

# Or on Mac/Linux
cp .env.example .env
```

---

## Database Setup (Supabase - FREE)

### Step 1: Create Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. It's **100% FREE** for our use case!

### Step 2: Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: student-feedback-db
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you
   - **Plan**: Free (default)
3. Click "Create new project"
4. Wait 2-3 minutes for setup

### Step 3: Get Database Connection String
1. In your Supabase project, go to **Settings** (gear icon)
2. Click **Database** in the left sidebar
3. Scroll to **Connection string**
4. Select **URI** tab
5. Copy the connection string
6. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

### Step 4: Update .env File
Open `backend/.env` and update:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**Replace:**
- `YOUR_PASSWORD` with your database password
- `xxxxx` with your project reference

### Step 5: Generate Prisma Client
```bash
npm run prisma:generate
```

### Step 6: Run Database Migrations
```bash
npm run prisma:migrate
```

This creates all tables in your database!

### Step 7: (Optional) View Database
```bash
npm run prisma:studio
```

Opens a GUI at `http://localhost:5555` to view your database!

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd ../frontend
# Or from root: cd "Student Feedback and Evaluation System/frontend"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
```bash
# Create .env file
echo VITE_API_URL=http://localhost:5000/api/v1 > .env
```

Or manually create `.env` file with:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## Running Locally

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
✅ Database connected successfully
📝 Environment: development
🌐 API URL: http://localhost:5000/api/v1
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Test the Application
1. Open browser: `http://localhost:5173`
2. You should see the login page
3. Backend API is at: `http://localhost:5000`

---

## Deployment

### Deploy Backend to Render (FREE)

#### Step 1: Push to GitHub
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

#### Step 2: Deploy on Render
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   ```
   Name: student-feedback-api
   Environment: Node
   Build Command: cd backend && npm install && npm run build && npx prisma generate && npx prisma migrate deploy
   Start Command: cd backend && npm start
   Plan: Free
   ```
6. Add Environment Variables:
   - `DATABASE_URL`: Your Supabase connection string
   - `JWT_SECRET`: A random secret key
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel URL (add later)
7. Click "Create Web Service"
8. Wait 5-10 minutes for deployment
9. Copy your Render URL: `https://student-feedback-api.onrender.com`

### Deploy Frontend to Vercel (FREE)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy: Y
- Which scope: Your account
- Link to existing project: N
- Project name: student-feedback-frontend
- Directory: ./
- Override settings: N

#### Step 3: Set Environment Variable
```bash
vercel env add VITE_API_URL production
```

Enter: `https://student-feedback-api.onrender.com/api/v1`

#### Step 4: Deploy to Production
```bash
vercel --prod
```

Your app is live! 🎉

---

## Testing the Deployment

### Test Backend API
```bash
curl https://student-feedback-api.onrender.com/health
```

Should return:
```json
{
  "status": "success",
  "message": "Student Feedback API is running",
  "timestamp": "2025-01-09T..."
}
```

### Test Frontend
Open your Vercel URL in browser

### Test Full Flow
1. Register a new student
2. Login
3. View dashboard
4. All data should come from the backend!

---

## Troubleshooting

### Backend Issues

**Problem**: `Error: P1001: Can't reach database server`
**Solution**: Check your DATABASE_URL in .env file

**Problem**: `Module not found`
**Solution**: Run `npm install` again

**Problem**: `Port 5000 already in use`
**Solution**: Change PORT in .env to 5001

### Frontend Issues

**Problem**: `Failed to fetch`
**Solution**: Make sure backend is running on port 5000

**Problem**: `CORS error`
**Solution**: Check FRONTEND_URL in backend .env matches your frontend URL

### Database Issues

**Problem**: `Prisma Client not generated`
**Solution**: Run `npm run prisma:generate`

**Problem**: `Migration failed`
**Solution**: 
```bash
npx prisma migrate reset
npx prisma migrate dev
```

---

## 📞 Need Help?

### Quick Commands Reference

**Backend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:studio # Open database GUI
```

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Useful Links
- Supabase Dashboard: https://app.supabase.com
- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com/dashboard

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] Backend dependencies installed
- [ ] Supabase account created
- [ ] Database connected
- [ ] Prisma migrations run
- [ ] Frontend dependencies installed
- [ ] Backend running on localhost:5000
- [ ] Frontend running on localhost:5173
- [ ] Can login and see data
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Production app working

---

## Next Steps

1. **Customize**: Update branding, colors, logos
2. **Add Features**: Implement additional functionality
3. **Security**: Add rate limiting, input validation
4. **Testing**: Write unit and integration tests
5. **Monitoring**: Setup error tracking (Sentry)
6. **Analytics**: Add Google Analytics

**Congratulations! Your full-stack app is live! 🚀**

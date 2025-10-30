# Student Feedback System - Backend API

## 🚀 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Deployment**: Render.com (FREE)

## 📁 Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── src/
│   ├── config/
│   │   └── database.ts    # Prisma client
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── studentController.ts
│   │   ├── teacherController.ts
│   │   ├── courseController.ts
│   │   ├── feedbackController.ts
│   │   └── adminController.ts
│   ├── middleware/
│   │   ├── auth.ts        # JWT authentication
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── studentRoutes.ts
│   │   ├── teacherRoutes.ts
│   │   ├── courseRoutes.ts
│   │   ├── feedbackRoutes.ts
│   │   └── adminRoutes.ts
│   ├── utils/
│   │   └── jwt.ts
│   └── server.ts          # Main application
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Supabase (FREE PostgreSQL Database)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for FREE account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
API_VERSION=v1
```

### 4. Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database with sample data
npm run prisma:seed
```

### 5. Run Development Server
```bash
npm run dev
```

Server will start at: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)

### Students
- `GET /api/v1/students` - Get all students (Protected)
- `GET /api/v1/students/:id` - Get student by ID (Protected)
- `POST /api/v1/students` - Create student (Admin only)
- `PUT /api/v1/students/:id` - Update student (Admin only)
- `DELETE /api/v1/students/:id` - Delete student (Admin only)

### Teachers
- `GET /api/v1/teachers` - Get all teachers (Protected)
- `GET /api/v1/teachers/:id` - Get teacher by ID (Protected)
- `POST /api/v1/teachers` - Create teacher (Admin only)
- `PUT /api/v1/teachers/:id` - Update teacher (Admin only)
- `DELETE /api/v1/teachers/:id` - Delete teacher (Admin only)

### Courses
- `GET /api/v1/courses` - Get all courses (Protected)
- `GET /api/v1/courses/:id` - Get course by ID (Protected)
- `POST /api/v1/courses` - Create course (Admin only)
- `PUT /api/v1/courses/:id` - Update course (Admin only)
- `DELETE /api/v1/courses/:id` - Delete course (Admin only)

### Feedback
- `GET /api/v1/feedback/forms` - Get all feedback forms
- `POST /api/v1/feedback/forms` - Create feedback form (Teacher/Admin)
- `POST /api/v1/feedback/submit` - Submit feedback (Student)
- `GET /api/v1/feedback/results/:courseId` - Get feedback results (Teacher/Admin)

## 🔐 Authentication Flow

### Register
```javascript
POST /api/v1/auth/register
{
  "email": "student@example.com",
  "password": "password123",
  "role": "STUDENT",
  "name": "Aarav Kumar",
  "department": "Computer Science",
  "year": 2,
  "semester": 3,
  "rollNo": "CS2001"
}
```

### Login
```javascript
POST /api/v1/auth/login
{
  "email": "student@example.com",
  "password": "password123",
  "role": "STUDENT"
}

Response:
{
  "status": "success",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Protected Requests
```javascript
GET /api/v1/students
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🚀 Deployment (Render.com - FREE)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Render
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: student-feedback-api
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Add Environment Variables (from .env)
7. Click "Create Web Service"

## 📦 Next Steps

### Phase 1: Complete Backend (IN PROGRESS)
- ✅ Project structure
- ✅ Database schema
- ✅ Authentication system
- ⏳ Student controller & routes
- ⏳ Teacher controller & routes
- ⏳ Course controller & routes
- ⏳ Feedback controller & routes
- ⏳ Admin controller & routes

### Phase 2: Frontend Integration
- Update React to use API
- Replace mockData with API calls
- Add axios for HTTP requests
- Implement loading states
- Error handling

### Phase 3: Deployment
- Deploy backend to Render
- Deploy frontend to Vercel
- Setup CI/CD with GitHub Actions
- Configure environment variables

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test registration
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","role":"STUDENT","name":"Test User","department":"Computer Science","year":2,"semester":3,"rollNo":"CS2001"}'

# Test login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 📝 Database Schema

### Users Table
- id, email, password, role, createdAt, updatedAt

### Students Table
- id, userId, name, email, rollNo, department, year, semester, performance, attendance

### Teachers Table
- id, userId, name, email, department

### Courses Table
- id, name, code, department, year, semester, academicYear

### Enrollments Table
- id, studentId, courseId

### Feedback Forms, Questions, Submissions, Answers
- Complete feedback system tables

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run prisma:seed      # Seed database
```

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

MIT

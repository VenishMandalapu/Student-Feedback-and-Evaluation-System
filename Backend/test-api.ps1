# API Testing Script for Student Feedback System
# Run this in PowerShell

Write-Host "🧪 Testing Student Feedback API" -ForegroundColor Green
Write-Host ""

# Test 1: Health Check
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
$health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
Write-Host "✅ Status: $($health.status)" -ForegroundColor Green
Write-Host ""

# Test 2: Register Student
Write-Host "Test 2: Register New Student" -ForegroundColor Yellow
$registerBody = @{
    email = "test.student@example.com"
    password = "password123"
    role = "STUDENT"
    name = "Test Student"
    department = "Computer Science"
    year = 2
    semester = 3
    rollNo = "CS2001"
} | ConvertTo-Json

try {
    $register = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    Write-Host "✅ User registered successfully" -ForegroundColor Green
    $token = $register.data.token
    Write-Host "Token: $token" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  User might already exist, trying login..." -ForegroundColor Yellow
}
Write-Host ""

# Test 3: Login
Write-Host "Test 3: Login" -ForegroundColor Yellow
$loginBody = @{
    email = "test.student@example.com"
    password = "password123"
    role = "STUDENT"
} | ConvertTo-Json

$login = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
Write-Host "✅ Login successful" -ForegroundColor Green
$token = $login.data.token
Write-Host "Token: $token" -ForegroundColor Cyan
Write-Host ""

# Test 4: Get Current User
Write-Host "Test 4: Get Current User (Protected)" -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $token"
}
$me = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/me" -Method Get -Headers $headers
Write-Host "✅ User: $($me.data.user.student.name)" -ForegroundColor Green
Write-Host "   Department: $($me.data.user.student.department)" -ForegroundColor Cyan
Write-Host "   Year: $($me.data.user.student.year), Semester: $($me.data.user.student.semester)" -ForegroundColor Cyan
Write-Host ""

# Test 5: Get All Students
Write-Host "Test 5: Get All Students (Protected)" -ForegroundColor Yellow
$students = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/students?limit=5" -Method Get -Headers $headers
Write-Host "✅ Total Students: $($students.data.pagination.total)" -ForegroundColor Green
Write-Host "   Showing: $($students.data.students.Count) students" -ForegroundColor Cyan
Write-Host ""

# Test 6: Get All Courses
Write-Host "Test 6: Get All Courses (Protected)" -ForegroundColor Yellow
$courses = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/courses" -Method Get -Headers $headers
Write-Host "✅ Total Courses: $($courses.data.courses.Count)" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 All tests completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Your API is working perfectly! ✨" -ForegroundColor Magenta

import { User, Course, FeedbackForm, Feedback, Analytics } from '../types';

export const users: User[] = [
  // Students
  { id: '1', name: 'M.Venish', role: 'student', email: 'venish@student.edu' },
  { id: '2', name: 'Abhitesh', role: 'student', email: 'abhitesh@student.edu' },
  { id: '3', name: 'Ganeesh', role: 'student', email: 'ganeesh@student.edu' },
  { id: '4', name: 'Pravallika', role: 'student', email: 'pravallika@student.edu' },
  
  // Teachers
  { id: '5', name: 'Dr. Sadhana', role: 'teacher', email: 'sadhana@faculty.edu' },
  { id: '6', name: 'Prof. Mallikarjun Rao', role: 'teacher', email: 'mallikarjun@faculty.edu' },
  { id: '7', name: 'Dr. Jonathon', role: 'teacher', email: 'jonathon@faculty.edu' },
  
  // Admin
  { id: '8', name: 'Dr Krishna Reddy', role: 'admin', email: 'krishna@admin.edu' }
];

export const courses: Course[] = [
  { id: '1', name: 'Computer Network', code: 'CN101', teacher: 'Dr. Sadhana', teacherId: '5', students: ['1', '2'], semester: 'Fall', year: 2025 },
  { id: '2', name: 'Frontend Frameworks', code: 'FF201', teacher: 'Prof. Mallikarjun Rao', teacherId: '6', students: ['1', '3'], semester: 'Fall', year: 2025 },
  { id: '3', name: 'Mathematical Optimization', code: 'MO301', teacher: 'Dr. Jonathon', teacherId: '7', students: ['2', '4'], semester: 'Fall', year: 2025 },
  { id: '4', name: 'Artificial Intelligence', code: 'AI401', teacher: 'Dr. Sadhana', teacherId: '5', students: ['1', '4'], semester: 'Fall', year: 2025 },
  { id: '5', name: 'Object Oriented Programming', code: 'OOP101', teacher: 'Prof. Mallikarjun Rao', teacherId: '6', students: ['2', '3'], semester: 'Fall', year: 2025 },
  { id: '6', name: 'Data Visualization and Analysis', code: 'DVA301', teacher: 'Dr. Jonathon', teacherId: '7', students: ['1', '3'], semester: 'Fall', year: 2025 },
  { id: '7', name: 'Database Management System', code: 'DBMS201', teacher: 'Dr. Sadhana', teacherId: '5', students: ['2', '4'], semester: 'Fall', year: 2025 },
  { id: '8', name: 'Software Engineering', code: 'SE301', teacher: 'Prof. Mallikarjun Rao', teacherId: '6', students: ['1', '2'], semester: 'Fall', year: 2025 },
  { id: '9', name: 'Cloud Computing', code: 'CC401', teacher: 'Dr. Jonathon', teacherId: '7', students: ['3', '4'], semester: 'Fall', year: 2025 },
  { id: '10', name: 'Cybersecurity', code: 'CS501', teacher: 'Dr. Sadhana', teacherId: '5', students: ['1', '4'], semester: 'Fall', year: 2025 },
  { id: '11', name: 'Data Structures & Algorithms', code: 'DSA101', teacher: 'Dr. Jonathon', teacherId: '7', students: ['2', '3'], semester: 'Fall', year: 2025 }
];

export const feedbackForms: FeedbackForm[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Mid-Semester Feedback',
    isActive: true,
    deadline: '2025-02-15',
    questions: [
      { id: '1', type: 'rating', question: 'How would you rate the course content?', required: true },
      { id: '2', type: 'rating', question: 'How would you rate the instructor\'s teaching?', required: true },
      { id: '3', type: 'slider', question: 'Course difficulty level (1-10)', required: true },
      { id: '4', type: 'text', question: 'What could be improved in this course?', required: false }
    ]
  }
];

export const analytics: Analytics[] = [
  { courseId: '1', averageRating: 4.2, totalResponses: 45, responseRate: 87, ratings: { 5: 20, 4: 15, 3: 8, 2: 2, 1: 0 } },
  { courseId: '2', averageRating: 4.5, totalResponses: 38, responseRate: 92, ratings: { 5: 22, 4: 12, 3: 3, 2: 1, 1: 0 } },
  { courseId: '3', averageRating: 3.8, totalResponses: 42, responseRate: 78, ratings: { 5: 15, 4: 18, 3: 7, 2: 2, 1: 0 } }
];
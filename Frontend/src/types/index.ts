export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  email: string;
  department?: string;
  assignedCourse?: string;
  year?: number;
  semester?: number;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  semester: number;
  rollNo: string;
  performance: number;
  attendance: number;
  assignedCourses: string[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  teachers: string[]; // Array of teacher names
  teacherIds: string[]; // Array of teacher IDs
  students: string[];
  semester: string;
  year: number;
  department: string;
}

export interface FeedbackForm {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  isActive: boolean;
  deadline: string;
}

export interface Question {
  id: string;
  type: 'rating' | 'multiple-choice' | 'text' | 'slider';
  question: string;
  options?: string[];
  required: boolean;
}

export interface Feedback {
  id: string;
  studentId: string;
  courseId: string;
  formId: string;
  responses: Record<string, any>;
  submittedAt: string;
}

export interface Analytics {
  courseId: string;
  averageRating: number;
  totalResponses: number;
  responseRate: number;
  ratings: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
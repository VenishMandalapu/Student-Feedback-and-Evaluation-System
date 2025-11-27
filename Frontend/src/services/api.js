import { users, studentsData, courses, feedbackForms } from '../data/mockData';

// Mock API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  register: async (data) => {
    await delay(500);
    return { data: { message: 'User registered successfully' } };
  },

  login: async (data) => {
    await delay(500);
    const user = users.find(u => u.email === data.email && u.role.toLowerCase() === data.role.toLowerCase());
    if (user) {
      return { data: { token: 'mock-token', user } };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  getMe: async () => {
    await delay(300);
    // Return first user as mock logged in user
    return { data: users[0] };
  }
};

// Students API
export const studentsAPI = {
  getAll: async (params) => {
    await delay(500);
    return { data: studentsData };
  },

  getById: async (id) => {
    await delay(300);
    const student = studentsData.find(s => s.id === id);
    return { data: student };
  },

  create: async (data) => {
    await delay(300);
    return { data: { message: 'Student created' } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { message: 'Student updated' } };
  },

  delete: async (id) => {
    await delay(300);
    return { data: { message: 'Student deleted' } };
  }
};

// Teachers API
export const teachersAPI = {
  getAll: async (params) => {
    await delay(500);
    const teachers = users.filter(u => u.role === 'teacher');
    return { data: teachers };
  },

  getById: async (id) => {
    await delay(300);
    const teacher = users.find(u => u.id === id && u.role === 'teacher');
    return { data: teacher };
  },

  create: async (data) => {
    await delay(300);
    return { data: { message: 'Teacher created' } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { message: 'Teacher updated' } };
  },

  delete: async (id) => {
    await delay(300);
    return { data: { message: 'Teacher deleted' } };
  }
};

// Courses API
export const coursesAPI = {
  getAll: async () => {
    await delay(500);
    return { data: courses };
  },

  getById: async (id) => {
    await delay(300);
    const course = courses.find(c => c.id === id);
    return { data: course };
  },

  create: async (data) => {
    await delay(300);
    return { data: { message: 'Course created' } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { message: 'Course updated' } };
  },

  delete: async (id) => {
    await delay(300);
    return { data: { message: 'Course deleted' } };
  }
};

// Feedback API
export const feedbackAPI = {
  getForms: async (params) => {
    await delay(500);
    return { data: feedbackForms };
  },

  createForm: async (data) => {
    await delay(300);
    return { data: { message: 'Feedback form created' } };
  },

  submitFeedback: async (data) => {
    await delay(300);
    return { data: { message: 'Feedback submitted' } };
  },

  getResults: async (courseId) => {
    await delay(300);
    return { data: { courseId, results: [] } };
  }
};

// Admin API
export const adminAPI = {
  getDashboard: async () => {
    await delay(500);
    return { data: { message: 'Admin dashboard data' } };
  },

  getAnalytics: async () => {
    await delay(500);
    return { data: { message: 'Admin analytics data' } };
  }
};

export default {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../types';

interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
  filters: {
    department?: string;
    year?: number;
    semester?: string;
  };
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  filters: {},
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.error = null;
    },
    setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action: PayloadAction<Partial<CoursesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<{ id: string; updates: Partial<Course> }>) => {
      const { id, updates } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === id);
      if (courseIndex !== -1) {
        state.courses[courseIndex] = { ...state.courses[courseIndex], ...updates };
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
  },
});

export const {
  setCourses,
  setSelectedCourse,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  addCourse,
  updateCourse,
  deleteCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;

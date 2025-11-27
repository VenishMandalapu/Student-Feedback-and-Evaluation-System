import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.error = null;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const { id, updates } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === id);
      if (courseIndex !== -1) {
        state.courses[courseIndex] = { ...state.courses[courseIndex], ...updates };
      }
    },
    deleteCourse: (state, action) => {
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

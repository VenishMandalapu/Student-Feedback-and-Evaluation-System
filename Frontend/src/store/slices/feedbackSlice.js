import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedbackForms: [],
  submittedFeedback: [],
  loading: false,
  error: null,
  selectedForm: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFeedbackForms: (state, action) => {
      state.feedbackForms = action.payload;
      state.error = null;
    },
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addFeedbackForm: (state, action) => {
      state.feedbackForms.push(action.payload);
    },
    updateFeedbackForm: (state, action) => {
      const { id, updates } = action.payload;
      const formIndex = state.feedbackForms.findIndex(form => form.id === id);
      if (formIndex !== -1) {
        state.feedbackForms[formIndex] = { ...state.feedbackForms[formIndex], ...updates };
      }
    },
    deleteFeedbackForm: (state, action) => {
      state.feedbackForms = state.feedbackForms.filter(form => form.id !== action.payload);
    },
    submitFeedback: (state, action) => {
      state.submittedFeedback.push(action.payload);
    },
    clearSubmittedFeedback: (state) => {
      state.submittedFeedback = [];
    },
  },
});

export const {
  setFeedbackForms,
  setSelectedForm,
  setLoading,
  setError,
  addFeedbackForm,
  updateFeedbackForm,
  deleteFeedbackForm,
  submitFeedback,
  clearSubmittedFeedback,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;

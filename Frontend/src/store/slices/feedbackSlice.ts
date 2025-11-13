import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackForm } from '../../types';

interface FeedbackState {
  feedbackForms: FeedbackForm[];
  submittedFeedback: any[];
  loading: boolean;
  error: string | null;
  selectedForm: FeedbackForm | null;
}

const initialState: FeedbackState = {
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
    setFeedbackForms: (state, action: PayloadAction<FeedbackForm[]>) => {
      state.feedbackForms = action.payload;
      state.error = null;
    },
    setSelectedForm: (state, action: PayloadAction<FeedbackForm | null>) => {
      state.selectedForm = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addFeedbackForm: (state, action: PayloadAction<FeedbackForm>) => {
      state.feedbackForms.push(action.payload);
    },
    updateFeedbackForm: (state, action: PayloadAction<{ id: string; updates: Partial<FeedbackForm> }>) => {
      const { id, updates } = action.payload;
      const formIndex = state.feedbackForms.findIndex(form => form.id === id);
      if (formIndex !== -1) {
        state.feedbackForms[formIndex] = { ...state.feedbackForms[formIndex], ...updates };
      }
    },
    deleteFeedbackForm: (state, action: PayloadAction<string>) => {
      state.feedbackForms = state.feedbackForms.filter(form => form.id !== action.payload);
    },
    submitFeedback: (state, action: PayloadAction<any>) => {
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

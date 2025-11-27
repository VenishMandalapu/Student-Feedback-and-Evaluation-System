import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import coursesReducer from './slices/coursesSlice';
import feedbackReducer from './slices/feedbackSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    feedback: feedbackReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

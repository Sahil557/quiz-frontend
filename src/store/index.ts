import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import createUserReducer from './slices/createUserSlice';
import questionReducer from './slices/createQuestionSlice';
import questionsListReducer from './slices/getQuestionsSlice';
import submitAnswerReducer from "./slices/submitAnswerSlice";
import quizResultReducer from "./slices/quizResultSlice";

export const store = configureStore({
  reducer: {
     auth: authReducer,
     createUser: createUserReducer,
     question: questionReducer,
     questionsList: questionsListReducer,
     submitAnswer: submitAnswerReducer,
     quizResult: quizResultReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

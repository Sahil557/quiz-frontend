import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface QuestionState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  question?: any;
}

const initialState: QuestionState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  question: undefined,
};

export const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async (
    data: { questionText: string; options: string[]; correctAnswer: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/questions', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    resetCreateQuestion: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.question = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.question = action.payload;
        state.message = 'Question created successfully';
      })
      .addCase(createQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateQuestion } = questionSlice.actions;

export default questionSlice.reducer;

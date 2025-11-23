import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

interface QuizResultState {
  loading: boolean;
  error: string | null;
  total: number | null;
  correct: number | null;
}

const initialState: QuizResultState = {
  loading: false,
  error: null,
  total: null,
  correct: null,
};

export const fetchQuizResult = createAsyncThunk(
  "quiz/result",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/quiz/result");
      return res.data; // { total, correct }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch result");
    }
  }
);

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState,
  reducers: {
    resetQuizResult: (state) => {
      state.loading = false;
      state.error = null;
      state.total = null;
      state.correct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizResult.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.correct = action.payload.correct;
      })
      .addCase(fetchQuizResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetQuizResult } = quizResultSlice.actions;
export default quizResultSlice.reducer;

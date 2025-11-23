import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

interface SubmitAnswerPayload {
  questionId: number;
  userAnswer: string;
}

interface SubmitState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userAnswer: string | null;
  correctAnswer: string | null;
}

const initialState: SubmitState = {
  loading: false,
  success: false,
  error: null,
  userAnswer: null,
  correctAnswer: null,
};

export const submitAnswer = createAsyncThunk(
  "quiz/submitAnswer",
  async (payload: SubmitAnswerPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/quiz/submit", payload);
      return { userAnswer: payload.userAnswer, correctAnswer: res.data.correctAnswer };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit answer");
    }
  }
);

const submitAnswerSlice = createSlice({
  name: "submitAnswer",
  initialState,
  reducers: {
    resetSubmitAnswer: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userAnswer = null;
      state.correctAnswer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userAnswer = action.payload.userAnswer;
        state.correctAnswer = action.payload.correctAnswer;
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userAnswer = null;
        state.correctAnswer = null;
      });
  },
});

export const { resetSubmitAnswer } = submitAnswerSlice.actions;
export default submitAnswerSlice.reducer;

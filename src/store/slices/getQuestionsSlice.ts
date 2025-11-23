import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

interface QuestionData {
  id: number;
  questionText: string;
  options: string[];
}

interface QuestionsState {
  questions: QuestionData[];
  page: number;
  limit: number;
  totalQuestions: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  page: 1,
  limit: 1,
  totalQuestions: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (params: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const page = params.page || 1;
      const limit = params.limit || 1;

      const response = await api.get(`/questions?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch questions");
    }
  }
);

const getQuestionsSlice = createSlice({
  name: "questionsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;

        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.totalQuestions = action.payload.totalQuestions;
        state.questions = action.payload.questions; // array
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getQuestionsSlice.reducer;

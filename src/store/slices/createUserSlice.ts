import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

interface CreateUserState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  user: User | null;
}

const initialState: CreateUserState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  user: null,
};

export const createUser = createAsyncThunk(
  'createUser/createUser',
  async (
    userData: { name: string; email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('auth/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const createUserSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
    resetCreateUser: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
        state.user = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<{ message: string; user: User }>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = null;
        state.user = null;
      });
  },
});

export const { resetCreateUser } = createUserSlice.actions;
export default createUserSlice.reducer;

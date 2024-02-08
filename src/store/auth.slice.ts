import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { supabase } from 'src/lib/supabase';

import { AuthUserType, AuthStateType } from './types';

const initialState: AuthStateType = {
  user: null,
  loading: false,
  error: null,
};

export const _initialize = createAsyncThunk('/init', async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error){
    localStorage.removeItem('accessToken');
    throw new Error(error.message);
  }
  const accessToken = localStorage.getItem('accessToken') || null;
  if (!accessToken) window.location.reload();
  return data;
});

export const _login = createAsyncThunk('/login', async ({ email, password }: {
  email: string;
  password: string
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  localStorage.setItem('accessToken', data?.session?.access_token || '')
  return data;
});

export const _logout = createAsyncThunk('/logout', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  localStorage.clear();
  window.location.reload();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder
      .addCase(_initialize.fulfilled, (state, action: PayloadAction<AuthUserType | null>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(_logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(_login.fulfilled, (state, action: PayloadAction<AuthUserType>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(_login.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(_logout.pending, (state) => {
        state.loading = true;
      });
  },
});

export const logout = () => _logout();
export const login = (email: string, password: string) => _login({ email, password });

export default authSlice.reducer;


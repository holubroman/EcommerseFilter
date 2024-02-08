import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchResource } from '../api/fetch';

interface Category {
  id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

const fetchCategories = async () => {
  try {
    const categoryResponse = await fetchResource('categories', 6);
    return categoryResponse?.data;
  } catch (error) {
    throw new Error('An error occurred while fetching categories.');
  }
};

export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchCategories',
  async () => fetchCategories()
);

interface CategoriesState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong. Please try again later.';
      })
  },
});

export const selectCategories = createSelector(
  (state: { categories: CategoriesState }) => state.categories.categories,
  (state: { categories: CategoriesState }) => state.categories.status,
  (state: { categories: CategoriesState }) => state.categories.error,
  (categories, status, error) => ({
    categories,
    status,
    error,
  })
);

export default categoriesSlice.reducer;

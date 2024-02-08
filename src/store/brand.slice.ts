import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchResource } from '../api/fetch';

interface Brand {
  id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

const fetchBrands = async () => {
  try {
    const categoryResponse = await fetchResource('brands', 6);
    return categoryResponse?.data;
  } catch (error) {
    throw new Error('An error occurred while fetching brands.');
  }
};

export const fetchBrandsAsync = createAsyncThunk(
  'brands/fetchBrands',
  async () => fetchBrands()
);

interface BrandsState {
  brands: Brand[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BrandsState = {
  brands: [],
  status: 'idle',
  error: null,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong. Please try again later.';
      })
  },
});

export const selectBrands = createSelector(
  (state: { brands: BrandsState }) => state.brands.brands,
  (state: { brands: BrandsState }) => state.brands.status,
  (state: { brands: BrandsState }) => state.brands.error,
  (brands, status, error) => ({
    brands,
    status,
    error,
  })
);

export default brandsSlice.reducer;

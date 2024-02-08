import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchResource } from '../api/fetch';
import { IProductItem } from '../types/product';

const fetchProducts = async () => {
  try {
    const categoryResponse = await fetchResource('products', 100);
    return categoryResponse?.data;
  } catch (error) {
    throw new Error('An error occurred while fetching products.');
  }
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => fetchProducts()
);

interface ProductsState {
  products: IProductItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong. Please try again later.';
      })
  },
});


export const selectProducts = createSelector(
  (state: { products: ProductsState }) => state.products.products,
  (state: { products: ProductsState }) => state.products.status,
  (state: { products: ProductsState }) => state.products.error,
  (products, status, error) => ({
    products,
    status,
    error,
  })
);

export default productsSlice.reducer;

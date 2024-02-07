import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from './auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: authReducer,
    products: authReducer,
    form: reduxFormReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


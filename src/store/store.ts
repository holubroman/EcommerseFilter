import { configureStore } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from './auth.slice';
import brandReducer from './brand.slice';
import productReducer from './product.slice';
import categoryReducer from './category.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: reduxFormReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
  },
});




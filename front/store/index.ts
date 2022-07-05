import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import customerReducer from './reducers/CustomerSlice';
import productReducer from './reducers/ProductSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    customer: customerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

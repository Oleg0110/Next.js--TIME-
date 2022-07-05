import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomerState,
  ICustomer,
} from '../../utils/interface/customerinterface';
import { getSearchCustomer } from '../services/CustomerService';

const initialState: CustomerState = {
  customer: {} as ICustomer,
  customerSearch: [],
  isLoading: false,
  error: '',
};

export const customerReducer = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchCustomer.fulfilled.type]: (
      state,
      action: PayloadAction<ICustomer[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.customerSearch = action.payload;
    },
    [getSearchCustomer.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getSearchCustomer.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default customerReducer.reducer;

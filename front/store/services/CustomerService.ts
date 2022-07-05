import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN_CUSTOMER_MANAGEMENT } from '../../utils/httpLinks';
import axios from 'axios';
import { ICustomer } from '../../utils/interface/customerinterface';

export const getSearchCustomer = createAsyncThunk(
  'admin/getSearchCustomer',
  async (searchValue: string, thunkApi) => {
    try {
      console.log(1, searchValue);

      const res = await axios.get<ICustomer[]>(
        `${ADMIN_CUSTOMER_MANAGEMENT}/${searchValue}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

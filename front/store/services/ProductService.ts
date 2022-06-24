import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ROUTES } from '../../utils/constants';
import { ADMIN_ADD_PRODUCT, BASIC_URL } from '../../utils/httpLinks';
import { IProduct } from '../../utils/interface/productInterface';

export const getSaleProduct = createAsyncThunk(
  'home/getSaleProduct',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(`${BASIC_URL}`);
      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'admin/addProduct',
  async (
    product: Omit<IProduct, 'id' | 'date' | 'productMainPictures'>,
    thunkApi
  ) => {
    try {
      const res = await axios.post<IProduct>(`${ADMIN_ADD_PRODUCT}`, product);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getSearchProduct = createAsyncThunk(
  'admin/getSearchProduct',
  async (text: string, thunkApi) => {
    try {
      console.log(text);

      const res = await axios.get<IProduct[]>(
        `${BASIC_URL}${ROUTES.adminPage}/${text}`
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

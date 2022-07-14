import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN_USER_MANAGEMENT, BASIC_URL } from '../../utils/httpLinks';
import axios from 'axios';
import {
  IUser,
  IUserInitialOrder,
  IUserOrder,
} from '../../utils/interface/userInterface';
import { IProductInBag } from '../../utils/interface/productInterface';

interface ICreateOrder {
  userOrderData: IUserInitialOrder;
  orderProducts: IProductInBag[];
  totalPrice: number;
}

export const getSearchUser = createAsyncThunk(
  'admin/getSearchUser',
  async (searchValue: string, thunkApi) => {
    try {
      console.log(1, searchValue);

      const res = await axios.get<IUser[]>(
        `${ADMIN_USER_MANAGEMENT}/${searchValue}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'user/createOrder',
  async (arg: ICreateOrder, thunkApi) => {
    try {
      const res = await axios.post<IUserOrder[]>(
        `${BASIC_URL}/delivery-details/create-order`,
        arg
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

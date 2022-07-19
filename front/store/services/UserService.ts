import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN_USER_MANAGEMENT, BASIC_URL } from '../../utils/httpLinks';
import axios from 'axios';
import {
  AuthResponse,
  IUser,
  IUserOrder,
} from '../../utils/interface/userInterface';
import {
  ICreateOrder,
  ILoginArg,
  IRegistrationArg,
} from '../../utils/interface/serviceInterface';
import { ROUTES, token } from '../../utils/constants';
import $api from '../../http';

export const registration = createAsyncThunk(
  'user/registration',
  async (arg: IRegistrationArg, thunkApi) => {
    try {
      const res = await $api.post<AuthResponse>(`/registration`, arg);

      localStorage.setItem(token, res.data.tokens.accessToken);

      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (arg: ILoginArg, thunkApi) => {
    try {
      const { email, password } = arg;

      const res = await $api.post<AuthResponse>(`/login`, {
        email,
        password,
      });

      localStorage.setItem(token, res.data.tokens.accessToken);

      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    const res = await $api.post<void>(`/logout`);
    localStorage.removeItem(token);

    return {} as IUser;
  } catch (error) {
    return thunkApi.rejectWithValue((error as Error).message);
  }
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<AuthResponse>(`${BASIC_URL}/refreshToken`, {
        withCredentials: true,
      });

      localStorage.setItem(token, res.data.tokens.accessToken);

      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getSearchUser = createAsyncThunk(
  'admin/getSearchUser',
  async (searchValue: string, thunkApi) => {
    try {
      // const res = await axios.get<IUser[]>(
      //   `${ADMIN_USER_MANAGEMENT}/${searchValue}`
      // );

      const res = await $api.get<IUser[]>(
        `${ROUTES.adminPage}${ROUTES.adminUsersManagement}/${searchValue}`
      );

      console.log(res);

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

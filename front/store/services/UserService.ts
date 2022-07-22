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
import { IProductOrder } from '../../utils/interface/productInterface';

// Get
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

export const getOrders = createAsyncThunk(
  'user/getOrders',
  async (userId: string, thunkApi) => {
    try {
      const res = await axios.get<IProductOrder[]>(
        `${BASIC_URL}/get-orders/${userId}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const checkPassword = createAsyncThunk(
  'user/checkPassword',
  async (
    arg: {
      userId: string;
      password: string;
    },
    thunkApi
  ) => {
    try {
      const { password, userId } = arg;

      const res = await axios.get<boolean>(
        `${BASIC_URL}/check-password/${userId}/${password}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const sendConfirmCode = createAsyncThunk(
  'user/sendConfirmCode',
  async ({ userId, code }: { userId: string; code: string }, thunkApi) => {
    try {
      console.log(userId, code);

      const res = await axios.get<boolean>(
        `${BASIC_URL}/send-confirm-code/${userId}/${code}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

// Post
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

// Patch
export const changeUserData = createAsyncThunk(
  'user/change',
  async (
    arg: {
      userId: string;
      value: string;
      changeWhat: 'name' | 'surname' | 'email' | 'phone' | 'password';
    },
    thunkApi
  ) => {
    try {
      const res = await axios.patch<IUser>(
        `${BASIC_URL}/change-user-data`,
        arg
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const addPhoneNumber = createAsyncThunk(
  'user/addPhoneNumber',
  async (
    arg: {
      userId: string;
      phone: string;
    },
    thunkApi
  ) => {
    try {
      const res = await axios.patch<IUser>(`${BASIC_URL}/add-user-phone`, arg);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

//Delete

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, thunkApi) => {
    try {
      const res = await $api.delete<void>(`/delete-user/${userId}`);

      localStorage.removeItem(token);

      return {} as IUser;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

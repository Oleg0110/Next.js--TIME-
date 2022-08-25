import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADD_USER_PHONE,
  ADMIN_USER_MANAGEMENT,
  BASIC_URL,
  CHANGE_USER_DATA,
  CHECK_PASSWORD,
  CREATE_ORDER,
  GET_ORDERS,
  GET_TEAM,
  REFRESH_TOKEN,
  REMOVE_USER_ASSIGNMENT,
  SEND_CONFIRM_CODE,
  USER_ASSIGNMENT,
} from '../../utils/httpLinks';
import {
  AuthResponse,
  IUser,
  IUserOrder,
} from '../../utils/interface/userInterface';
import {
  IAddPhoneArg,
  IChangeUserArg,
  ICheckPasswordArg,
  ICreateOrder,
  ILoginArg,
  IRegistrationArg,
  ISendCodeArg,
} from '../../utils/interface/serviceInterface';
import {
  ROUTES,
  tokenLocalStorageName,
  userDataName,
} from '../../utils/constants';
import { IProductOrder } from '../../utils/interface/productInterface';
import axios from 'axios';
import $api from '../../http';

// Get
export const getUser = createAsyncThunk('user/getUser', async (_, thunkApi) => {
  try {
    const res = await $api.get<IUser>(`/get-user`);

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue((error as Error).message);
  }
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<AuthResponse>(REFRESH_TOKEN, {
        withCredentials: true,
      });

      localStorage.setItem(tokenLocalStorageName, res.data.tokens.accessToken);
      localStorage.setItem(userDataName, JSON.stringify(res.data.user));

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
      const res = await $api.get<IUser[]>(
        `${ADMIN_USER_MANAGEMENT}/${searchValue}`
      );

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
      const res = await $api.get<IProductOrder[]>(`${GET_ORDERS}/${userId}`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const checkPassword = createAsyncThunk(
  'user/checkPassword',
  async (arg: ICheckPasswordArg, thunkApi) => {
    try {
      const { password, userId } = arg;

      const res = await $api.get<boolean>(
        `${CHECK_PASSWORD}/${userId}/${password}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const sendConfirmCode = createAsyncThunk(
  'user/sendConfirmCode',
  async ({ userId, code }: ISendCodeArg, thunkApi) => {
    try {
      const res = await $api.get<boolean>(
        `${SEND_CONFIRM_CODE}/${userId}/${code}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getUserInTeam = createAsyncThunk(
  'user/getUserInTeam',
  async (_, thunkApi) => {
    try {
      const res = await $api.get<IUser[]>(GET_TEAM);

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
      const res = await $api.post<AuthResponse>(ROUTES.registration, arg);

      localStorage.setItem(tokenLocalStorageName, res.data.tokens.accessToken);
      localStorage.setItem(userDataName, JSON.stringify(res.data.user));

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

      const res = await $api.post<AuthResponse>(ROUTES.login, {
        email,
        password,
      });

      localStorage.setItem(tokenLocalStorageName, res.data.tokens.accessToken);
      localStorage.setItem(userDataName, JSON.stringify(res.data.user));

      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    const res = await $api.post<void>(ROUTES.logout);

    localStorage.removeItem(tokenLocalStorageName);
    localStorage.removeItem(userDataName);

    return {} as IUser;
  } catch (error) {
    return thunkApi.rejectWithValue((error as Error).message);
  }
});

export const createOrder = createAsyncThunk(
  'user/createOrder',
  async (arg: ICreateOrder, thunkApi) => {
    try {
      const res = await axios.post<IUserOrder[]>(`${CREATE_ORDER}`, arg);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

// Patch
export const changeUserData = createAsyncThunk(
  'user/change',
  async (arg: IChangeUserArg, thunkApi) => {
    try {
      const res = await $api.patch<IUser>(CHANGE_USER_DATA, arg);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const addPhoneNumber = createAsyncThunk(
  'user/addPhoneNumber',
  async (arg: IAddPhoneArg, thunkApi) => {
    try {
      const res = await $api.patch<IUser>(ADD_USER_PHONE, arg);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const userAssignment = createAsyncThunk(
  'user/userAssignment',
  async (userId: string, thunkApi) => {
    try {
      const res = await $api.patch<IUser[]>(USER_ASSIGNMENT, { userId });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const removeAssignmentAdmin = createAsyncThunk(
  'user/removeAssignmentAdmin',
  async (userId: string, thunkApi) => {
    try {
      const res = await $api.patch<IUser[]>(REMOVE_USER_ASSIGNMENT, {
        userId,
      });

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
      const res = await $api.delete<void>(`${ROUTES.deleteUser}/${userId}`);

      localStorage.removeItem(tokenLocalStorageName);

      return {} as IUser;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   ADD_USER_PHONE,
//   ADMIN_USER_MANAGEMENT,
//   BASIC_URL,
//   CHANGE_USER_DATA,
//   CHECK_PASSWORD,
//   CREATE_ORDER,
//   GET_ORDERS,
//   GET_TEAM,
//   REFRESH_TOKEN,
//   REMOVE_USER_ASSIGNMENT,
//   SEND_CONFIRM_CODE,
//   USER_ASSIGNMENT,
// } from '../../utils/httpLinks';
// import axios from 'axios';
// import {
//   AuthResponse,
//   IUser,
//   IUserOrder,
// } from '../../utils/interface/userInterface';
// import {
//   IAddPhoneArg,
//   IChangeUserArg,
//   ICheckPasswordArg,
//   ICreateOrder,
//   ILoginArg,
//   IRegistrationArg,
//   ISendCodeArg,
// } from '../../utils/interface/serviceInterface';
// import { ROUTES, token, userDataName } from '../../utils/constants';
// import $api from '../../http';
// import { IProductOrder } from '../../utils/interface/productInterface';

// // Gets
// export const checkAuth = createAsyncThunk(
//   'user/checkAuth',
//   async (_, thunkApi) => {
//     try {
//       console.log('check');

//       const res = await axios.get<AuthResponse>(`${BASIC_URL}/refreshToken`, {
//         withCredentials: true,
//       });

//       console.log(res.data);

//       localStorage.setItem(token, res.data.tokens.accessToken);
//       localStorage.setItem(userDataName, JSON.stringify(res.data.user));

//       return res.data.user;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const getSearchUser = createAsyncThunk(
//   'admin/getSearchUser',
//   async (searchValue: string, thunkApi) => {
//     try {
//       // const res = await axios.get<IUser[]>(
//       //   `${ADMIN_USER_MANAGEMENT}/${searchValue}`
//       // );

//       const res = await $api.get<IUser[]>(
//         `${ROUTES.adminPage}${ROUTES.adminUsersManagement}/${searchValue}`
//       );

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const getOrders = createAsyncThunk(
//   'user/getOrders',
//   async (userId: string, thunkApi) => {
//     try {
//       const res = await axios.get<IProductOrder[]>(`${GET_ORDERS}/${userId}`);

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const checkPassword = createAsyncThunk(
//   'user/checkPassword',
//   async (arg: ICheckPasswordArg, thunkApi) => {
//     try {
//       const { password, userId } = arg;

//       const res = await axios.get<boolean>(
//         `${CHECK_PASSWORD}/${userId}/${password}`
//       );

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const sendConfirmCode = createAsyncThunk(
//   'user/sendConfirmCode',
//   async ({ userId, code }: ISendCodeArg, thunkApi) => {
//     try {
//       const res = await axios.get<boolean>(
//         `${SEND_CONFIRM_CODE}/${userId}/${code}`
//       );

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const getUserInTeam = createAsyncThunk(
//   'user/getUserInTeam',
//   async (_, thunkApi) => {
//     try {
//       const res = await axios.get<IUser[]>(GET_TEAM);

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// // Post
// export const registration = createAsyncThunk(
//   'user/registration',
//   async (arg: IRegistrationArg, thunkApi) => {
//     try {
//       const res = await $api.post<AuthResponse>(ROUTES.registration, arg);

//       localStorage.setItem(token, res.data.tokens.accessToken);
//       localStorage.setItem(userDataName, JSON.stringify(res.data.user));

//       return res.data.user;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'user/login',
//   async (arg: ILoginArg, thunkApi) => {
//     try {
//       const { email, password } = arg;

//       const res = await $api.post<AuthResponse>(ROUTES.login, {
//         email,
//         password,
//       });

//       localStorage.setItem(token, res.data.tokens.accessToken);
//       localStorage.setItem(userDataName, JSON.stringify(res.data.user));

//       return res.data.user;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
//   try {
//     const res = await $api.post<void>(ROUTES.logout);

//     localStorage.removeItem(token);
//     localStorage.removeItem(userDataName);

//     return {} as IUser;
//   } catch (error) {
//     return thunkApi.rejectWithValue((error as Error).message);
//   }
// });

// export const createOrder = createAsyncThunk(
//   'user/createOrder',
//   async (arg: ICreateOrder, thunkApi) => {
//     try {
//       const res = await axios.post<IUserOrder[]>(CREATE_ORDER, arg);

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// // Patch
// export const changeUserData = createAsyncThunk(
//   'user/change',
//   async (arg: IChangeUserArg, thunkApi) => {
//     try {
//       const res = await axios.patch<IUser>(CHANGE_USER_DATA, arg);

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const addPhoneNumber = createAsyncThunk(
//   'user/addPhoneNumber',
//   async (arg: IAddPhoneArg, thunkApi) => {
//     try {
//       const res = await axios.patch<IUser>(ADD_USER_PHONE, arg);

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const userAssignment = createAsyncThunk(
//   'user/userAssignment',
//   async (userId: string, thunkApi) => {
//     try {
//       const res = await axios.patch<IUser[]>(USER_ASSIGNMENT, { userId });

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const removeAssignmentAdmin = createAsyncThunk(
//   'user/removeAssignmentAdmin',
//   async (userId: string, thunkApi) => {
//     try {
//       const res = await axios.patch<IUser[]>(REMOVE_USER_ASSIGNMENT, {
//         userId,
//       });

//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );

// //Delete

// export const deleteUser = createAsyncThunk(
//   'user/deleteUser',
//   async (userId: string, thunkApi) => {
//     try {
//       const res = await $api.delete<void>(`${ROUTES.deleteUser}/${userId}`);

//       localStorage.removeItem(token);

//       return {} as IUser;
//     } catch (error) {
//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN_USER_MANAGEMENT, BASIC_URL } from '../../utils/httpLinks';
import axios from 'axios';
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
import { ROUTES, token } from '../../utils/constants';
import $api from '../../http';
import { IProductOrder } from '../../utils/interface/productInterface';

// Gets
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkApi) => {
    try {
      console.log('check');

      const res = await axios.get<AuthResponse>(`${BASIC_URL}/refreshToken`, {
        withCredentials: true,
      });

      console.log(res.data);

      localStorage.setItem(token, res.data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));

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
  async (arg: ICheckPasswordArg, thunkApi) => {
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
  async ({ userId, code }: ISendCodeArg, thunkApi) => {
    try {
      const res = await axios.get<boolean>(
        `${BASIC_URL}/send-confirm-code/${userId}/${code}`
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
      const res = await axios.get<IUser[]>(
        `http://localhost:5000/administration-page/users-management/team/get-user-in-team`
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
      localStorage.setItem('user', JSON.stringify(res.data.user));

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
      localStorage.setItem('user', JSON.stringify(res.data.user));

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
    localStorage.removeItem('user');

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
  async (arg: IChangeUserArg, thunkApi) => {
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
  async (arg: IAddPhoneArg, thunkApi) => {
    try {
      const res = await axios.patch<IUser>(`${BASIC_URL}/add-user-phone`, arg);

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
      const res = await axios.patch<IUser[]>(
        `http://localhost:5000/administration-page/users-management/team/user-assignment`,
        { userId }
      );

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
      const res = await axios.patch<IUser[]>(
        `http://localhost:5000/administration-page/users-management/team/remove-user-assignment`,
        { userId }
      );

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

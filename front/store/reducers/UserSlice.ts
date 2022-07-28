import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductOrder } from '../../utils/interface/productInterface';
import { UserState, IUser } from '../../utils/interface/userInterface';
import {
  addPhoneNumber,
  changeUserData,
  checkAuth,
  checkPassword,
  deleteUser,
  getOrders,
  getSearchUser,
  getUserInTeam,
  login,
  logout,
  registration,
  removeAssignmentAdmin,
  sendConfirmCode,
  userAssignment,
} from '../services/UserService';

const initialState: UserState = {
  user: {} as IUser,
  userSearch: [],
  userInTeam: [],
  userOrders: [],
  isAuth: false,
  isLoading: false,
  isOrdersLoading: false,
  isCodeLoading: false,
  error: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    //Get Requests
    [registration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
    },
    [registration.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
    },
    [checkAuth.pending.type]: (state) => {
      state.isLoading = true;
    },
    [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getSearchUser.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.userSearch = action.payload;
    },
    [getSearchUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getSearchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUserInTeam.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.userInTeam = action.payload;
    },
    [getUserInTeam.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUserInTeam.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getOrders.fulfilled.type]: (
      state,
      action: PayloadAction<IProductOrder[]>
    ) => {
      state.isOrdersLoading = false;
      state.error = '';
      state.userOrders = action.payload;
    },
    [getOrders.pending.type]: (state) => {
      state.isOrdersLoading = true;
    },
    [getOrders.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isOrdersLoading = false;
      state.error = action.payload;
    },
    [checkPassword.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [checkPassword.pending.type]: (state) => {
      state.isLoading = true;
    },
    [checkPassword.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [sendConfirmCode.fulfilled.type]: (state) => {
      state.isCodeLoading = false;
      state.error = '';
    },
    [sendConfirmCode.pending.type]: (state) => {
      state.isCodeLoading = true;
    },
    [sendConfirmCode.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isCodeLoading = false;
      state.error = action.payload;
    },

    //Post Requests
    [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
    },
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [logout.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = false;
    },
    [logout.pending.type]: (state) => {
      state.isLoading = true;
    },
    [logout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Patch Requests
    [userAssignment.fulfilled.type]: (
      state,
      action: PayloadAction<IUser[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.userInTeam = action.payload;
    },
    [userAssignment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userAssignment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeAssignmentAdmin.fulfilled.type]: (
      state,
      action: PayloadAction<IUser[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.userInTeam = action.payload;
    },
    [removeAssignmentAdmin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [removeAssignmentAdmin.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [changeUserData.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [changeUserData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeUserData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addPhoneNumber.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [addPhoneNumber.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addPhoneNumber.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Delete Requests
    [deleteUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = false;
    },
    [deleteUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userReducer.reducer;

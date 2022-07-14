import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, IUser } from '../../utils/interface/userInterface';
import { getSearchUser } from '../services/UserService';

const initialState: UserState = {
  user: {} as IUser,
  userSearch: [],
  isLoading: false,
  error: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
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
  },
});

export default userReducer.reducer;

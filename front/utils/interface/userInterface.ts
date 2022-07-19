import { IProduct, IProductInBag } from './productInterface';

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  userRole: 'user' | 'admin' | 'owner';
  isActive: boolean;
}

export interface IUserInitialOrder {
  userName: string;
  userSurname: string;
  userRegion: string;
  userAddress: string;
  userPhone: string;
  userCity: string;
  userEmail: string;
}

export interface IUserOrder {
  id: string;
  orderNumber: string;
  orderProducts: IProductInBag[];
  orderStatus: boolean;
  userName: string;
  userSurname: string;
  userRegion: string;
  userAddress: string;
  userPhone: string;
  userCity: string;
  userEmail: string;
  totalPrice: number;
}

export interface UserState {
  user: IUser;
  userSearch: IUser[];
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: IUser;
  tokens: UserTokens;
}

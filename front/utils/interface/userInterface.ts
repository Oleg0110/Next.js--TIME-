import { IProduct, IProductInBag, IProductOrder } from './productInterface';

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  userRole: 'user' | 'admin' | 'owner';
  isActive: boolean;
  phone?: string;
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
  userOrders: IProductOrder[];
  isAuth: boolean;
  isLoading: boolean;
  isOrdersLoading: boolean;
  isCodeLoading: boolean;
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

export interface IChangeProps {
  name?: boolean;
  surname?: boolean;
  email?: boolean;
  phone?: boolean;
  delete?: boolean;
  password?: boolean;
}

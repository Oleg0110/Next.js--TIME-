import { IProductInBag } from './productInterface';

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  userRole: [];
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
  isLoading: boolean;
  error: string;
}

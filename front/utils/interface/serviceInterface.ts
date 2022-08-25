import { SortType } from '../types/product';
import { IProduct, IProductFilter, IProductInBag } from './productInterface';
import { IUserInitialOrder } from './userInterface';

//Product
export interface IAddArg {
  product: Omit<IProduct, 'id' | 'date' | 'productNumber'>;
  photoFile: any[];
  mainPhoto: any;
}

export interface IAddReviewArg {
  comment: string;
  productId: string;
  userId: string;
  rating: number;
}

export interface IGetProductsArg {
  category: string;
  page?: string;
  filters: IProductFilter;
  sorting: SortType;
  productCount?: number;
}

export interface IGetReviewArg {
  productId: string;
  category: string;
}

export interface IGetRecommendedArg {
  style: string;
  category: string;
}

export interface IDeleteArg {
  productId: string;
  searchValue: string;
}

export interface IChangeProductArg {
  productId: string;
  product: Omit<IProduct, 'id' | 'date' | 'productNumber'>;
  searchValue: string;
  photoFile: any[];
  mainPhoto: any;
}

export interface IFilterArg {
  filter: IProductFilter;
  category: string;
  page?: string;
}

export interface IChangeOrderArg {
  orderId: string;
  orderStatus: boolean;
}

export interface IChangeResponse {
  message: string;
  products: IProduct[];
  changedProduct: IProduct;
}

export interface IDeleteResponse {
  message: string;
  deletedProduct: IProduct[];
}

export interface IAddProductResponse {
  message: string;
  product: IProduct;
}

export interface ICreateOrder {
  userOrderData: IUserInitialOrder;
  orderProducts: IProductInBag[];
  totalPrice: number;
  userId?: string;
}

export interface IFavoriteArg {
  productId?: string;
  favoriteId?: string;
  userId: string;
}

export interface GetProductsResponse {
  products: IProduct[];
  countProducts: number;
}

//User
export interface IRegistrationArg {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ILoginArg {
  email: string;
  password: string;
}
export interface ICheckPasswordArg {
  userId: string;
  password: string;
}

export interface IAddPhoneArg {
  userId: string;
  phone: string;
}

export interface ISendCodeArg {
  userId: string;
  code: string;
}

export interface IChangeUserArg {
  userId: string;
  value: string;
  changeWhat: 'name' | 'surname' | 'email' | 'phone' | 'password';
}

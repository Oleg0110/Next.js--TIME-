import { ProductColor, ProductMaterial, ProductStyle } from '../types/product';

export interface IProduct {
  id: string;
  productName: string;
  productNumber: string;
  productFor: 'men' | 'women';
  productPrice: number;
  productDiscountPrice: number;
  productSale: boolean;
  productNew: boolean;
  productSize: number[];
  productColor: ProductColor;
  productMainPictures: any;
  productDescription: string;
  productStyleName: ProductStyle;
  productStyleMaterial: ProductMaterial;
  date: null | any;
}

export interface IProductPhoto {
  id: string;
  productId: string;
  photoName: string[];
}

export interface IProductInBag {
  price: number;
  productId: string;
  productName: string;
  productPhoto: string;
  productFor: string;
  salePrice: number;
  sizeProduct: number;
  productAmount: number;
}

export interface IProductFilter {
  productSize: number[];
  productColor: string[];
  productStyleName: string[];
  productStyleMaterial: string[];
  productPriceFrom: number;
  productPriceTo: number;
}

export interface IProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  date: number;
}

export interface IProductOrder {
  id: string;
  orderNumber: string;
  userName: string;
  userSurname: string;
  userRegion: string;
  userAddress: string;
  userPhone: string;
  userCity: string;
  userEmail: string;
  orderProducts: IProductInBag[];
  orderStatus: boolean;
  totalPrice: number;
  userId?: string;
}

export interface ProductState {
  products: IProduct[];
  productsSale: IProduct[];
  productSearch: IProduct[];
  productReviews: IProductReview[];
  productsRecommended: IProduct[];
  productInBag: IProductInBag[];
  ordersUnconfirmed: IProductOrder[];
  ordersConfirmed: IProductOrder[];
  productsFavorite: IFavorite[];
  countProducts: number;
  isLoading: boolean;
  isPaginationLoading: boolean;
  error: string;
}

export interface IFavorite {
  id: string;
  userId: string;
  product: IProduct;
}

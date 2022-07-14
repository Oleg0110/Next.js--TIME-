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

export interface ProductState {
  products: IProduct[];
  productsSale: IProduct[];
  productSearch: IProduct[];
  productReviews: IProductReview[];
  productsRecommended: IProduct[];
  productInBag: IProductInBag[];
  isLoading: boolean;
  error: string;
}

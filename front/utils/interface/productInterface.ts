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
  productMainPictures: string;
  productDescription: string;
  productStyleName: ProductStyle;
  productStyleMaterial: ProductMaterial;
  date: null | any;
}

export interface IProductFilter {
  productSize: number[];
  productColor: string[];
  productStyleName: string[];
  productStyleMaterial: string[];
  // productPrice: { from: number; to: number };
  productPriceFrom: number;
  productPriceTo: number;
}

export interface ProductState {
  products: IProduct[];
  productsSale: IProduct[];
  productSearch: IProduct[];
  isLoading: boolean;
  error: string;
}

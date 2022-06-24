import { ProductColor, ProductMaterial, ProductStyle } from '../types/product';

export interface IProduct {
  id: string;
  productName: string;
  productFor: 'mens' | 'womens';
  productPrice: number;
  productDiscountPrice: number;
  productSale: boolean;
  productNew: boolean;
  productSize: number[];
  productColor: ProductColor;
  productMainPictures: string[];
  productDescription: string;
  productStyleName: ProductStyle;
  productStyleMaterial: ProductMaterial;
  date: null | any;
}

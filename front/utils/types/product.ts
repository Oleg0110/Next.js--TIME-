import { IProduct } from '../interface/productInterface';

export interface ProductState {
  products: IProduct[];
  productsSale: IProduct[];
  productSearch: IProduct[];
  isLoading: boolean;
  error: string;
}

export type ProductColor =
  | 'black'
  | 'white'
  | 'gray'
  | 'brown'
  | 'blue'
  | 'pink'
  | 'green';

export type ProductStyle =
  | 'sneakers'
  | 'loafers'
  | 'boots'
  | 'bootforts'
  | 'sandals'
  | 'footwear'
  | 'slippers';

export type ProductMaterial =
  | 'genuine leather'
  | 'eco leather'
  | 'leather'
  | 'suede'
  | 'nylon'
  | 'velor'
  | 'artificial materials'
  | 'fiber';

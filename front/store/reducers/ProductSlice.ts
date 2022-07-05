import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, ProductState } from '../../utils/interface/productInterface';
import {
  changeProduct,
  deleteProduct,
  filterProducts,
  getProducts,
  getSaleProduct,
  getSearchProduct,
} from '../services/ProductService';

const initialState: ProductState = {
  products: [],
  productsSale: [],
  productSearch: [],
  isLoading: false,
  error: '',
};

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [getSaleProduct.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productsSale = action.payload;
    },
    [getSaleProduct.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getSaleProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProducts.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload;
    },
    [getProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getSearchProduct.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productSearch = action.payload;
    },
    [getSearchProduct.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getSearchProduct.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [changeProduct.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productSearch = action.payload;
    },
    [changeProduct.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteProduct.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productSearch = action.payload;
    },
    [deleteProduct.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [filterProducts.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload;
    },
    [filterProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [filterProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productReducer.reducer;

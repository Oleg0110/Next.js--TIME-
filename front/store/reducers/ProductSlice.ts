import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFavorite,
  IProduct,
  IProductInBag,
  IProductOrder,
  IProductReview,
  ProductState,
} from '../../utils/interface/productInterface';
import {
  addReview,
  changeOrderStatus,
  changeProduct,
  deleteProduct,
  filterProducts,
  getConfirmedOrders,
  getUnconfirmedOrders,
  getProducts,
  getRecommendedProducts,
  getReview,
  getSaleProduct,
  getSearchProduct,
  addToFavorite,
  getFavorite,
  removeFromFavorite,
} from '../services/ProductService';

const initialState: ProductState = {
  products: [],
  productsSale: [],
  productSearch: [],
  productReviews: [],
  productsRecommended: [],
  ordersUnconfirmed: [],
  ordersConfirmed: [],
  productInBag: [],
  productsFavorite: [],
  isLoading: false,
  error: '',
};

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductInShoppingBag: (
      state,
      action: PayloadAction<IProductInBag[]>
    ) => {
      state.productInBag = action.payload;
    },
    clearFavorite: (state, action: PayloadAction<[]>) => {
      console.log(action.payload);

      state.productsFavorite = action.payload;
    },
  },
  extraReducers: {
    // Get Requests
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
    [getReview.fulfilled.type]: (
      state,
      action: PayloadAction<IProductReview[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productReviews = action.payload;
    },
    [getReview.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getReview.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getRecommendedProducts.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productsRecommended = action.payload;
    },
    [getRecommendedProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getRecommendedProducts.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUnconfirmedOrders.fulfilled.type]: (
      state,
      action: PayloadAction<IProductOrder[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.ordersUnconfirmed = action.payload;
    },
    [getUnconfirmedOrders.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUnconfirmedOrders.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getConfirmedOrders.fulfilled.type]: (
      state,
      action: PayloadAction<IProductOrder[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.ordersConfirmed = action.payload;
    },
    [getConfirmedOrders.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getConfirmedOrders.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getFavorite.fulfilled.type]: (
      state,
      action: PayloadAction<IFavorite[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productsFavorite = action.payload;
    },
    [getFavorite.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getFavorite.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Post Requests
    [addReview.fulfilled.type]: (
      state,
      action: PayloadAction<IProductReview[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productReviews = action.payload;
    },
    [addReview.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addReview.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addToFavorite.fulfilled.type]: (
      state,
      action: PayloadAction<IFavorite[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productsFavorite = action.payload;
    },
    [addToFavorite.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addToFavorite.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Patch Requests
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
    [changeOrderStatus.fulfilled.type]: (
      state,
      action: PayloadAction<IProductOrder[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.ordersUnconfirmed = action.payload;
    },
    [changeOrderStatus.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeOrderStatus.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Delete Requests
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
    [removeFromFavorite.fulfilled.type]: (
      state,
      action: PayloadAction<IFavorite[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productsFavorite = action.payload;
    },
    [removeFromFavorite.pending.type]: (state) => {
      state.isLoading = true;
    },
    [removeFromFavorite.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setProductInShoppingBag, clearFavorite } =
  productReducer.actions;

export default productReducer.reducer;

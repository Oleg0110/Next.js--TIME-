import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../utils/interface/productInterface';
import { ProductState } from '../../utils/types/product';
import { getSaleProduct } from '../services/ProductService';

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
  },
});

export default productReducer.reducer;

// export const productReducer = (
//   state = initialState,
//   action: ProductAction
// ): ProductState => {
//   switch (action.type) {
//     case ProductActionTypes.FETCH_PRODUCT_ERROR:
//       return { ...state, error: action.payload };
//     case ProductActionTypes.GET_SALE:
//       return { ...state, productsSale: action.payload };
//     case ProductActionTypes.GET:
//       return { ...state, products: action.payload };
//     case ProductActionTypes.FILTER:
//       return { ...state, products: action.payload };
//     case ProductActionTypes.ADMIN_GET_PRODUCT:
//       return { ...state, products: action.payload };
//     case ProductActionTypes.ADMIN_ADD_PRODUCT:
//       return { ...state, products: action.payload };
//     case ProductActionTypes.ADMIN_CHANGE_PRODUCT:
//       return { ...state, products: action.payload };
//     case ProductActionTypes.ADMIN_DELETE_PRODUCT:
//       return { ...state, products: action.payload };
//     default:
//       return state;
//   }
// };

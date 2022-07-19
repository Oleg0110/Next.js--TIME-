import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADMIN_ADD_PRODUCT,
  ADMIN_CHANGE_PRODUCT,
  ADMIN_DELETE_PRODUCT,
  ADMIN_PAGE,
  BASIC_URL,
  GET_PRODUCTS,
} from '../../utils/httpLinks';
import {
  IProduct,
  IProductFilter,
  IProductOrder,
  IProductReview,
} from '../../utils/interface/productInterface';
import axios from 'axios';
import {
  IAddArg,
  IAddProductResponse,
  IAddReviewArg,
  IChangeOrderArg,
  IChangeProductArg,
  IChangeResponse,
  ICreateOrder,
  IDeleteArg,
  IDeleteResponse,
  IFilterArg,
  IGetProductsArg,
  IGetRecommendedArg,
  IGetReviewArg,
} from '../../utils/interface/serviceInterface';

// Get Requests
export const getSaleProduct = createAsyncThunk(
  'home/getSaleProduct',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(`${BASIC_URL}`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async ({ category, page }: IGetProductsArg, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(
        `${GET_PRODUCTS}/${category}/${page}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (productId: string, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(`${GET_PRODUCTS}/${productId}`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getSearchProduct = createAsyncThunk(
  'admin/getSearchProduct',
  async (searchValue: string, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(`${ADMIN_PAGE}/${searchValue}`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const filterProducts = createAsyncThunk(
  'product/filterProducts',
  async (arg: IFilterArg, thunkApi) => {
    try {
      const { filter, category, page } = arg;

      const res = await axios.get<IProduct[]>(`${GET_PRODUCTS}/${category}`, {
        params: {
          filter,
          category,
          page,
        },
      });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getReview = createAsyncThunk(
  'product/getReview',
  async (arg: IGetReviewArg, thunkApi) => {
    try {
      const { category, productId } = arg;

      const res = await axios.get<IProductReview[]>(
        `${GET_PRODUCTS}/${category}/get-review/${productId}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getRecommendedProducts = createAsyncThunk(
  'product/getRecommendedProducts',
  async (arg: IGetRecommendedArg, thunkApi) => {
    try {
      const { category, style } = arg;

      const res = await axios.get<IProduct[]>(
        `${GET_PRODUCTS}/${category}/get-recommended/${style}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getUnconfirmedOrders = createAsyncThunk(
  'product/getUnconfirmedOrders',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<IProductOrder[]>(
        `${BASIC_URL}/get-unconfirmed-orders`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getConfirmedOrders = createAsyncThunk(
  'product/getConfirmedOrders',
  async (searchValue: string, thunkApi) => {
    try {
      const res = await axios.get<IProductOrder[]>(
        `${BASIC_URL}/administration-page/get-confirmed-orders/${searchValue}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

// Post Requests

export const addProduct = createAsyncThunk(
  'admin/addProduct',
  async (arg: IAddArg, thunkApi) => {
    try {
      const { product, photoFile } = arg;

      let formData = new FormData();

      formData.append('file', product.productMainPictures[0]);
      formData.append('product', JSON.stringify({ ...product }));

      const res = await axios.post<IAddProductResponse>(
        `${ADMIN_ADD_PRODUCT}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data; application/json',
          },
        }
      );

      const productData = res.data.product;

      let countPhoto = 0;

      if (productData) {
        photoFile.forEach(async (data) => {
          let formData = new FormData();

          formData.append('file', data);
          formData.append('productId', productData.id);

          const res = await axios.post(
            `${ADMIN_ADD_PRODUCT}/add-photos`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          res.data && countPhoto++;
        });
      }

      if (countPhoto === photoFile.length) {
        return res.data.product;
      }
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const addReview = createAsyncThunk(
  'product/addReview',
  async (arg: IAddReviewArg, thunkApi) => {
    try {
      const res = await axios.post<IProductReview[]>(
        `${GET_PRODUCTS}/add-review`,
        arg
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

// Patch Requests

export const changeProduct = createAsyncThunk(
  'admin/changeProduct',
  async (arg: IChangeProductArg, thunkApi) => {
    try {
      const { productId, product, searchValue } = arg;

      const res = await axios.patch<IChangeResponse>(ADMIN_CHANGE_PRODUCT, {
        productId,
        product,
        searchValue,
      });

      return res.data.changedProduct;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  'admin/changeOrderStatus',
  async (arg: IChangeOrderArg, thunkApi) => {
    try {
      const { orderId, orderStatus } = arg;

      const res = await axios.patch<IProductOrder[]>(
        `${BASIC_URL}/administration-page/change-order-status`,
        {
          orderId,
          orderStatus,
        }
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

// Delete Request

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (arg: IDeleteArg, thunkApi) => {
    try {
      const { productId, searchValue } = arg;

      const res = await axios.delete<IDeleteResponse>(
        `${ADMIN_DELETE_PRODUCT}/${productId}/${searchValue}`
      );

      return res.data.deletedProduct;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

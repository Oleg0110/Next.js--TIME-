import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADD_PRODUCT_TO_FAVORITE,
  ADMIN_ADD_PRODUCT,
  ADMIN_ADD_PRODUCT_PHOTOS,
  ADMIN_CHANGE_ORDER_STATUS,
  ADMIN_CHANGE_PRODUCT,
  ADMIN_DELETE_PRODUCT,
  BASIC_URL,
  GET_CONFIRMED_ORDERS,
  GET_FAVORITE_PRODUCTS,
  GET_PRODUCTS,
  GET_UNCONFIRMED_ORDERS,
  REMOVE_PRODUCT_FROM_FAVORITE,
} from '../../utils/httpLinks';
import {
  IFavorite,
  IProduct,
  IProductOrder,
  IProductReview,
} from '../../utils/interface/productInterface';
import {
  GetProductsResponse,
  IAddArg,
  IAddProductResponse,
  IAddReviewArg,
  IChangeOrderArg,
  IChangeProductArg,
  IChangeResponse,
  IDeleteArg,
  IDeleteResponse,
  IFavoriteArg,
  IGetProductsArg,
  IGetRecommendedArg,
  IGetReviewArg,
} from '../../utils/interface/serviceInterface';
import { ROUTES } from '../../utils/constants';
import axios from 'axios';
import $api from '../../http';

// Get Requests
export const getSaleProduct = createAsyncThunk(
  'home/getSaleProduct',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(BASIC_URL);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async ({ category, page, filters, sorting }: IGetProductsArg, thunkApi) => {
    try {
      const limit = 5;

      const res = await axios.get<GetProductsResponse>(
        `${GET_PRODUCTS}/${category}`,
        {
          params: {
            filters,
            category,
            page,
            limit,
            sorting,
          },
        }
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const paginationProductFunc = createAsyncThunk(
  'product/getProductsTest',
  async (
    { category, page, filters, productCount, sorting }: IGetProductsArg,
    thunkApi
  ) => {
    try {
      const res = await axios.get<GetProductsResponse>(
        `${GET_PRODUCTS}/${category}/posts?start=${productCount}&limit=5`,
        {
          params: {
            filters,
            category,
            page,
            sorting,
          },
        }
      );

      return res.data.products;
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
      const res = await $api.get<IProduct[]>(
        `${ROUTES.adminPage}/${searchValue}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const globalProductSearch = createAsyncThunk(
  'product/globalProductSearch',
  async (searchValue: string, thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(
        `${BASIC_URL}/product-search/${searchValue}`
      );

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
      const res = await $api.get<IProductOrder[]>(GET_UNCONFIRMED_ORDERS);

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
      const res = await $api.get<IProductOrder[]>(
        `${GET_CONFIRMED_ORDERS}/${searchValue}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getFavorite = createAsyncThunk(
  'product/getFavorite',
  async (userId: string, thunkApi) => {
    try {
      const res = await $api.get<IFavorite[]>(
        `${GET_FAVORITE_PRODUCTS}/${userId}`
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

      const res = await $api.post<IAddProductResponse>(
        ADMIN_ADD_PRODUCT,
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

          const res = await $api.post(ADMIN_ADD_PRODUCT_PHOTOS, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          res.data && countPhoto++;
        });
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

export const addToFavorite = createAsyncThunk(
  'product/addToFavorite',
  async (arg: IFavoriteArg, thunkApi) => {
    try {
      const res = await $api.post<IFavorite[]>(ADD_PRODUCT_TO_FAVORITE, arg);

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
      const { productId, product, searchValue, photoFile } = arg;

      let formData = new FormData();

      formData.append('file', product.productMainPictures[0]);
      formData.append('product', JSON.stringify({ ...product }));
      formData.append('productId', productId);
      formData.append('searchValue', searchValue);

      const res = await $api.patch<IChangeResponse>(
        ADMIN_CHANGE_PRODUCT,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data; application/json',
          },
        }
      );

      const productData = res.data.changedProduct;

      let countPhoto = 0;

      if (productData) {
        photoFile.forEach(async (data) => {
          let formData = new FormData();

          formData.append('file', data);
          formData.append('productId', productData.id);

          const res = await $api.post(ADMIN_ADD_PRODUCT_PHOTOS, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          res.data && countPhoto++;
        });
      }

      return res.data.products;
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

      const res = await $api.patch<IProductOrder[]>(ADMIN_CHANGE_ORDER_STATUS, {
        orderId,
        orderStatus,
      });

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

      const res = await $api.delete<IDeleteResponse>(
        `${ADMIN_DELETE_PRODUCT}/${productId}/${searchValue}`
      );

      return res.data.deletedProduct;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  'product/removeFromFavorite',
  async (arg: IFavoriteArg, thunkApi) => {
    try {
      const { favoriteId, userId } = arg;

      const res = await $api.delete<IFavorite[]>(
        `${REMOVE_PRODUCT_FROM_FAVORITE}/${favoriteId}/${userId}`
      );

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

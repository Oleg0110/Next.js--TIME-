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
  IProductReview,
} from '../../utils/interface/productInterface';
import axios from 'axios';

type ChangeType = {
  message: string;
  changedProduct: IProduct[];
};

type DeleteType = {
  message: string;
  deletedProduct: IProduct[];
};

interface IDeleteArg {
  productId: string;
  searchValue: string;
}

interface IChangeArg {
  productId: string;
  product: Omit<
    IProduct,
    'id' | 'date' | 'productMainPictures' | 'productNumber'
  >;
  searchValue: string;
}

interface IFilterArg {
  filter: IProductFilter;
  category: string;
}

type AddProductType = {
  message: string;
  product: IProduct;
};

interface IAddArg {
  product: Omit<IProduct, 'id' | 'date' | 'productNumber'>;
  photoFile: any[];
}

interface IAddReviewArg {
  comment: string;
  productId: string;
  userId: string;
  rating: number;
}
interface IGetReviewArg {
  productId: string;
  category: string;
}

interface IGetRecommendedArg {
  style: string;
  category: string;
}

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
  async (category: string | string[], thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(`${GET_PRODUCTS}/${category}`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (productId: string | string[], thunkApi) => {
    try {
      const res = await axios.get<IProduct[]>(`${GET_PRODUCTS}/${productId}`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'admin/addProduct',
  async (arg: IAddArg, thunkApi) => {
    try {
      const { product, photoFile } = arg;

      // const res = await axios.post<AddProductType>(ADMIN_ADD_PRODUCT, product);

      let formData = new FormData();

      formData.append('file', product.productMainPictures[0]);
      formData.append('product', JSON.stringify({ ...product }));

      const res = await axios.post<AddProductType>(
        `${ADMIN_ADD_PRODUCT}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data; application/json',
          },
        }
      );

      console.log(res.data.product);

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

export const changeProduct = createAsyncThunk(
  'admin/changeProduct',
  async (arg: IChangeArg, thunkApi) => {
    try {
      const { productId, product, searchValue } = arg;

      const res = await axios.patch<ChangeType>(ADMIN_CHANGE_PRODUCT, {
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

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (arg: IDeleteArg, thunkApi) => {
    try {
      const { productId, searchValue } = arg;

      const res = await axios.delete<DeleteType>(
        `${ADMIN_DELETE_PRODUCT}/${productId}/${searchValue}`
      );

      return res.data.deletedProduct;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const filterProducts = createAsyncThunk(
  'product/filterProducts',
  async (arg: IFilterArg, thunkApi) => {
    try {
      const { filter, category } = arg;

      const res = await axios.get<IProduct[]>(
        `${GET_PRODUCTS}/${category}/${filter}`,
        {
          params: {
            filter,
            category,
          },
        }
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

export const addReview = createAsyncThunk(
  'product/addReview',
  async (arg: IAddReviewArg, thunkApi) => {
    try {
      const res = await axios.post<IProductReview[]>(
        `${GET_PRODUCTS}/add-review`,
        arg
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

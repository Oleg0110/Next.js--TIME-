import { toast } from 'react-toastify';
import { setProductInShoppingBag } from '../store/reducers/ProductSlice';
import {
  getFavorite,
  getUnconfirmedOrders,
} from '../store/services/ProductService';
import { shoppingBagDataName, userDataName } from './constants';
import { IProductInBag } from './interface/productInterface';
import { IUser } from './interface/userInterface';

export const firstLetterUpper = (category: string) => {
  let str;

  if (category === 'women' || category === 'men') {
    str = category.split('')[0].toLocaleUpperCase() + category.slice(1);
  } else {
    const firstLetter =
      category.split('-')[0].split('')[0].toLocaleUpperCase() +
      category.split('-')[0].slice(1);

    const secondLetter =
      category.split('-')[1].split('')[0].toLocaleUpperCase() +
      category.split('-')[1].slice(1);

    str = `${firstLetter} ${secondLetter}`;
  }

  return str;
};

export const includesSizeFunc = (where, what) => {
  let obj;

  const notAreInArray = where
    .filter((i) => !what?.includes(i))
    .map((data) => (obj = { size: data, is: false }));

  const areInArray = where
    .filter((i) => what?.includes(i))
    .map((data) => (obj = { size: data, is: true }));

  const sizes = []
    .concat(notAreInArray, areInArray)
    .sort((a, b) => a.size - b.size);

  return sizes;
};

export const getAverageRating = (productReviews) => {
  let count = 0;
  let average = 0;
  if (productReviews) {
    for (let i = 0; i < productReviews.length; i++) {
      const rev = productReviews[i];
      count += rev.rating;
    }
    average = Math.round(count / productReviews.length);
  }

  return average;
};

export const setInShoppingBag = async (
  dispatch,
  sizeProduct,
  productId,
  productName,
  productPhoto,
  salePrice,
  price,
  productFor
) => {
  const ISSERVER = typeof window === 'undefined';
  if (!ISSERVER) {
    const arr: IProductInBag[] =
      JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

    arr.push({
      productId,
      productName,
      sizeProduct,
      productPhoto,
      salePrice,
      price,
      productAmount: 1,
      productFor,
    });

    localStorage.setItem(shoppingBagDataName, JSON.stringify(arr));

    const newArr = JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];
    await dispatch(setProductInShoppingBag(newArr));
    toast.success('Add to Shopping Bag');
  }
};

export const removeFromBag = async (productId, dispatch) => {
  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    const arr: IProductInBag[] =
      JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

    const findIndex = arr.findIndex((f) => f.productId === productId);

    arr.splice(findIndex, 1);

    localStorage.setItem(shoppingBagDataName, JSON.stringify(arr));

    const newArr = JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

    await dispatch(setProductInShoppingBag(newArr));
    toast.success('Remove from Shopping Bag');
  }
};

export const cleanBag = (dispatch) => {
  localStorage.setItem(shoppingBagDataName, JSON.stringify([]));

  dispatch(setProductInShoppingBag([]));
};

export const totalPriceFunc = (productInBag: IProductInBag[]) => {
  let totalPrice: number = 0;

  for (let i = 0; i < productInBag.length; i++) {
    if (productInBag[i].salePrice !== 0) {
      totalPrice += productInBag[i].salePrice;
    } else {
      totalPrice += productInBag[i].price;
    }
  }

  return totalPrice;
};

export const getFavoriteAndOrders = (dispatch) => {
  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    const user: IUser = JSON.parse(localStorage.getItem(userDataName));

    user && dispatch(getFavorite(user.id));

    if (user && (user.userRole === 'admin' || user.userRole === 'owner')) {
      dispatch(getUnconfirmedOrders());
    }
  }
};

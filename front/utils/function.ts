import { setProductInBag } from '../store/reducers/ProductSlice';
import { shoppingBagDataName } from './constants';
import { IProduct } from './interface/productInterface';
import { SortType } from './types/product';

export const firstLetterUpper = (category: string | string[]) => {
  const str = JSON.parse(JSON.stringify(category));
  let word;

  if (str) {
    word = str.split('')[0].toLocaleUpperCase() + str.slice(1);
  }
  return word;
};

export const includesSizeFunc = (where, what) => {
  let obj;

  const notAreInArray = where
    .filter((i) => !what.includes(i))
    .map((data) => (obj = { size: data, is: false }));

  const areInArray = where
    .filter((i) => what.includes(i))
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

export const removeFromBag = (productId, dispatch) => {
  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    const arr = JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

    const findId = arr.findIndex((f) => f === productId);
    arr.splice(findId, 1);

    localStorage.setItem(shoppingBagDataName, JSON.stringify(arr));

    const newArr = JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

    dispatch(setProductInBag(newArr));
    return true;
  }
};

const discountSort = (copyArrProduct: IProduct[]) => {
  const sorted = copyArrProduct
    .map((data) => {
      let percentageSale;
      if (data.productSale === true) {
        percentageSale = Math.floor(
          100 - (data.productDiscountPrice * 100) / data.productPrice
        );
      } else {
        percentageSale = 0;
      }

      return { ...data, percentageSale };
    })
    .sort((a, b) => b.percentageSale - a.percentageSale);

  return sorted;
};

export const sortProduct = (product: IProduct[], sort: SortType) => {
  const copyArrProduct: IProduct[] = JSON.parse(JSON.stringify(product));

  switch (sort) {
    case 'cheap to expensive':
      return copyArrProduct.sort((a, b) => a.productPrice - b.productPrice);

    case 'expensive to cheap':
      return copyArrProduct.sort((a, b) => b.productPrice - a.productPrice);

    case 'novelty':
      return copyArrProduct.sort((a, b) => b.date - a.date);

    case 'maximum discount':
      return discountSort(copyArrProduct);

    default:
      break;
  }
};

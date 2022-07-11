import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FilterMenu from '../../components/FilterMenu';
import ProductOnPage from '../../components/ProductOnPage';
import SortingMenu from '../../components/SortingMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import MainLayout from '../../layouts/MainLayout';
import { getProducts } from '../../store/services/ProductService';
import {
  CategoryBox,
  InfoProductBox,
  MainContentProductBox,
  MainProductContainer,
  ProductContentBox,
  SortingFilterBox,
} from '../../styles/product';
import { Colors } from '../../styles/theme';
import {
  filterDataName,
  filterReset,
  sortingDataName,
} from '../../utils/constants';
import { firstLetterUpper, sortProduct } from '../../utils/function';
import { BASIC_URL, GET_PRODUCTS } from '../../utils/httpLinks';
import { IProduct } from '../../utils/interface/productInterface';
import { SortType } from '../../utils/types/product';
import Error from '../404';

export const getServerSideProps = async (context) => {
  const category = context.query.category;
  const res = await fetch(`${GET_PRODUCTS}/${category}`);

  const products: IProduct[] = await res.json();

  return {
    props: {
      products,
      category,
      ...(await serverSideTranslations(context.locale, ['common', 'filters'])),
    },
  };
};

interface ICategoryPage {
  products: IProduct[];
  category: string | string[];
}

const CategoryPage: NextPage<ICategoryPage> = ({}) => {
  let sorting;
  const router = useRouter();
  const category = router.query.category;
  const categoryStr = JSON.parse(JSON.stringify(category));
  const categoryTitle = firstLetterUpper(categoryStr);

  const dispatch = useAppDispatch();

  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    const localCategory = localStorage.getItem('category');
    sorting = localStorage.getItem(sortingDataName);

    if (category !== localCategory) {
      localStorage.setItem(filterDataName, JSON.stringify(filterReset));
      localStorage.setItem(sortingDataName, 'empty');
      sorting = 'empty';
    }
    localStorage.setItem('category', categoryStr);
  }

  const [isActive, setIsActive] = useState<SortType>(sorting);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getProducts(categoryStr));
    };

    getData();

    setIsActive(sorting);
  }, [categoryStr, getProducts, dispatch]);

  const { products } = useAppSelector((state) => state.product);

  const sortedProduct: IProduct[] =
    isActive !== 'empty' && products
      ? sortProduct(products, isActive)
      : products;

  return (
    <MainLayout>
      <MainProductContainer>
        <InfoProductBox>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            {categoryTitle} shoes
          </Typography>
          <CategoryBox>
            <Typography
              variant="roboto30300"
              sx={{ textAlign: 'start', color: Colors.black }}
            >
              {categoryTitle} / {categoryTitle} shoes
            </Typography>
            <SortingFilterBox>
              <Typography
                variant="roboto24200"
                onClick={() => {
                  setIsSortingOpen(!isSortingOpen);
                  setIsFilterOpen(false);
                }}
                sx={
                  isSortingOpen
                    ? { color: Colors.darkGray }
                    : { color: Colors.black }
                }
                style={{ cursor: 'pointer' }}
              >
                {/* {t('filters')} */}
                Sorting
              </Typography>
              <Typography
                variant="roboto24200"
                sx={{ color: Colors.black, margin: '0px 5px' }}
              >
                /
              </Typography>
              <Typography
                variant="roboto24200"
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setIsSortingOpen(false);
                }}
                sx={
                  isFilterOpen
                    ? { color: Colors.darkGray }
                    : { color: Colors.black }
                }
                style={{ cursor: 'pointer' }}
              >
                {/* {t('filters')} */}
                Filters
              </Typography>
            </SortingFilterBox>
          </CategoryBox>
        </InfoProductBox>
        <MainContentProductBox>
          <ProductContentBox>
            {sortedProduct &&
              sortedProduct.map((data) => (
                <div key={data.id}>
                  <ProductOnPage
                    mainPicture={data.productMainPictures}
                    productId={data.id}
                    productFor={data.productFor}
                    name={data.productName}
                    price={data.productPrice}
                    salePrice={data.productDiscountPrice}
                    productSize={data.productSize}
                  />
                </div>
              ))}
          </ProductContentBox>
          <SortingMenu
            isOpen={isSortingOpen}
            setIsOpen={setIsSortingOpen}
            category={categoryStr}
            isActive={isActive}
            setIsActive={setIsActive}
          />
          <FilterMenu
            category={categoryStr}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
          />
        </MainContentProductBox>
      </MainProductContainer>
    </MainLayout>
  );
};

export default CategoryPage;

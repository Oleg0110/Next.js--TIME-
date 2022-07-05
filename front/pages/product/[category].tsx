import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FilterMenu from '../../components/FilterMenu';
import ProductOnPage from '../../components/ProductOnPage';
import SortingMenu from '../../components/SortingMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import MainLayout from '../../layouts/MainLayout';
import { getProducts } from '../../store/services/ProductService';
import {
  CategoryBox,
  InfoProductBox,
  MainProductContainer,
  ProductContentBox,
  SortingFilterBox,
} from '../../styles/product';
import { Colors } from '../../styles/theme';
import { filterDataName, filterReset } from '../../utils/constants';
import { firstLetterUpper } from '../../utils/function';
import { GET_PRODUCTS } from '../../utils/httpLinks';
import { IProduct } from '../../utils/interface/productInterface';
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
  const router = useRouter();
  const category = router.query.category;
  const categoryStr = JSON.parse(JSON.stringify(category));
  const categoryTitle = firstLetterUpper(categoryStr);

  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    const localCategory = localStorage.getItem('category');
    if (category !== localCategory) {
      localStorage.setItem(filterDataName, JSON.stringify(filterReset));
    }
    localStorage.setItem('category', categoryStr);
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData = async () => {
      await dispatch(getProducts(categoryStr));
    };
    getData();
  }, [categoryStr, getProducts, dispatch]);

  const { products } = useAppSelector((state) => state.product);

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
              <SortingMenu />
              <Typography
                variant="roboto24200"
                sx={{ color: Colors.black, margin: '0px 5px' }}
              >
                /
              </Typography>
              <FilterMenu category={categoryStr} />
            </SortingFilterBox>
          </CategoryBox>
        </InfoProductBox>
        <ProductContentBox>
          {products &&
            products.map((data) => (
              <div key={data.id}>
                <ProductOnPage
                  href={data.id}
                  name={data.productName}
                  price={data.productPrice}
                  salePrice={data.productDiscountPrice}
                />
              </div>
            ))}
        </ProductContentBox>
      </MainProductContainer>
    </MainLayout>
  );
};

export default CategoryPage;

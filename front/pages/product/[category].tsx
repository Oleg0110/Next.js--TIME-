import React, { useEffect, useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getProducts,
  paginationProductFunc,
} from '../../store/services/ProductService';
import {
  CategoryBox,
  InfoProductBox,
  MainContentProductBox,
  MainProductBox,
  MainProductContainer,
  ProductContentBox,
  SortingFilterBox,
} from '../../styles/product';
import {
  categoryLocalStorageName,
  filterDataName,
  filterReset,
  sortingDataName,
} from '../../utils/constants';
import { firstLetterUpper } from '../../utils/function';
import { SortType } from '../../utils/types/product';
import { useTranslation } from 'next-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterMenu from '../../components/FilterMenu';
import ProductOnPage from '../../components/ProductOnPage';
import SortingMenu from '../../components/SortingMenu';
import MainLayout from '../../layouts/MainLayout';

export const getServerSideProps = async (context) => {
  const category: string = JSON.parse(JSON.stringify(context.query.category));

  return {
    props: {
      category,
      ...(await serverSideTranslations(context.locale, ['common', 'filters'])),
    },
  };
};

const endMessage = (isFilterOpen, mediaMD, t, isLoading) => {
  return (
    <>
      {!isLoading && (
        <Box
          style={{
            display: 'flex',
            margin: '20px 0px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {mediaMD && !isFilterOpen && (
            <Typography
              variant="roboto24200"
              style={{
                color: Colors.black,
                border: `1px solid ${Colors.primary}`,
                padding: '0px 10px',
                borderRadius: '4px',
              }}
            >
              {t('seen-all')}
            </Typography>
          )}

          {!mediaMD && (
            <Typography
              variant="roboto24200"
              style={{
                color: Colors.black,
                border: `1px solid ${Colors.primary}`,
                padding: '0px 10px',
                borderRadius: '4px',
              }}
            >
              {t('seen-all')}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

interface ICategoryPage {
  category: string;
}

const CategoryPage: NextPage<ICategoryPage> = ({ category }) => {
  let sorting;
  let localCategory;
  let filters;

  const mediaMD = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation('common');

  let categoryTitle = firstLetterUpper(category);

  const dispatch = useAppDispatch();

  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasMore, setHesMore] = useState(true);

  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    localCategory = localStorage.getItem(categoryLocalStorageName);
    sorting = localStorage.getItem(sortingDataName);
    filters = JSON.parse(localStorage.getItem(filterDataName));

    if (category !== localCategory) {
      localStorage.setItem(filterDataName, JSON.stringify(filterReset));
      localStorage.setItem(sortingDataName, 'empty');
      sorting = 'empty';
    }
  }

  const [isActive, setIsActive] = useState<SortType>(sorting);

  const productsRequest = async () => {
    if (category === 'women' || category === 'men') {
      await dispatch(getProducts({ category, filters, sorting }));
    } else {
      const categoryName = category.split('-')[1];
      const page = category.split('-')[0];

      await dispatch(
        getProducts({ category: categoryName, page, filters, sorting })
      );
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await productsRequest();
    };

    asyncFunc();

    category !== localCategory &&
      localStorage.setItem(categoryLocalStorageName, category);

    setIsActive(sorting);
  }, [category, dispatch]);

  const { products, countProducts, isPaginationLoading, isLoading } =
    useAppSelector((state) => state.product);

  useEffect(() => {
    setHesMore(countProducts > products.length ? true : false);
  }, [products]);

  const productsGetMore = async () => {
    if (category === 'women' || category === 'men') {
      await dispatch(
        paginationProductFunc({
          category,
          filters,
          productCount: products.length,
          sorting,
        })
      );
    } else {
      const categoryName = category.split('-')[1];
      const page = category.split('-')[0];

      await dispatch(
        paginationProductFunc({
          category: categoryName,
          page,
          filters,
          productCount: products.length,
          sorting,
        })
      );
    }
  };

  return (
    <MainLayout
      title={`${categoryTitle} shoes`}
      description={`Shoes for ${categoryTitle}`}
      keywords={`${categoryTitle},choose, `}
    >
      <MainProductContainer>
        <InfoProductBox>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            {categoryTitle} {t('shoe')}
          </Typography>
          <CategoryBox>
            <Typography
              variant="roboto30300"
              sx={{ textAlign: 'start', color: Colors.black }}
            >
              {categoryTitle} / {categoryTitle} {t('shoe')}
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
                {t('sorting')}
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
                {t('filters')}
              </Typography>
            </SortingFilterBox>
          </CategoryBox>
        </InfoProductBox>
        <MainContentProductBox>
          <InfiniteScroll
            dataLength={products.length}
            next={productsGetMore}
            hasMore={hasMore}
            loader={true}
            endMessage={endMessage(isFilterOpen, mediaMD, t, isLoading)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {!isLoading ? (
              <MainProductBox>
                {mediaMD && !isFilterOpen && (
                  <ProductContentBox>
                    {products &&
                      products.map((data) => (
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
                )}
                {!mediaMD && (
                  <ProductContentBox>
                    {products &&
                      products.map((data) => (
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
                )}
              </MainProductBox>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '150px',
                  margin: '150px',
                }}
              >
                <CircularProgress
                  sx={{ color: Colors.primary }}
                  disableShrink
                  size="150px"
                />
              </Box>
            )}
          </InfiniteScroll>
          <SortingMenu
            isOpen={isSortingOpen}
            setIsOpen={setIsSortingOpen}
            category={category}
            isActive={isActive}
            setIsActive={setIsActive}
            filters={filters}
          />
          <FilterMenu
            category={category}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            sorting={sorting}
          />
        </MainContentProductBox>
        {isPaginationLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '150px',
              margin: '30px',
            }}
          >
            <CircularProgress
              sx={{ color: Colors.primary }}
              disableShrink
              size="50px"
            />
          </Box>
        )}
      </MainProductContainer>
    </MainLayout>
  );
};

export default CategoryPage;

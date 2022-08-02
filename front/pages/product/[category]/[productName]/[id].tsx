import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  MainProductPageContainer,
  PhotoDescriptionBox,
  ProductPageLinkBox,
  ProductPageMainBox,
  ProductPageMainInfoBox,
} from '../../../../styles/productPage';
import { Colors } from '../../../../styles/theme';
import { firstLetterUpper, getAverageRating } from '../../../../utils/function';
import { GET_PRODUCTS } from '../../../../utils/httpLinks';
import {
  IProduct,
  IProductPhoto,
} from '../../../../utils/interface/productInterface';
import { useTranslation } from 'next-i18next';
import {
  getRecommendedProducts,
  getReview,
} from '../../../../store/services/ProductService';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import Link from 'next/link';
import MainLayout from '../../../../layouts/MainLayout';
// import ProductPhotoCarousel from '../../../../components/ProductPhotoCarousel';
import CustomAccordion from '../../../../components/Accordion';
import UserReview from '../../../../components/UserReview';
import Recommended from './Recommended';
import Information from './Information';

export const getServerSideProps = async (context) => {
  const productId = context.query.id;
  const category: string = JSON.parse(JSON.stringify(context.query.category));

  const res = await fetch(`${GET_PRODUCTS}/product/${productId}`);
  const product: IProduct = await res.json();

  const photosRes = await fetch(`${GET_PRODUCTS}/product/photos/${productId}`);
  const productPhotos: IProductPhoto[] = await photosRes.json();

  return {
    props: {
      product,
      productPhotos,
      category,
      ...(await serverSideTranslations(context.locale, ['common', 'product'])),
    },
  };
};

interface IProductProps {
  product: IProduct;
  category: string;
  productPhotos: IProductPhoto[];
}

const Product: NextPage<IProductProps> = ({
  product,
  category,
  productPhotos,
}) => {
  const { t } = useTranslation(['product']);

  const categoryTitle = firstLetterUpper(category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getReviewFunc = async () => {
      await dispatch(getReview({ productId: product.id, category }));
      await dispatch(
        getRecommendedProducts({ style: product.productStyleName, category })
      );
    };

    getReviewFunc();
  }, [dispatch, getReview, product]);

  const { productReviews } = useAppSelector((state) => state.product);

  const averageRating = getAverageRating(productReviews);
  const reviewsCount = productReviews && productReviews.length;

  return (
    <MainLayout>
      <MainProductPageContainer>
        <ProductPageMainBox>
          {product && (
            <>
              <ProductPageLinkBox>
                <Link href={`/product/${category}`}>
                  <Typography
                    variant="roboto30300"
                    sx={{
                      textAlign: 'start',
                      color: Colors.black,
                      minWidth: '150px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  >
                    {t(category)} {t('shoes')}
                  </Typography>
                </Link>
                <Typography
                  variant="roboto30300"
                  sx={{
                    textAlign: 'start',
                    color: Colors.black,
                  }}
                >
                  / {product.productName}
                </Typography>
              </ProductPageLinkBox>
              <ProductPageMainInfoBox>
                <PhotoDescriptionBox>
                  {/* {productPhotos &&
                  productPhotos.map((data) => (
                    <div key={data.id}>
                      <img
                        src={`${BASIC_URL}/${data.photoName}`}
                        alt={product.productName}
                      />
                    </div>
                  ))} */}
                  {/* <ProductPhotoCarousel /> */}
                  <CustomAccordion
                    title={t('delivery')}
                    accordionVariant="outlined"
                    textArr={'delivery-propose-standard'}
                  />
                  {/* <CustomAccordion
                    title={t('reviews')}
                    accordionVariant="outlined"
                    averageRating={averageRating}
                    countReviews={reviewsCount}
                  >
                    {productReviews &&
                      productReviews.map((data) => (
                        <div key={data.id}>
                          <UserReview
                            comment={data.comment}
                            date={data.date}
                            rating={data.rating}
                            userName={data.userName}
                          />
                        </div>
                      ))}
                  </CustomAccordion> */}
                </PhotoDescriptionBox>
                <Information product={product} />
              </ProductPageMainInfoBox>
            </>
          )}
          <Recommended />
        </ProductPageMainBox>
      </MainProductPageContainer>
    </MainLayout>
  );
};

export default Product;

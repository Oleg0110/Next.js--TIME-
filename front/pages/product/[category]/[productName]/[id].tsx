import React, { useEffect } from 'react';
import theme, { Colors } from '../../../../styles/theme';
import { Typography, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  MainProductPageContainer,
  PhotoDescriptionBox,
  ProductPageLinkBox,
  ProductPageMainBox,
  ProductPageMainInfoBox,
} from '../../../../styles/productPage';
import { getAverageRating } from '../../../../utils/function';
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
import ProductPhotoCarousel from '../../../../components/ProductPhotoCarousel';
import CustomAccordion from '../../../../components/Accordion';
import UserReview from '../../../../components/UserReview';
import Recommended from './Recommended';
import Information from './Information';
import ProductNameBox from './ProductNameBox';

export const getServerSideProps = async (context) => {
  const productId = context.query.id;

  const category: string = JSON.parse(JSON.stringify(context.query.category));

  const res = await fetch(`${GET_PRODUCTS}/product/${productId}`);
  const product: IProduct = await res.json();

  const photosRes = await fetch(`${GET_PRODUCTS}/product/photos/${productId}`);
  const productPhotos: IProductPhoto[] = await photosRes.json();

  const mainPhoto: IProductPhoto = {
    id: product.productMainPictures,
    productId: product.id,
    photoName: product.productMainPictures,
  };

  productPhotos.unshift(mainPhoto);

  return {
    props: {
      product,
      productPhotos,
      category,
      ...(await serverSideTranslations(context.locale, [
        'common',
        'product',
        'accordion',
      ])),
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
  const mediaMD = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation(['product']);

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
    <MainLayout
      title={product.productName}
      description={`Shoe for ${product.productFor}, shoe name ${product.productName}`}
      keywords={`product, choose, ${product.productFor}, ${
        product.productSale && 'sale, discount'
      },${product.productNew && 'new'}`}
    >
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
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '16px',
                        minWidth: '100px',
                      },
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
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '16px',
                    },
                  }}
                >
                  / {product.productName}
                </Typography>
              </ProductPageLinkBox>
              <ProductPageMainInfoBox>
                {!mediaMD && (
                  <>
                    <PhotoDescriptionBox>
                      <ProductPhotoCarousel productPhotos={productPhotos} />
                      <CustomAccordion
                        title={t('delivery')}
                        accordionVariant="outlined"
                      />
                      <CustomAccordion
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
                      </CustomAccordion>
                    </PhotoDescriptionBox>
                    <Information product={product} />
                  </>
                )}
                {mediaMD && (
                  <>
                    <ProductNameBox product={product} />
                    <PhotoDescriptionBox>
                      <ProductPhotoCarousel productPhotos={productPhotos} />
                    </PhotoDescriptionBox>
                    <Information product={product} />
                    <CustomAccordion
                      title={t('delivery')}
                      accordionVariant="outlined"
                    />
                    <CustomAccordion
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
                    </CustomAccordion>
                  </>
                )}
              </ProductPageMainInfoBox>
            </>
          )}
        </ProductPageMainBox>
      </MainProductPageContainer>
      <Recommended />
    </MainLayout>
  );
};

export default Product;

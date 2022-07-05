import { ListItem, ListItemText, Typography } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import React, { useState } from 'react';
import MainLayout from '../../../../layouts/MainLayout';
import {
  AddButtonProductPage,
  InfoProductPageBox,
  LikeIconPosition,
  MainProductPageContainer,
  PhotoDescriptionBox,
  PriceBottomLineBox,
  PriceProductPageBox,
  ProductPageColorBox,
  ProductPageLinkBox,
  ProductPageMainBox,
  ProductPageMainInfoBox,
  ProductPageSizeBox,
} from '../../../../styles/productPage';
import { object, string } from 'yup';
import { Colors } from '../../../../styles/theme';
import { firstLetterUpper, includesSizeFunc } from '../../../../utils/function';
import { GET_PRODUCTS } from '../../../../utils/httpLinks';
import { IProduct } from '../../../../utils/interface/productInterface';
import styles from '../../../../styles/product.module.scss';
import TooltipIcon from '../../../../components/TooltipIcon/TooltipIcon';
import CheckBoxRadioInput from '../../../../components/CheckBoxRadioInput';
import { ErrorMessage, Form, Formik } from 'formik';
import CustomButton from '../../../../components/CustomButton';
import { sizesArray } from '../../../../utils/constants';
import { SizeType } from '../../../../utils/types/form';

export const getServerSideProps = async (context) => {
  const productId = context.query.id;
  const category = context.query.category;
  const res = await fetch(`${GET_PRODUCTS}/product/${productId}`);
  const product: IProduct = await res.json();

  return {
    props: {
      product,
      category,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
};

interface IProductProps {
  product: IProduct;
  category: string;
}

const Product: NextPage<IProductProps> = ({ product, category }) => {
  const categoryStr = JSON.parse(JSON.stringify(category));
  const categoryTitle = firstLetterUpper(categoryStr);
  const [isLiked, setIsLiked] = useState(false);

  const sizesArr: SizeType[] = includesSizeFunc(
    sizesArray,
    product.productSize
  );

  return (
    <MainLayout>
      {product && (
        <MainProductPageContainer>
          <ProductPageMainBox>
            <ProductPageLinkBox>
              <Link href={`/product/${category}`}>
                <Typography
                  variant="roboto30300"
                  sx={{
                    textAlign: 'start',
                    color: Colors.black,
                    width: '200px',
                    cursor: 'pointer',
                  }}
                >
                  {categoryTitle} shoes
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
                <Typography variant="roboto30300" sx={{ color: Colors.black }}>
                  {product.productName}
                </Typography>
              </PhotoDescriptionBox>
              <InfoProductPageBox>
                <Typography variant="roboto30300" sx={{ color: Colors.black }}>
                  {product.productName}
                </Typography>
                <LikeIconPosition onClick={() => setIsLiked(!isLiked)}>
                  {isLiked ? (
                    <TooltipIcon title="remove-from-favorites">
                      <div className={styles.likeProductFilled} />
                    </TooltipIcon>
                  ) : (
                    <TooltipIcon title="add-to-favorites">
                      <div className={styles.likeProduct} />
                    </TooltipIcon>
                  )}
                </LikeIconPosition>
                {product.productDiscountPrice === 0 ? (
                  <PriceBottomLineBox>
                    <Typography
                      variant="roboto30300"
                      sx={{ color: Colors.darkGray }}
                    >
                      {product.productPrice} UAH
                    </Typography>
                  </PriceBottomLineBox>
                ) : (
                  <PriceBottomLineBox>
                    <PriceProductPageBox>
                      <Typography
                        variant="roboto24200"
                        color={Colors.darkGray}
                        sx={{
                          textDecoration: 'line-through',
                          textDecorationThickness: '1px',
                          margin: '3px 10px 0px 0px',
                        }}
                      >
                        {product.productPrice} UAH
                      </Typography>
                      <Typography
                        variant="roboto30300"
                        color={Colors.saleColor}
                      >
                        {product.productDiscountPrice} UAH
                      </Typography>
                    </PriceProductPageBox>
                  </PriceBottomLineBox>
                )}
                <Typography variant="roboto24200" color={Colors.black}>
                  Kod:
                  <Typography
                    variant="roboto24200"
                    sx={{ color: Colors.darkGray, marginLeft: '5px' }}
                  >
                    {product.productNumber}
                  </Typography>
                </Typography>
                {/* {product.productSize.map((data) => (
                <div key={data} className={styles.sizeCheckbox}>
                  <Typography variant="roboto24200" color={Colors.black}>
                    {data}
                  </Typography>
                </div>
              ))} */}
                <Formik
                  initialValues={{ size: '' }}
                  validationSchema={object().shape({
                    size: string().required('Choose some sizes'),
                  })}
                  onSubmit={async (values) => {
                    console.log(values);
                  }}
                >
                  {({ handleSubmit }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Typography
                          variant="roboto30300"
                          sx={{
                            color: Colors.black,
                            margin: '20px 10px 0px 0px',
                          }}
                        >
                          Size
                        </Typography>
                        <ErrorMessage
                          name="size"
                          component="span"
                          className={styles.errorStyle}
                        />
                        <ProductPageSizeBox>
                          {sizesArr.map((data) => (
                            <div key={data.size}>
                              <CheckBoxRadioInput
                                inputType="radio"
                                type="size"
                                fieldName="size"
                                htmlFor={String(data.size)}
                                value={String(data.size)}
                                isSize={data.is}
                              />
                            </div>
                          ))}
                        </ProductPageSizeBox>
                        <Typography
                          variant="roboto30300"
                          sx={{ color: Colors.black, margin: '10px 0px 20px' }}
                        >
                          Color
                        </Typography>
                        <ProductPageColorBox>
                          <div className={styles.colorBox}>
                            <div
                              className={`${
                                styles[`color-${product.productColor}`]
                              } ${styles.colorProperty}`}
                            />
                          </div>
                        </ProductPageColorBox>
                        <AddButtonProductPage>
                          <CustomButton isIcon={true} size="LG" type="submit">
                            {/* {t('add-product')} */}
                            Add to Cart
                          </CustomButton>
                        </AddButtonProductPage>
                      </Form>
                    );
                  }}
                </Formik>
                <Typography
                  variant="roboto30300"
                  sx={{ color: Colors.black, margin: '20px 0px' }}
                >
                  Description
                </Typography>
                <Typography
                  variant="roboto24200"
                  sx={{ color: Colors.black, marginBottom: '20px' }}
                >
                  {product.productDescription}
                </Typography>
                <ListItem sx={{ display: 'list-item' }}>
                  <Typography
                    variant="roboto20400"
                    sx={{ color: Colors.black, padding: '0px' }}
                  >
                    Color: {product.productColor}
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  <Typography
                    variant="roboto20400"
                    sx={{ color: Colors.black, padding: '0px' }}
                  >
                    Style: {product.productStyleName}
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  <Typography
                    variant="roboto20400"
                    sx={{ color: Colors.black, padding: '0px' }}
                  >
                    Material: {product.productStyleMaterial}
                  </Typography>
                </ListItem>
              </InfoProductPageBox>
            </ProductPageMainInfoBox>
          </ProductPageMainBox>
        </MainProductPageContainer>
      )}
    </MainLayout>
  );
};

export default Product;

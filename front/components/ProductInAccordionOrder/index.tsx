import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { BASIC_URL } from '../../utils/httpLinks';
import { IProductInBag } from '../../utils/interface/productInterface';
import {
  ProductAccordionBox,
  ProductOrderCount,
  ProductOrderInfo,
  ProductOrderPhotoBox,
  ProductOrderPrice,
} from '../../styles/productOrderAccordion';

const ProductInAccordionOrder: NextPage<Omit<IProductInBag, 'productId'>> = ({
  price,
  productName,
  productPhoto,
  salePrice,
  sizeProduct,
  productAmount,
}) => {
  const { t } = useTranslation('admin');

  return (
    <ProductAccordionBox>
      <ProductOrderPhotoBox>
        <img src={`${BASIC_URL}/${productPhoto}`} width="60px" height="60px" />
        <ProductOrderInfo>
          <Typography
            variant="roboto16400"
            marginBottom="8px"
            sx={{
              maxWidth: '260px',
              textAlign: 'start',
              color: Colors.black,
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {productName}
          </Typography>
          <Typography
            variant="roboto16200"
            sx={{
              color: Colors.black,
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {t('size')}: {sizeProduct}
          </Typography>
        </ProductOrderInfo>
      </ProductOrderPhotoBox>
      <ProductOrderCount>
        <Typography
          variant="roboto16200"
          sx={{
            marginRight: '10px',
            color: Colors.black,
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
            },
          }}
        >
          {t('amount')}: {productAmount}
        </Typography>
      </ProductOrderCount>
      {salePrice === 0 ? (
        <ProductOrderPrice>
          <Typography
            variant="roboto16200"
            sx={{
              width: '240px',
              color: Colors.black,
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {price} UAH
          </Typography>
        </ProductOrderPrice>
      ) : (
        <ProductOrderPrice>
          <Typography
            variant="roboto16200"
            color={Colors.black}
            sx={{
              textDecoration: 'line-through',
              textDecorationThickness: '1px',
              marginRight: '10px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
                marginRight: '0px',
              },
            }}
          >
            {price} UAH
          </Typography>
          <Typography
            variant="roboto20400"
            sx={{
              color: Colors.saleColor,
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {salePrice} UAH
          </Typography>
        </ProductOrderPrice>
      )}
    </ProductAccordionBox>
  );
};

export default ProductInAccordionOrder;

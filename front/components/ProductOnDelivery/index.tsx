import React from 'react';
import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import { BASIC_URL } from '../../utils/httpLinks';
import { IProductInBag } from '../../utils/interface/productInterface';
import {
  ProductOnDeliveryContainer,
  ProductOnDeliveryInfo,
  ProductOnDeliveryPhotoBox,
  ProductOnDeliveryPrice,
} from '../../styles/productOnDeliveryPage';

const ProductOnDelivery: NextPage<Omit<IProductInBag, 'productId'>> = ({
  price,
  productName,
  productPhoto,
  salePrice,
  sizeProduct,
  productAmount,
}) => {
  const { t } = useTranslation('delivery');
  return (
    <ProductOnDeliveryContainer>
      <ProductOnDeliveryPhotoBox>
        <img
          src={`${BASIC_URL}/${productPhoto}`}
          width="160px"
          height="160px"
        />
        <ProductOnDeliveryInfo>
          <Typography
            variant="roboto20400"
            marginBottom="8px"
            color={Colors.black}
            sx={{
              width: '100%',
              textAlign: 'start',
              color: Colors.secondaryWhite,
            }}
          >
            {productName}
          </Typography>
          <Typography variant="roboto20200" color={Colors.secondaryWhite}>
            {t('size')}: {sizeProduct}
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.secondaryWhite, marginRight: '10px' }}
          >
            {t('amount')}: {productAmount}
          </Typography>
          {salePrice === 0 ? (
            <ProductOnDeliveryPrice>
              <Typography
                variant="roboto20400"
                sx={{ color: Colors.secondaryWhite }}
              >
                {price} UAH
              </Typography>
            </ProductOnDeliveryPrice>
          ) : (
            <ProductOnDeliveryPrice>
              <Typography
                variant="roboto20200"
                color={Colors.lightGray}
                sx={{
                  textDecoration: 'line-through',
                  textDecorationThickness: '1px',
                  marginRight: '10px',
                }}
              >
                {price} UAH
              </Typography>
              <Typography variant="roboto24200" color={Colors.saleColor}>
                {salePrice} UAH
              </Typography>
            </ProductOnDeliveryPrice>
          )}
        </ProductOnDeliveryInfo>
      </ProductOnDeliveryPhotoBox>
    </ProductOnDeliveryContainer>
  );
};

export default ProductOnDelivery;

import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { Typography, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { BASIC_URL } from '../../utils/httpLinks';
import { IProductInBag } from '../../utils/interface/productInterface';
import {
  ProductOnDeliveryContainer,
  ProductOnDeliveryInfo,
  ProductOnDeliveryPhotoBox,
  ProductOnDeliveryPrice,
} from '../../styles/productOnDeliveryPage';
import { useRouter } from 'next/router';

const ProductOnDelivery: NextPage<IProductInBag> = ({
  price,
  productName,
  productPhoto,
  salePrice,
  sizeProduct,
  productAmount,
  productFor,
  productId,
}) => {
  const madiaSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { t } = useTranslation('delivery');

  const router = useRouter();

  const photoSize = madiaSM
    ? { cursor: 'pointer', width: '140px', height: '140px' }
    : { cursor: 'pointer', width: '160px', height: '160px' };

  return (
    <ProductOnDeliveryContainer>
      <ProductOnDeliveryPhotoBox>
        <img
          src={`${BASIC_URL}/${productPhoto}`}
          onClick={() =>
            router.push(`/product/${productFor}/${productName}/${productId}`)
          }
          style={photoSize}
        />
        <ProductOnDeliveryInfo>
          <Typography
            variant="roboto20400"
            sx={{
              width: '100%',
              textAlign: 'start',
              color: Colors.secondaryWhite,
              cursor: 'pointer',
              marginBottom: '8px',
              ':hover': {
                color: Colors.lightGray,
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
              },
            }}
            onClick={() =>
              router.push(`/product/${productFor}/${productName}/${productId}`)
            }
          >
            {productName}
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{
              color: Colors.secondaryWhite,
              [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
              },
            }}
          >
            {t('size')}: {sizeProduct}
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{
              color: Colors.secondaryWhite,
              marginRight: '10px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
              },
            }}
          >
            {t('amount')}: {productAmount}
          </Typography>
          {salePrice === 0 ? (
            <ProductOnDeliveryPrice>
              <Typography
                variant="roboto20400"
                sx={{
                  color: Colors.secondaryWhite,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '13px',
                  },
                }}
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

                  [theme.breakpoints.down('sm')]: {
                    fontSize: '13px',
                  },
                }}
              >
                {price} UAH
              </Typography>
              <Typography
                variant="roboto24200"
                sx={{
                  color: Colors.saleColor,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '13px',
                  },
                }}
              >
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

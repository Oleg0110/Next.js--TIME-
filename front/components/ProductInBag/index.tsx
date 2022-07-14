import { Typography } from '@mui/material';
import React from 'react';
import {
  MainContainer,
  PhotoContainer,
  InfoContainer,
  RemoveBox,
  RemoveButton,
  PriceInBagBox,
} from '../../styles/productInBag';
import { Colors } from '../../styles/theme';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { IProductInBag } from '../../utils/interface/productInterface';
import { BASIC_URL } from '../../utils/httpLinks';
import { removeFromBag } from '../../utils/function';
import { useAppDispatch } from '../../hooks/redux';

const ProductInBag: NextPage<Omit<IProductInBag, 'productAmount'>> = ({
  price,
  productId,
  productName,
  productPhoto,
  salePrice,
  sizeProduct,
}) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  return (
    <MainContainer>
      <PhotoContainer>
        <img
          src={`${BASIC_URL}/${productPhoto}`}
          width="160px"
          height="160px"
        />
      </PhotoContainer>
      <InfoContainer>
        <Typography
          variant="roboto20400"
          marginBottom="8px"
          color={Colors.black}
          sx={{ width: '260px', textAlign: 'end', color: Colors.black }}
        >
          {productName}
        </Typography>
        <Typography variant="roboto20200" color={Colors.darkGray}>
          {t('size')}: {sizeProduct}
        </Typography>
        {salePrice === 0 ? (
          <Typography
            variant="roboto20200"
            color={Colors.black}
            marginBottom="-6px"
          >
            {price} UAH
          </Typography>
        ) : (
          <PriceInBagBox>
            <Typography
              variant="roboto20200"
              color={Colors.darkGray}
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
          </PriceInBagBox>
        )}
        <RemoveBox>
          <RemoveButton onClick={() => removeFromBag(productId, dispatch)}>
            {t('remove')}
          </RemoveButton>
        </RemoveBox>
      </InfoContainer>
    </MainContainer>
  );
};

export default ProductInBag;

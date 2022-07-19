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
import { BASIC_URL } from '../../utils/httpLinks';
import { removeFromBag } from '../../utils/function';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removeFromFavorite } from '../../store/services/ProductService';

interface IProductInBag {
  price: number;
  productId?: string;
  favoriteId?: string;
  productName: string;
  productPhoto: string;
  salePrice: number;
  sizeProduct?: number;
  who: 'bag' | 'favorite';
}

const ProductInBag: NextPage<IProductInBag> = ({
  price,
  productId,
  favoriteId,
  productName,
  productPhoto,
  salePrice,
  sizeProduct,
  who,
}) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

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
        {who === 'bag' && (
          <Typography variant="roboto20200" color={Colors.darkGray}>
            {t('size')}: {sizeProduct}
          </Typography>
        )}
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
          <RemoveButton
            onClick={async () =>
              who === 'bag'
                ? removeFromBag(productId, dispatch)
                : await dispatch(
                    removeFromFavorite({
                      favoriteId,
                      userId: user.id,
                    })
                  )
            }
          >
            {t('remove')}
          </RemoveButton>
        </RemoveBox>
      </InfoContainer>
    </MainContainer>
  );
};

export default ProductInBag;

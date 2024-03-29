import React from 'react';
import { Typography } from '@mui/material';
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
import { useRouter } from 'next/router';

interface IProductInBag {
  price: number;
  productId?: string;
  favoriteId?: string;
  productName: string;
  productPhoto: string;
  salePrice: number;
  sizeProduct?: number;
  who?: 'bag' | 'favorite';
  productFor: string;
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
  productFor,
}) => {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);

  return (
    <MainContainer>
      <PhotoContainer>
        <img
          src={`${BASIC_URL}/${productPhoto}`}
          width="160px"
          height="160px"
          onClick={() =>
            router.push(`/product/${productFor}/${productName}/${productId}`)
          }
          style={{ cursor: 'pointer' }}
        />
      </PhotoContainer>
      <InfoContainer>
        <Typography
          variant="roboto20400"
          sx={{
            width: '260px',
            textAlign: 'end',
            color: Colors.black,
            marginBottom: '8px',
            cursor: 'pointer',
          }}
          onClick={() =>
            router.push(`/product/${productFor}/${productName}/${productId}`)
          }
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
        {who && (
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
        )}
      </InfoContainer>
    </MainContainer>
  );
};

export default ProductInBag;

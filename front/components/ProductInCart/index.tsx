import { Typography } from '@mui/material';
import React from 'react';
import {
  MainContainer,
  PhotoContainer,
  InfoContainer,
  RemoveBox,
  RemoveButton,
} from '../../styles/productInCart';
import styles from '../../styles/icons.module.scss';
import { Colors } from '../../styles/theme';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import SaleProductTest from '../../assets/saleProductTest.png';

const ProductInCart = () => {
  const { t } = useTranslation('shopFavorCart');
  return (
    <MainContainer>
      <PhotoContainer>
        <Image src={SaleProductTest} width="160px" height="160px" />
      </PhotoContainer>
      <InfoContainer>
        <Typography
          variant="roboto20400"
          marginBottom="8px"
          color={Colors.black}
          sx={{ width: '260px', textAlign: 'end', color: Colors.black }}
        >
          Loafers are black in a cell
        </Typography>
        <Typography variant="roboto20200" color={Colors.darkGray}>
          {t('size')}: 31
        </Typography>
        <Typography
          variant="roboto20400"
          marginBottom="-6px"
          color={Colors.black}
        >
          3 600 UAH
        </Typography>
        <RemoveBox>
          <RemoveButton>
            <div className={styles.close} />
            {t('remove')}
          </RemoveButton>
        </RemoveBox>
      </InfoContainer>
    </MainContainer>
  );
};

export default ProductInCart;

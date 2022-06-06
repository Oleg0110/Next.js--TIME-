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

const ProductInCart = () => {
  return (
    <MainContainer>
      <PhotoContainer></PhotoContainer>
      <InfoContainer>
        <Typography
          variant="roboto20400"
          marginBottom="8px"
          color={Colors.black}
        >
          Loafers are black in a cell
        </Typography>
        <Typography variant="roboto20200" color={Colors.darkGray}>
          Size: 31
        </Typography>
        <Typography variant="roboto20200" color={Colors.darkGray}>
          To-th: 1
        </Typography>
        <Typography
          variant="roboto20400"
          marginBottom="25px"
          color={Colors.black}
        >
          3 600 UAH
        </Typography>
        <RemoveBox>
          <RemoveButton>
            <div className={styles.close} />
            Remove
          </RemoveButton>
        </RemoveBox>
      </InfoContainer>
    </MainContainer>
  );
};

export default ProductInCart;

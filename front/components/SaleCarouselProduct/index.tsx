import React, { useState } from 'react';
import Image from 'next/image';
import SaleProductTest from '../../assets/saleProductTest.png';
import Link from 'next/link';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import {
  PriceCarouselProductBox,
  SaleCarouselProductBox,
  SaleCarouselProductInfo,
  SaleCarouselProductPhoto,
  IconPosition,
  CartIconPosition,
} from '../../styles/saleCarouselProduct';
import styles from '../../styles/icons.module.scss';

interface ISaleCarouselProductProps {
  name: string;
  price: number;
  href: string;
  salePrice: number;
  src: any;
}

const SaleCarouselProduct: NextPage<ISaleCarouselProductProps> = ({
  name,
  price,
  href,
  salePrice,
  src,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);

  return (
    <SaleCarouselProductBox>
      <SaleCarouselProductPhoto>
        <img src={src} width="300px" height="300px" />
        <IconPosition onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <TooltipIcon title="remove-from-favorites">
              <div className={styles.likeProductFilled} />
            </TooltipIcon>
          ) : (
            <TooltipIcon title="add-to-favorites">
              <div className={styles.likeProduct} />
            </TooltipIcon>
          )}
        </IconPosition>
      </SaleCarouselProductPhoto>
      <SaleCarouselProductInfo>
        <Link href={href}>
          <Typography
            variant="roboto24200hover"
            marginBottom="5px"
            sx={{
              color: Colors.black,
              textAlign: 'start',
              cursor: 'pointer',
              width: '260px',
            }}
          >
            {name}
          </Typography>
        </Link>
        <PriceCarouselProductBox>
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
        </PriceCarouselProductBox>
        <CartIconPosition onClick={() => setIsAddToCart(!isAddToCart)}>
          {isAddToCart ? (
            <TooltipIcon title="remove-from-shopping-cart">
              <div className={styles.bagProductFilled} />
            </TooltipIcon>
          ) : (
            <TooltipIcon title="add-to-shopping-cart">
              <div className={styles.bagProduct} />
            </TooltipIcon>
          )}
        </CartIconPosition>
      </SaleCarouselProductInfo>
    </SaleCarouselProductBox>
  );
};

export default SaleCarouselProduct;

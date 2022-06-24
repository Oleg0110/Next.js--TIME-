import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import {
  IconPosition,
  ProductOnPageBox,
  ProductOnPageInfo,
  ProductOnPagePhoto,
  CartIconPosition,
  PriceProductBox,
} from '../../styles/productOnPage';
import { NextPage } from 'next';
import Image from 'next/image';
import ProductTest from '../../assets/productTest.png';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import Link from 'next/link';
import styles from '../../styles/icons.module.scss';

interface IProductOnPageProps {
  name: string;
  price: string;
  href: string;
  salePrice?: string;
}

const ProductOnPage: NextPage<IProductOnPageProps> = ({
  name,
  price,
  href,
  salePrice,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);

  return (
    <ProductOnPageBox>
      <ProductOnPagePhoto>
        <Image src={ProductTest} width="450px" height="420px" />
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
      </ProductOnPagePhoto>
      <ProductOnPageInfo>
        <Link href={href}>
          <Typography
            variant="roboto20400"
            marginBottom="8px"
            color={Colors.black}
          >
            {name}
          </Typography>
        </Link>
        {!salePrice ? (
          <Typography variant="roboto20200" color={Colors.black}>
            {price} UAH
          </Typography>
        ) : (
          <PriceProductBox>
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
          </PriceProductBox>
        )}
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
      </ProductOnPageInfo>
    </ProductOnPageBox>
  );
};

export default ProductOnPage;

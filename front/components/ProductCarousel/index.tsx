import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import {
  PriceCarouselProductBox,
  CarouselProductBox,
  CarouselProductInfo,
  CarouselProductPhoto,
  IconPosition,
  BagIconPosition,
} from '../../styles/carouselProduct';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';

interface IProductCarouselProps {
  name: string;
  price: number;
  href: string;
  salePrice: number;
  src: any;
}

const ProductCarousel: NextPage<IProductCarouselProps> = ({
  name,
  price,
  href,
  salePrice,
  src,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddToBag, setIsAddToBag] = useState(false);

  const router = useRouter();
  const category = router.query.category;

  return (
    <CarouselProductBox>
      <CarouselProductPhoto>
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
      </CarouselProductPhoto>
      <CarouselProductInfo>
        <Link
          href={
            category !== undefined
              ? `/product/${category}/${name}/${href}`
              : `/product/sale/${name}/${href}`
          }
        >
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
        {salePrice === 0 ? (
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, textAlign: 'start' }}
          >
            {price} UAH
          </Typography>
        ) : (
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
        )}
        <BagIconPosition onClick={() => setIsAddToBag(!isAddToBag)}>
          {isAddToBag ? (
            <TooltipIcon title="remove-from-shopping-bag">
              <div className={styles.bagProductFilled} />
            </TooltipIcon>
          ) : (
            <TooltipIcon title="add-to-shopping-bag">
              <div className={styles.bagProduct} />
            </TooltipIcon>
          )}
        </BagIconPosition>
      </CarouselProductInfo>
    </CarouselProductBox>
  );
};

export default ProductCarousel;

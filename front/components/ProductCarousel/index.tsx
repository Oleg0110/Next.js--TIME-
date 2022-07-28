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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BASIC_URL } from '../../utils/httpLinks';
import { removeFromBag } from '../../utils/function';
import { IProduct } from '../../utils/interface/productInterface';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../store/services/ProductService';
import { toast } from 'react-toastify';
import Link from 'next/link';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import ChooseSizeModal from '../ChooseSizeModal';

interface IProductCarouselProps {
  productSize: number[];
  productPrice: number;
  productDiscountPrice: number;
  productId: string;
  productName: string;
  productMainPictures: string;
  productFor: string;
}

const ProductCarousel: NextPage<IProductCarouselProps> = ({
  productSize,
  productPrice,
  productDiscountPrice,
  productId,
  productName,
  productMainPictures,
  productFor,
}) => {
  const { productInBag, productsFavorite } = useAppSelector(
    (state) => state.product
  );
  const { isAuth, user } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const category = router.query.category;

  const isFavorite =
    productsFavorite &&
    productsFavorite.find((f) => f.product?.id === productId);

  const isAdded = !!productInBag.find((f) => f.productId === productId);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CarouselProductBox>
      <ChooseSizeModal
        isModalOpened={open}
        handleClose={handleClose}
        productSize={productSize}
        price={productPrice}
        salePrice={productDiscountPrice}
        productId={productId}
        productName={productName}
        productPhoto={productMainPictures}
        productFor={productFor}
      />
      <CarouselProductPhoto>
        <img
          src={`${BASIC_URL}/${productMainPictures}`}
          width="300px"
          height="300px"
          onClick={() =>
            router.push(`/product/${category}/${productName}/${productId}`)
          }
          style={{ cursor: 'pointer' }}
        />
        <IconPosition>
          {!!isFavorite ? (
            <TooltipIcon
              title="remove-from-favorites"
              onClick={async () => {
                if (isAuth) {
                  await dispatch(
                    removeFromFavorite({
                      favoriteId: isFavorite.id,
                      userId: user.id,
                    })
                  );
                } else {
                  toast.warning('Please log in to add');
                }
              }}
            >
              <div className={styles.likeProductFilled} />
            </TooltipIcon>
          ) : (
            <TooltipIcon
              title="add-to-favorites"
              onClick={async () => {
                if (isAuth) {
                  await dispatch(addToFavorite({ productId, userId: user.id }));
                } else {
                  toast.warning('Please log in to add');
                }
              }}
            >
              <div className={styles.likeProduct} />
            </TooltipIcon>
          )}
        </IconPosition>
      </CarouselProductPhoto>
      <CarouselProductInfo>
        <Link
          href={
            category !== undefined
              ? `/product/${category}/${productName}/${productId}`
              : `/product/sale/${productName}/${productId}`
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
            {productName}
          </Typography>
        </Link>
        {productDiscountPrice === 0 ? (
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, textAlign: 'start' }}
          >
            {productPrice} UAH
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
              {productPrice} UAH
            </Typography>
            <Typography variant="roboto24200" color={Colors.saleColor}>
              {productDiscountPrice} UAH
            </Typography>
          </PriceCarouselProductBox>
        )}
        <BagIconPosition>
          {isAdded ? (
            <TooltipIcon
              title="remove-from-shopping-bag"
              onClick={() => removeFromBag(productId, dispatch)}
            >
              <div className={styles.bagProductFilled} />
            </TooltipIcon>
          ) : (
            <TooltipIcon title="add-to-shopping-bag" onClick={handleClick}>
              <div className={styles.bagProduct} />
            </TooltipIcon>
          )}
        </BagIconPosition>
      </CarouselProductInfo>
    </CarouselProductBox>
  );
};

export default ProductCarousel;

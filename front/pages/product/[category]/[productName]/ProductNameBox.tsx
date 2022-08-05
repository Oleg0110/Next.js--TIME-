import React from 'react';
import theme, { Colors } from '../../../../styles/theme';
import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../../../store/services/ProductService';
import {
  LikeIconPosition,
  PriceBottomLineBox,
  PriceProductPageBox,
  ProductNameMainBox,
} from '../../../../styles/productPage';
import { IProduct } from '../../../../utils/interface/productInterface';
import TooltipIcon from '../../../../components/TooltipIcon/TooltipIcon';
import styles from '../../../../styles/product.module.scss';

interface IProductNameBox {
  product: IProduct;
}

const ProductNameBox: NextPage<IProductNameBox> = ({ product }) => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const { productsFavorite } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const isFavorite =
    productsFavorite &&
    productsFavorite.find((f) => f.product?.id === product.id);

  const copyEmail = async () => {
    if (product.productNumber === undefined) {
      toast.error('Failed copy');
    } else {
      await navigator.clipboard.writeText(product.productNumber);
      toast.success(`Successfully copy ${product.productNumber}`);
    }
  };

  return (
    <ProductNameMainBox>
      <Typography
        variant="roboto30300"
        sx={{
          color: Colors.black,
          display: 'block',
          width: '85%',
          [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
          },
        }}
      >
        {product.productName}
      </Typography>
      <LikeIconPosition>
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
                await dispatch(
                  addToFavorite({ productId: product.id, userId: user.id })
                );
              } else {
                toast.warning('Please log in to add');
              }
            }}
          >
            <div className={styles.likeProduct} />
          </TooltipIcon>
        )}
      </LikeIconPosition>
      {product.productDiscountPrice === 0 ? (
        <PriceBottomLineBox>
          <Typography variant="roboto30300" sx={{ color: Colors.darkGray }}>
            {product.productPrice} UAH
          </Typography>
        </PriceBottomLineBox>
      ) : (
        <PriceBottomLineBox>
          <PriceProductPageBox>
            <Typography
              variant="roboto24200"
              color={Colors.darkGray}
              sx={{
                textDecoration: 'line-through',
                textDecorationThickness: '1px',
                margin: '3px 10px 0px 0px',
              }}
            >
              {product.productPrice} UAH
            </Typography>
            <Typography variant="roboto30300" color={Colors.saleColor}>
              {product.productDiscountPrice} UAH
            </Typography>
          </PriceProductPageBox>
        </PriceBottomLineBox>
      )}

      <Typography variant="roboto24200" color={Colors.black}>
        Kod:
        <TooltipIcon title="click-to-copy" onClick={copyEmail}>
          <Typography
            variant="roboto24200"
            sx={{ color: Colors.darkGray, marginLeft: '5px' }}
          >
            {product.productNumber}
          </Typography>
        </TooltipIcon>
      </Typography>
    </ProductNameMainBox>
  );
};

export default ProductNameBox;

import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import {
  IconPosition,
  ProductOnPageBox,
  ProductOnPageInfo,
  ProductOnPagePhoto,
  BagIconPosition,
  PriceProductBox,
} from '../../styles/productOnPage';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BASIC_URL } from '../../utils/httpLinks';
import { removeFromBag } from '../../utils/function';
import { useRouter } from 'next/router';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../store/services/ProductService';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import ChooseSizeModal from '../ChooseSizeModal';
import Link from 'next/link';
import styles from '../../styles/icons.module.scss';

interface IProductOnPageProps {
  name: string;
  price: number;
  productId: string;
  salePrice?: number;
  productFor: string;
  productSize: number[];
  mainPicture: string;
}

const ProductOnPage: NextPage<IProductOnPageProps> = ({
  name,
  price,
  productId,
  salePrice,
  productFor,
  productSize,
  mainPicture,
}) => {
  const { productInBag, productsFavorite } = useAppSelector(
    (state) => state.product
  );
  const { isAuth, user } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  const router = useRouter();

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
    <ProductOnPageBox>
      <ChooseSizeModal
        isModalOpened={open}
        handleClose={handleClose}
        productSize={productSize}
        price={price}
        salePrice={salePrice}
        productId={productId}
        productName={name}
        productPhoto={mainPicture}
        productFor={productFor}
      />
      <ProductOnPagePhoto>
        <img
          src={`${BASIC_URL}/${mainPicture}`}
          width="370px"
          height="335px"
          onClick={() =>
            router.push(`/product/${productFor}/${name}/${productId}`)
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
      </ProductOnPagePhoto>
      <ProductOnPageInfo>
        <Link href={`/product/${productFor}/${name}/${productId}`}>
          <Typography
            variant="roboto20400"
            marginBottom="8px"
            color={Colors.black}
            sx={{ cursor: 'pointer' }}
          >
            {name}
          </Typography>
        </Link>
        {salePrice === 0 ? (
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
      </ProductOnPageInfo>
    </ProductOnPageBox>
  );
};

export default ProductOnPage;

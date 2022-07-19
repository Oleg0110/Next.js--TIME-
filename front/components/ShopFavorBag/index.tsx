import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import theme, { Colors } from '../../styles/theme';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import { Slide, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CustomButton from '../CustomButton';
import { NextPage } from 'next';
import { useAppSelector } from '../../hooks/redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  ButtonBox,
  ResultBox,
  StyledBadge,
  TotalBox,
} from '../../styles/shopFavorBag';
import ShopFavorBagModal from '../ShopFavorCartModal';
import ProductInBag from '../ProductInBag';
import { toast } from 'react-toastify';
import { totalPriceFunc } from '../../utils/function';
import { useRouter } from 'next/router';
import { ROUTES } from '../../utils/constants';

interface IShopFavorBagProps {
  who: 'bag' | 'favorite';
}

const ShopFavorBag: NextPage<IShopFavorBagProps> = ({ who }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');
  const router = useRouter();

  const { productInBag, productsFavorite } = useAppSelector(
    (state) => state.product
  );

  const totalPrice = totalPriceFunc(productInBag);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {who === 'bag' ? (
          <TooltipIcon
            title="shopping-bag"
            onClick={(event) => {
              productInBag[0]
                ? handleClick(event)
                : toast.warning('Shopping Bag is empty');
            }}
          >
            {productInBag[0] && open ? (
              <StyledBadge badgeContent={productInBag.length} color="secondary">
                <div className={styles.bagHeaderFilled} />
              </StyledBadge>
            ) : (
              <StyledBadge badgeContent={productInBag.length} color="secondary">
                <div className={styles.bagHeader} />
              </StyledBadge>
            )}
          </TooltipIcon>
        ) : (
          <TooltipIcon
            title="favorites"
            onClick={(event) => {
              productsFavorite[0]
                ? handleClick(event)
                : toast.warning('Favorite is empty');
            }}
          >
            {productsFavorite[0] && open ? (
              <StyledBadge
                badgeContent={productsFavorite.length}
                color="secondary"
              >
                <div className={styles.likeHeaderFilled} />
              </StyledBadge>
            ) : (
              <StyledBadge
                badgeContent={productsFavorite.length}
                color="secondary"
              >
                <div className={styles.likeHeader} />
              </StyledBadge>
            )}
          </TooltipIcon>
        )}
      </Box>
      {media ? (
        <ShopFavorBagModal
          isModalOpened={open}
          handleClose={handleClose}
          who={who}
          totalPrice={totalPrice}
        />
      ) : (
        <>
          <Menu
            variant="selectedMenu"
            anchorEl={anchorEl}
            id="account-menu"
            open={productInBag[0] !== undefined && open}
            onClose={handleClose}
            disableScrollLock={true}
          >
            {who === 'bag' ? (
              <div>
                {productInBag &&
                  productInBag.map((data) => (
                    <div key={data.productId}>
                      <ProductInBag
                        price={data.price}
                        productId={data.productId}
                        productName={data.productName}
                        productPhoto={data.productPhoto}
                        salePrice={data.salePrice}
                        sizeProduct={data.sizeProduct}
                        who="bag"
                      />
                    </div>
                  ))}
                <ResultBox>
                  <TotalBox>
                    <Typography variant="roboto24200" color={Colors.black}>
                      {t('total')}
                    </Typography>
                    <Typography variant="roboto20400" color={Colors.black}>
                      {totalPrice} UAH
                    </Typography>
                  </TotalBox>
                  <ButtonBox>
                    <CustomButton
                      size="LG"
                      variant="secondary"
                      style={{ marginBottom: '15px' }}
                      onClick={() =>
                        productInBag[0] !== undefined && router.push(ROUTES.bag)
                      }
                    >
                      {t('order')}
                    </CustomButton>
                    <CustomButton
                      size="LG"
                      variant="primary"
                      onClick={() => setAnchorEl(null)}
                    >
                      {t('continue')}
                    </CustomButton>
                  </ButtonBox>
                </ResultBox>
              </div>
            ) : (
              <div>
                {productsFavorite &&
                  productsFavorite.map((data) => (
                    <div key={data.id}>
                      <ProductInBag
                        price={data.product.productPrice}
                        favoriteId={data.id}
                        productName={data.product.productName}
                        productPhoto={data.product.productMainPictures}
                        salePrice={data.product.productDiscountPrice}
                        who="favorite"
                      />
                    </div>
                  ))}
              </div>
            )}
          </Menu>
        </>
      )}
    </>
  );
};

export default ShopFavorBag;

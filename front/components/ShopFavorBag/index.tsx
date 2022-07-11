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

interface IShopFavorBagProps {
  who: 'bag' | 'favorite';
}

const ShopFavorBag: NextPage<IShopFavorBagProps> = ({ who }) => {
  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');

  const { productInBag } = useAppSelector((state) => state.product);

  let totalPrice: number = 0;

  for (let i = 0; i < productInBag.length; i++) {
    if (productInBag[i].salePrice !== 0) {
      totalPrice += productInBag[i].salePrice;
    } else {
      totalPrice += productInBag[i].price;
    }
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
          <TooltipIcon title="shopping-bag" onClick={handleClick}>
            {open ? (
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
          <TooltipIcon title="favorites" onClick={handleClick}>
            {open ? (
              <div className={styles.likeHeaderFilled} />
            ) : (
              <div className={styles.likeHeader} />
            )}
          </TooltipIcon>
        )}
      </Box>
      {media ? (
        <ShopFavorBagModal
          isModalOpened={open}
          handleClose={handleClose}
          who={who}
        />
      ) : (
        <>
          <Menu
            variant="selectedMenu"
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
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

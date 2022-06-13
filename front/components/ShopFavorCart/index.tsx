import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import theme, { Colors } from '../../styles/theme';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import { Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ProductInCart from '../ProductInCart';
import { ButtonBox, ResultBox, TotalBox } from '../../styles/shopFavorCart';
import CustomButton from '../Button';
import ShopFavorCartModal from '../ShopFavorCartModal';

interface IShopFavorCartProps {
  who: 'cart' | 'favorite';
}

const ShopFavorCart: React.FC<IShopFavorCartProps> = ({ who }) => {
  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('shopFavorCart');

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
        {who === 'cart' ? (
          <TooltipIcon title="shopping-cart" onClick={handleClick}>
            {open ? (
              <div className={styles.bagHeaderFilled} />
            ) : (
              <div className={styles.bagHeader} />
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
        <ShopFavorCartModal
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
            onClick={handleClose}
            disableScrollLock={true}
          >
            {who === 'cart' ? (
              <div>
                <ProductInCart />
                <ProductInCart />
                <ProductInCart />
                <ResultBox>
                  <TotalBox>
                    <Typography variant="roboto24200" color={Colors.black}>
                      {t('total')}
                    </Typography>
                    <Typography variant="roboto20400" color={Colors.black}>
                      3849 UAH
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
                <ProductInCart />
                <ProductInCart />
                <ProductInCart />
                <ProductInCart />
              </div>
            )}
          </Menu>
        </>
      )}
    </>
  );
};

export default ShopFavorCart;

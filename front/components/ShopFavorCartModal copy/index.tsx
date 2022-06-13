import React from 'react';
import Box from '@mui/material/Box';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ProductInCart from '../ProductInCart';
import { ButtonBox, ResultBox, TotalBox } from '../../styles/shopFavorCart';
import CustomButton from '../Button';
import { Colors } from '../../styles/theme';
import { MainBox } from '../../styles/shopFavorCartModal';

interface IShopFavorCartModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
  who: 'cart' | 'favorite';
}

const ShopFavorCartModal: React.FC<IShopFavorCartModalProps> = ({
  isModalOpened,
  handleClose,
  who,
}) => {
  const { t } = useTranslation('shopFavorCart');
  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <MainBox>
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
                    onClick={handleClose}
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
        </MainBox>
      </Modal>
    </>
  );
};

export default ShopFavorCartModal;

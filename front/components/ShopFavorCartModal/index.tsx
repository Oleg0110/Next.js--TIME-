import React from 'react';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { MainBox } from '../../styles/ShopFavorBagModal';
import { ButtonBox, ResultBox, TotalBox } from '../../styles/shopFavorBag';
import CustomButton from '../CustomButton';
import ProductInBag from '../ProductInBag';

interface IShopFavorBagModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
  who: 'bag' | 'favorite';
}

const ShopFavorBagModal: NextPage<IShopFavorBagModalProps> = ({
  isModalOpened,
  handleClose,
  who,
}) => {
  const { t } = useTranslation('common');
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
          {who === 'bag' ? (
            <div>
              {/* <ProductInBag />
              <ProductInBag />
              <ProductInBag /> */}
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
              {/* <ProductInBag />
              <ProductInBag />
              <ProductInBag />
              <ProductInBag /> */}
            </div>
          )}
        </MainBox>
      </Modal>
    </>
  );
};

export default ShopFavorBagModal;

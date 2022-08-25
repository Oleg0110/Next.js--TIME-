import React from 'react';
import { ROUTES } from '../../utils/constants';
import { useRouter } from 'next/router';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { BagMainModalBox } from '../../styles/modal';
import { ButtonBox, ResultBox, TotalBox } from '../../styles/shopFavorBag';
import { useAppSelector } from '../../hooks/redux';
import CustomButton from '../CustomButton';
import ProductInBag from '../ProductInBag';

interface IShopFavorBagModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
  who: 'bag' | 'favorite';
  totalPrice: number;
}

const ShopFavorBagModal: NextPage<IShopFavorBagModalProps> = ({
  isModalOpened,
  handleClose,
  who,
  totalPrice,
}) => {
  const { t } = useTranslation('common');

  const router = useRouter();

  const { productInBag, productsFavorite } = useAppSelector(
    (state) => state.product
  );

  return (
    <>
      <Modal
        open={productInBag[0] !== undefined && isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <BagMainModalBox>
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
                      productFor={data.productFor}
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
                    onClick={handleClose}
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
                      productFor={data.product.productFor}
                      productId={data.product.id}
                    />
                  </div>
                ))}
            </div>
          )}
        </BagMainModalBox>
      </Modal>
    </>
  );
};

export default ShopFavorBagModal;

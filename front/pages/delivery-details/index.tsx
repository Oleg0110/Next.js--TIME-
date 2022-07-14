import React from 'react';
import { Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppSelector } from '../../hooks/redux';
import { Colors } from '../../styles/theme';
import { totalPriceFunc } from '../../utils/function';
import MainLayout from '../../layouts/MainLayout';
import CustomButton from '../../components/CustomButton';
import {
  DeliveryContainer,
  DeliveryContent,
  DeliveryMainBox,
  ProductOnDeliveryBox,
  ProductOnDeliveryScroll,
} from '../../styles/deliveryDetails';
import DeliveryForm from './DeliveryForm';
import ProductOnDelivery from '../../components/ProductOnDelivery';
import { useTranslation } from 'next-i18next';

const Bag = () => {
  const { productInBag } = useAppSelector((state) => state.product);
  const totalPrice = totalPriceFunc(productInBag);

  const { t } = useTranslation('delivery');

  return (
    <MainLayout>
      <DeliveryContainer>
        <DeliveryMainBox>
          <Typography
            variant="h1"
            sx={{ color: Colors.secondaryWhite, margin: '30px 0px' }}
          >
            {t('title')}
          </Typography>
          <DeliveryContent>
            <ProductOnDeliveryBox>
              <Typography variant="roboto36400">{t('yourOrder')}</Typography>
              <ProductOnDeliveryScroll>
                {productInBag &&
                  productInBag.map((data) => (
                    <>
                      <ProductOnDelivery
                        price={data.price}
                        productName={data.productName}
                        productPhoto={data.productPhoto}
                        salePrice={data.salePrice}
                        sizeProduct={data.sizeProduct}
                        productAmount={data.productAmount}
                      />
                    </>
                  ))}
              </ProductOnDeliveryScroll>
              <Typography
                variant="roboto20200"
                sx={{
                  color: Colors.secondaryWhite,
                  margin: '30px 0px 10px',
                  width: '100%',
                }}
              >
                {t('total')}:
                <Typography variant="roboto24200" sx={{ marginLeft: '10px' }}>
                  {totalPrice} UAH
                </Typography>
              </Typography>
              <Typography
                variant="roboto20200"
                sx={{
                  width: '100%',
                  textAlign: 'start',
                }}
              >
                * - {t('attention')}
              </Typography>
            </ProductOnDeliveryBox>
            <DeliveryForm totalPrice={totalPrice} />
          </DeliveryContent>
        </DeliveryMainBox>
      </DeliveryContainer>
    </MainLayout>
  );
};

export default Bag;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'delivery'])),
  },
});

import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppSelector } from '../../hooks/redux';
import { totalPriceFunc } from '../../utils/function';
import {
  DeliveryContainer,
  DeliveryContent,
  DeliveryMainBox,
  ProductOnDeliveryBox,
  ProductOnDeliveryContainer,
  ProductOnDeliveryScroll,
} from '../../styles/deliveryDetails';
import { useTranslation } from 'next-i18next';
import DeliveryForm from './DeliveryForm';
import MainLayout from '../../layouts/MainLayout';
import ProductOnDelivery from '../../components/ProductOnDelivery';

const Bag = () => {
  const { t } = useTranslation('delivery');

  const { productInBag } = useAppSelector((state) => state.product);

  const totalPrice = totalPriceFunc(productInBag);

  return (
    <MainLayout
      title="Delivery details"
      keywords="delivery, data, postal data"
      description="Delivery details"
    >
      <DeliveryContainer>
        <DeliveryMainBox>
          <Typography
            variant="h1"
            sx={{
              color: Colors.secondaryWhite,
              margin: '30px 0px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                margin: '10px 0px',
              },
            }}
          >
            {t('title')}
          </Typography>
          <DeliveryContent>
            <ProductOnDeliveryBox>
              <Typography
                variant="roboto36400"
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '20px',
                  },
                }}
              >
                {t('yourOrder')}
              </Typography>
              <ProductOnDeliveryScroll>
                {productInBag &&
                  productInBag.map((data) => (
                    <ProductOnDeliveryContainer key={data.productId}>
                      <ProductOnDelivery
                        price={data.price}
                        productName={data.productName}
                        productPhoto={data.productPhoto}
                        salePrice={data.salePrice}
                        sizeProduct={data.sizeProduct}
                        productAmount={data.productAmount}
                        productFor={data.productFor}
                        productId={data.productId}
                      />
                    </ProductOnDeliveryContainer>
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

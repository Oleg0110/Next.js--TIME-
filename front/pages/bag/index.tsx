import React from 'react';
import { Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppSelector } from '../../hooks/redux';
import {
  BagPageContainer,
  BagPageContent,
  ProductOnBagBox,
  ProductOnBagContainer,
} from '../../styles/bag';
import { Colors } from '../../styles/theme';
import { totalPriceFunc } from '../../utils/function';
import ProductOnBagPage from '../../components/ProductOnBagPage';
import MainLayout from '../../layouts/MainLayout';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'next/router';
import { ROUTES } from '../../utils/constants';
import { useTranslation } from 'next-i18next';

const Bag = () => {
  const { productInBag } = useAppSelector((state) => state.product);
  const totalPrice = totalPriceFunc(productInBag);

  const router = useRouter();
  const { t } = useTranslation('delivery');

  return (
    <MainLayout>
      <BagPageContainer>
        <BagPageContent>
          <Typography
            variant="h1"
            sx={{ color: Colors.secondaryWhite, margin: '30px 0px' }}
          >
            {t('bagTitle')}
          </Typography>
          <ProductOnBagBox>
            {productInBag &&
              productInBag.map((data) => (
                <ProductOnBagContainer key={data.productId}>
                  <ProductOnBagPage
                    price={data.price}
                    productId={data.productId}
                    productName={data.productName}
                    productPhoto={data.productPhoto}
                    salePrice={data.salePrice}
                    sizeProduct={data.sizeProduct}
                    productAmount={data.productAmount}
                  />
                </ProductOnBagContainer>
              ))}
          </ProductOnBagBox>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.secondaryWhite, margin: '30px 0px 20px' }}
          >
            {t('total')}:
            <Typography variant="roboto24200" sx={{ marginLeft: '10px' }}>
              {totalPrice} UAH
            </Typography>
          </Typography>
          <CustomButton
            size="LG"
            style={{ fontSize: '25px' }}
            onClick={() => router.push(ROUTES.delivery)}
          >
            {t('order')}
          </CustomButton>
        </BagPageContent>
      </BagPageContainer>
    </MainLayout>
  );
};

export default Bag;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'delivery'])),
  },
});

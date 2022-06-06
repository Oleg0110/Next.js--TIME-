// import useTranslation from 'next-translate/useTranslation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const ShippingAndPayment = () => {
  const { t } = useTranslation('new');

  return (
    <MainLayout>
      <div>{t('new')}ShippingAndPayment</div>
    </MainLayout>
  );
};

export default ShippingAndPayment;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['about-us', 'common'])),
  },
});

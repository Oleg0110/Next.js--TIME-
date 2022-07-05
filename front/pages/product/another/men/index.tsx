// import useTranslation from 'next-translate/useTranslation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import MainLayout from '../../../../layouts/MainLayout';

const Men = () => {
  const { t } = useTranslation('new');

  return (
    <MainLayout>
      <div>{t('new')}Men</div>
    </MainLayout>
  );
};

export default Men;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['men', 'common'])),
  },
});

// import useTranslation from 'next-translate/useTranslation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const FAQ = () => {
  const { t } = useTranslation('new');

  return (
    <MainLayout>
      <div>{t('new')}FAQ</div>
    </MainLayout>
  );
};

export default FAQ;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['FAQ', 'common'])),
  },
});

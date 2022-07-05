// import useTranslation from 'next-translate/useTranslation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../hooks/redux';
import MainLayout from '../../../../layouts/MainLayout';

const Women = () => {
  const { t } = useTranslation('women');

  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <MainLayout>
      <div>Women</div>
    </MainLayout>
  );
};

export default Women;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['women', 'common'])),
  },
});

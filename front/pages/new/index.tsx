// import useTranslation from 'next-translate/useTranslation';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

const NEW = () => {
  const { t } = useTranslation('new');
  return <div>{t('new')}</div>;
};

export default NEW;

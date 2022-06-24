import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '../../utils/constants';

const Catalog = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Typography variant="roboto24500">{t('catalog')}</Typography>
      <Link href={ROUTES.women}>
        <Typography variant="roboto24200hover">
          {t('women-products')}
        </Typography>
      </Link>
      <Link href={ROUTES.men}>
        <Typography variant="roboto24200hover">{t('men-products')}</Typography>
      </Link>
      <Link href={ROUTES.sale}>
        <Typography variant="roboto24200hover">{t('sale-footer')}</Typography>
      </Link>
      <Link href={ROUTES.new}>
        <Typography variant="roboto24200hover">{t('new-footer')}</Typography>
      </Link>
    </>
  );
};

export default Catalog;

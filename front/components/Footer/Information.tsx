import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { Colors } from '../../styles/theme';
import { ROUTES } from '../../utils/constants';

const Information = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Typography variant="roboto24500">{t('information')}</Typography>
      <Link href={ROUTES.aboutUs}>
        <Typography variant="roboto24200hover">{t('about-us')}</Typography>
      </Link>
      <Link href={ROUTES.shipping}>
        <Typography variant="roboto24200hover">
          {t('shipping-payment')}
        </Typography>
      </Link>
      <Link href={ROUTES.FAQ}>
        <Typography variant="roboto24200hover">FAQ</Typography>
      </Link>
      <Link href={ROUTES.personalOffice}>
        <Typography variant="roboto24200hover">
          {t('personal-office')}
        </Typography>
      </Link>
    </>
  );
};

export default Information;

import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import { ROUTES } from '../../utils/constants';
import Link from 'next/link';
import { useAppSelector } from '../../hooks/redux';

const Information = () => {
  const { t } = useTranslation('common');
  const { isAuth } = useAppSelector((state) => state.user);

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
      {isAuth && (
        <Link href={ROUTES.personalOffice}>
          <Typography variant="roboto24200hover">
            {t('personal-office')}
          </Typography>
        </Link>
      )}
    </>
  );
};

export default Information;

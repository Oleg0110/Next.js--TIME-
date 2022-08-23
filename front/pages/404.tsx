import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ErrorContainer, ErrorContent, WarningBox } from '../styles/404';
import { Colors } from '../styles/theme';
import { ROUTES } from '../utils/constants';
import Link from 'next/link';
import CustomButton from '../components/CustomButton';
import MainLayout from '../layouts/MainLayout';

const Error = () => {
  const { t } = useTranslation('error');

  return (
    <MainLayout>
      <ErrorContainer>
        <ErrorContent>
          <Typography variant="error" component="h1">
            404
          </Typography>
          <WarningBox>
            <Typography variant="h1" color={Colors.secondaryWhite}>
              {t('not')}
            </Typography>
            <Typography variant="roboto36400" color={Colors.lightGray}>
              {t('warning')}
            </Typography>
            <CustomButton
              style={{
                margin: '10px 0px 20px',
              }}
              size="LG"
            >
              <Link href={ROUTES.home}>
                <Typography variant="inherit" color="inherit">
                  {t('button-text')}
                </Typography>
              </Link>
            </CustomButton>
          </WarningBox>
        </ErrorContent>
      </ErrorContainer>
    </MainLayout>
  );
};

export default Error;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['error', 'common'])),
  },
});

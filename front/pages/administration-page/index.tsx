import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  AdminContent,
  ButtonAdminBox,
  ButtonAdminStyle,
  MainAdminBox,
} from '../../styles/administration';
import theme, { Colors } from '../../styles/theme';
import AddProduct from './AddProduct';
import ChangeDelete from './ChangeDelete';

const AdministrationPage = ({ children }) => {
  const { t } = useTranslation('admin');
  const [isActive, setIsActive] = useState<
    'add' | 'change' | 'customer' | 'orders' | 'empty'
  >('empty');

  return (
    <MainLayout>
      <MainAdminBox>
        <AdminContent>
          <Typography
            variant="h1"
            sx={{
              color: Colors.primary,
              [theme.breakpoints.down('sm')]: { fontSize: '30px' },
            }}
          >
            {t('administration-page')}
          </Typography>
          {isActive === 'empty' && (
            <Typography
              variant="roboto24200"
              sx={{
                color: Colors.primary,
                textAlign: 'center',
                margin: '20px 0px',
              }}
            >
              {t('what')}
            </Typography>
          )}
          <ButtonAdminBox>
            <ButtonAdminStyle
              onClick={(e) => {
                setIsActive('add');
                e.stopPropagation();
              }}
              sx={
                isActive === 'add' && {
                  color: Colors.black,
                  borderBottom: `3px solid ${Colors.black}`,
                }
              }
            >
              {t('add-product')}
            </ButtonAdminStyle>
            <ButtonAdminStyle
              onClick={(e) => {
                setIsActive('change');
                e.stopPropagation();
              }}
              sx={
                isActive === 'change' && {
                  color: Colors.black,
                  borderBottom: `3px solid ${Colors.black}`,
                }
              }
            >
              {t('change-delete')}
            </ButtonAdminStyle>
            <ButtonAdminStyle
              onClick={(e) => {
                setIsActive('customer');
                e.stopPropagation();
              }}
              sx={
                isActive === 'customer' && {
                  color: Colors.black,
                  borderBottom: `3px solid ${Colors.black}`,
                }
              }
            >
              {t('customers-management')}
            </ButtonAdminStyle>
            <ButtonAdminStyle
              onClick={(e) => {
                setIsActive('orders');
                e.stopPropagation();
              }}
              sx={
                isActive === 'orders' && {
                  color: Colors.black,
                  borderBottom: `3px solid ${Colors.black}`,
                }
              }
            >
              {t('orders')}
            </ButtonAdminStyle>
          </ButtonAdminBox>
          {isActive === 'add' && <AddProduct />}
          {isActive === 'change' && <ChangeDelete />}
        </AdminContent>
      </MainAdminBox>
    </MainLayout>
  );
};

export default AdministrationPage;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['admin', 'common'])),
  },
});

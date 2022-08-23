import React, { useEffect, useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  AdminContent,
  AdminPageBox,
  ButtonAdminBox,
  ButtonAdminStyle,
  MainAdminBox,
  StyledOrdersBadge,
} from '../../styles/administration';
import { useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import AddProduct from './AddProduct';
import ChangeDelete from './ChangeDelete';
import UserManagement from './UserManagement';
import Order from './Order';

const activeButtonStyle = {
  fontWeight: '500',
  color: Colors.primary,
  borderBottom: `2px solid ${Colors.primary}`,
};

const AdministrationPage = () => {
  const { t } = useTranslation('admin');

  const router = useRouter();

  const { ordersUnconfirmed } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);

  const [isActive, setIsActive] = useState<
    'add' | 'change' | 'user' | 'orders'
  >('orders');

  useEffect(() => {
    user && user.userRole === 'user' && router.push('/404');
  }, [user]);

  return (
    <MainLayout>
      <MainAdminBox>
        <AdminPageBox>
          <Typography
            variant="h1"
            sx={{
              color: Colors.primary,
              marginBottom: '15px',
              [theme.breakpoints.down('sm')]: { fontSize: '30px' },
            }}
          >
            {t('administration-page')}
          </Typography>
          <AdminContent>
            <ButtonAdminBox>
              <ButtonAdminStyle
                onClick={(e) => {
                  setIsActive('add');
                  e.stopPropagation();
                }}
                sx={isActive === 'add' && activeButtonStyle}
              >
                <Typography
                  sx={{
                    lineHeight: '0.8',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '10px',
                    },
                  }}
                >
                  {t('add-product')}
                </Typography>
              </ButtonAdminStyle>
              <ButtonAdminStyle
                onClick={(e) => {
                  setIsActive('change');
                  e.stopPropagation();
                }}
                sx={isActive === 'change' && activeButtonStyle}
              >
                <Typography
                  sx={{
                    lineHeight: '0.9',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '10px',
                    },
                  }}
                >
                  {t('change-delete')}
                </Typography>
              </ButtonAdminStyle>
              <ButtonAdminStyle
                onClick={(e) => {
                  setIsActive('user');
                  e.stopPropagation();
                }}
                sx={isActive === 'user' && activeButtonStyle}
              >
                <Typography
                  sx={{
                    lineHeight: '0.8',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '10px',
                    },
                  }}
                >
                  {t('users-management')}
                </Typography>
              </ButtonAdminStyle>
              <ButtonAdminStyle
                onClick={(e) => {
                  setIsActive('orders');
                  e.stopPropagation();
                }}
                sx={isActive === 'orders' && activeButtonStyle}
              >
                <StyledOrdersBadge
                  badgeContent={ordersUnconfirmed.length}
                  color="secondary"
                >
                  <Typography
                    sx={{
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '10px',
                      },
                    }}
                  >
                    {t('orders')}
                  </Typography>
                </StyledOrdersBadge>
              </ButtonAdminStyle>
            </ButtonAdminBox>
            {isActive === 'add' && <AddProduct />}
            {isActive === 'change' && <ChangeDelete />}
            {isActive === 'user' && <UserManagement />}
            {isActive === 'orders' && <Order />}
          </AdminContent>
        </AdminPageBox>
      </MainAdminBox>
    </MainLayout>
  );
};

export default AdministrationPage;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'toast', 'common'])),
    },
  };
};

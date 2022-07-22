import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  ChangeUserErrorMessage,
  ChangeUserInputBox,
  CheckBoxButton,
  ContentOfficeBox,
  InputChangeUser,
  LoadingPosition,
  MainOfficeBox,
  OfficeLine,
  TypographyUserOffice,
  UserInfoBox,
  UserOrdersBox,
  UserOrdersScrollBox,
  UserProductsOrdersBox,
  UserTypographyBox,
} from '../../styles/personalOffice';
import theme, { Colors } from '../../styles/theme';
import MainLayout from '../../layouts/MainLayout';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TooltipIcon from '../../components/TooltipIcon/TooltipIcon';
import CustomButton from '../../components/CustomButton';
import {
  addPhoneNumber,
  changeUserData,
  deleteUser,
  getOrders,
} from '../../store/services/UserService';
import {
  OrdersProductsBox,
  OrdersScrollBox,
} from '../../styles/administration';
import ProductOrderAccordion from '../../components/ProductOrderAccordion';
import UserOrderAccordion from '../../components/UserOrderAccordion';
import { Form, Formik } from 'formik';
import { phoneRegExp, stringRegExp } from '../../utils/constants';
import { object, string } from 'yup';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CheckPasswordModal from '../../components/CheckPasswordModal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IChangeProps } from '../../utils/interface/userInterface';
import UserNameField from './UserNameField';
import UserSurnameField from './UserSurnameField';
import UserEmailField from './UserEmailField';
import UserPhoneField from './UserPhoneField';
import UserOrders from './UserOrders';
import ChangePasswordModal from '../../components/ChangePasswordModal';

const PersonalOffice = () => {
  const { t } = useTranslation('office');

  const { user } = useAppSelector((state) => state.user);

  const [isChange, setIsChange] = useState<IChangeProps>({
    name: false,
    surname: false,
    email: false,
    phone: false,
    password: false,
  });
  const [isPasswordConfig, setIsPasswordConfig] = useState(false);
  const [isNewPasswordModal, setIsNewPasswordModal] = useState(false);
  const [what, setWhat] = useState<'delete' | 'email' | 'password' | 'empty'>(
    'empty'
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseChangePassword = () => {
    setIsNewPasswordModal(false);
  };

  return (
    <MainLayout>
      {(isChange.email || isChange.delete || isChange.password) && (
        <CheckPasswordModal
          handleClose={handleClose}
          isModalOpened={open}
          setIsPasswordConfig={setIsPasswordConfig}
          userId={user?.id}
          what={what}
          setIsNewPasswordModal={setIsNewPasswordModal}
        />
      )}
      {isNewPasswordModal && (
        <ChangePasswordModal
          handleCloseChangePassword={handleCloseChangePassword}
          isModalOpened={isNewPasswordModal}
          userId={user?.id}
        />
      )}
      {user && (
        <MainOfficeBox>
          <ContentOfficeBox>
            <Typography
              variant="h1"
              sx={{
                color: Colors.secondaryWhite,
                margin: '20px 0px',
                textAlign: 'start',
                width: '90%',
                fontSize: '35px',
              }}
            >
              {t('office-title')}
            </Typography>
            <UserInfoBox>
              <Typography
                variant="roboto20200"
                sx={{
                  color: Colors.secondaryWhite,
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {t('personal-info')}
              </Typography>
              <UserNameField
                isChange={isChange}
                name={user.name}
                setIsChange={setIsChange}
                userId={user.id}
              />
              <OfficeLine />
              <UserSurnameField
                isChange={isChange}
                surname={user.surname}
                setIsChange={setIsChange}
                userId={user.id}
              />
              <OfficeLine />
              <UserEmailField
                isChange={isChange}
                email={user.email}
                setIsChange={setIsChange}
                userId={user.id}
                handleClick={handleClick}
                isPasswordConfig={isPasswordConfig}
                setIsPasswordConfig={setIsPasswordConfig}
                setWhat={setWhat}
              />
              <OfficeLine />
              <UserPhoneField
                isChange={isChange}
                phone={user.phone}
                setIsChange={setIsChange}
                userId={user.id}
              />
              <OfficeLine />
              <UserTypographyBox>
                <TypographyUserOffice>{t('password')}</TypographyUserOffice>
                <Typography
                  variant="roboto20200"
                  sx={{
                    color: Colors.lightGray,
                    textAlign: 'start',
                    cursor: 'pointer',
                    ':hover': {
                      color: Colors.darkGray,
                    },
                    [theme.breakpoints.down('md')]: {
                      fontSize: '16px',
                    },
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '12px',
                    },
                  }}
                  onClick={(e) => {
                    setIsChange({ password: true });
                    setWhat('password');
                    handleClick(e);
                  }}
                >
                  {t('click-to-change-password')}
                </Typography>
              </UserTypographyBox>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'end',
                  margin: '0px 10px 10px 0px',
                }}
              >
                <Typography
                  variant="roboto16200"
                  sx={{
                    color: Colors.saleColor,
                    textAlign: 'end',
                    padding: '0px 5px',
                    border: `1px solid ${Colors.saleColor}`,
                    borderRadius: '3px',
                    cursor: 'pointer',
                    ':hover': {
                      opacity: '0.8',
                    },
                  }}
                  onClick={(e) => {
                    setIsChange({ delete: true });
                    setWhat('delete');
                    handleClick(e);
                  }}
                >
                  {t('delete-account')}
                </Typography>
              </Box>
            </UserInfoBox>
            <UserOrders />
          </ContentOfficeBox>
        </MainOfficeBox>
      )}
    </MainLayout>
  );
};

export default PersonalOffice;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['office', 'common'])),
  },
});

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import theme, { Colors } from '../../styles/theme';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import { Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import AccountMenuModal from '../AccountMenuModal';
import {
  AuthErrorMessage,
  ButtonAccountMenuBox,
  ButtonAccountMenuStyle,
  FormAuthBox,
  InputAuth,
  InputsAccountMenuBox,
} from '../../styles/accountMenu';
import CustomButton from '../CustomButton';
import { NextPage } from 'next';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { login, registration } from '../../store/services/UserService';
import { stringRegExp } from '../../utils/constants';

const AccountMenu: NextPage = ({}) => {
  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();

  const [isEntry, setIsEntry] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const initialLoginValues = {
    email: '',
    password: '',
  };

  const initialRegistrationValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  const validationLoginSchema = object().shape({
    email: string().email('Not a proper email').required('Required'),
    password: string()
      .min(8, 'Password too short')
      .matches(/\d+/, 'Password no number')
      .matches(/[a-z]+/, 'Password no lowercase')
      .matches(/[A-Z]+/, 'Password no uppercase')
      .test(
        'Password has spaces',
        'Password has spaces',
        (value) => !/\s+/.test(value)
      )
      .required('password is required'),
  });

  const validationRegistrationSchema = object().shape({
    name: string()
      .max(15, 'Too Long')
      .matches(stringRegExp, 'Name is not valid')
      .required('Required')
      .test(
        'Password has spaces',
        'Password has spaces',
        (value) => !/\s+/.test(value)
      ),
    surname: string()
      .max(15, 'Too Long')
      .matches(stringRegExp, 'Surname is not valid')
      .required('Required'),
    email: string().email('Not a proper email').required('Required'),
    password: string()
      .min(8, 'Password too short')
      .matches(/\d+/, 'Password no number')
      .matches(/[a-z]+/, 'Password no lowercase')
      .matches(/[A-Z]+/, 'Password no uppercase')
      .test(
        'Password has spaces',
        'Password has spaces',
        (value) => !/\s+/.test(value)
      )
      .required('password is required'),
  });

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <TooltipIcon title="your-account" onClick={handleClick}>
          {open ? (
            <div className={styles.personFilled} />
          ) : (
            <div className={styles.person} />
          )}
        </TooltipIcon>
      </Box>
      {media ? (
        <AccountMenuModal isModalOpened={open} handleClose={handleClose} />
      ) : (
        <>
          <Menu
            variant="menu"
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            disableScrollLock={true}
            sx={{ overflow: 'none' }}
          >
            {/* <MenuItem>
          <Avatar>M</Avatar>
          <Typography
            marginLeft="5px"
            variant="roboto20400"
            color={Colors.black}
          >
            {t('profile')}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" style={{ color: `${Colors.primary}` }} />
          </ListItemIcon>
          {t('logout')}
        </MenuItem> */}
            <ButtonAccountMenuBox>
              <ButtonAccountMenuStyle
                onClick={(e) => {
                  setIsEntry(true);
                  e.stopPropagation();
                }}
                sx={
                  isEntry && {
                    color: Colors.primary,
                    borderBottom: `3px solid ${Colors.primary}`,
                  }
                }
              >
                {t('entry')}
              </ButtonAccountMenuStyle>
              <ButtonAccountMenuStyle
                onClick={(e) => {
                  setIsEntry(false);
                  e.stopPropagation();
                }}
                sx={
                  !isEntry && {
                    color: Colors.primary,
                    borderBottom: `3px solid ${Colors.primary}`,
                  }
                }
              >
                {t('registration')}
              </ButtonAccountMenuStyle>
            </ButtonAccountMenuBox>
            {isEntry ? (
              <InputsAccountMenuBox>
                <Typography variant="roboto36400" color={Colors.primary}>
                  {t('loginToUpper')}
                </Typography>
                <Formik
                  initialValues={initialLoginValues}
                  validationSchema={validationLoginSchema}
                  onSubmit={async (values) => {
                    await dispatch(
                      login({ email: values.email, password: values.password })
                    );
                  }}
                >
                  {({ handleSubmit }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <FormAuthBox>
                          <AuthErrorMessage name="email" component="span" />
                          <InputAuth
                            name="email"
                            id="email"
                            placeholder="Email"
                          />
                          <AuthErrorMessage name="password" component="span" />
                          <InputAuth
                            name="password"
                            id="password"
                            placeholder="Password"
                          />
                        </FormAuthBox>
                        <CustomButton
                          size="SM"
                          variant="secondary"
                          type="submit"
                          style={{ margin: '20px 0px' }}
                        >
                          {t('login')}
                        </CustomButton>
                      </Form>
                    );
                  }}
                </Formik>
              </InputsAccountMenuBox>
            ) : (
              <InputsAccountMenuBox>
                <Typography variant="roboto36400" color={Colors.primary}>
                  {t('registration')}
                </Typography>
                <Formik
                  initialValues={initialRegistrationValues}
                  validationSchema={validationRegistrationSchema}
                  onSubmit={async (values) => {
                    await dispatch(
                      registration({
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        surname: values.surname,
                      })
                    );
                  }}
                >
                  {({ handleSubmit }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <FormAuthBox>
                          <AuthErrorMessage name="name" component="span" />
                          <InputAuth name="name" id="name" placeholder="Name" />
                          <AuthErrorMessage name="surname" component="span" />
                          <InputAuth
                            name="surname"
                            id="surname"
                            placeholder="Surname"
                          />
                          <AuthErrorMessage name="email" component="span" />
                          <InputAuth
                            name="email"
                            id="email"
                            placeholder="Email"
                          />
                          <AuthErrorMessage name="password" component="span" />
                          <InputAuth
                            name="password"
                            id="password"
                            placeholder="Password"
                          />
                          <CustomButton
                            size="SM"
                            variant="secondary"
                            type="submit"
                            style={{ margin: '20px 0px' }}
                          >
                            {t('registration')}
                          </CustomButton>
                        </FormAuthBox>
                      </Form>
                    );
                  }}
                </Formik>
              </InputsAccountMenuBox>
            )}
          </Menu>
        </>
      )}
    </>
  );
};

export default AccountMenu;

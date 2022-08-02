import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { object, string } from 'yup';
import {
  AuthErrorMessage,
  FormAuthBox,
  FormAuthButtonPosition,
  FormAuthInputBox,
  InputAuth,
  InputsAccountMenuBox,
} from '../../styles/accountMenu';
import { CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Colors } from '../../styles/theme';
import { login } from '../../store/services/UserService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomButton from '../CustomButton';
import { toast } from 'react-toastify';
import { getFavoriteAndOrders } from '../../utils/function';

const showPasswordIcon = {
  color: Colors.primary,
  position: 'absolute',
  right: '13px',
  top: '12px',
  cursor: 'pointer',
  ':hover': {
    opacity: '0.8',
  },
};

const Entry = () => {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.user);

  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password'
  );

  const initialLoginValues = {
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

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  return (
    <InputsAccountMenuBox>
      <Typography variant="roboto36400" color={Colors.primary}>
        {t('loginToUpper')}
      </Typography>
      <Formik
        initialValues={initialLoginValues}
        validationSchema={validationLoginSchema}
        onSubmit={async (values) => {
          const res = await dispatch(
            login({
              email: values.email,
              password: values.password,
            })
          );

          if (res.meta.requestStatus === 'rejected') {
            toast.error('Invalid data');
          } else {
            getFavoriteAndOrders(dispatch);
          }
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <FormAuthBox>
                <FormAuthInputBox>
                  <AuthErrorMessage name="email" component="span" />
                  <InputAuth name="email" id="email" placeholder="Email" />
                </FormAuthInputBox>
                <FormAuthInputBox>
                  <AuthErrorMessage name="password" component="span" />
                  <InputAuth
                    type={passwordType}
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    sx={{ paddingRight: '45px' }}
                  />
                  {passwordType === 'password' ? (
                    <VisibilityIcon
                      onClick={togglePassword}
                      sx={showPasswordIcon}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={togglePassword}
                      sx={showPasswordIcon}
                    />
                  )}
                </FormAuthInputBox>
              </FormAuthBox>
              <FormAuthButtonPosition>
                {isLoading ? (
                  <CircularProgress
                    sx={{ color: Colors.primary, margin: '25px 0px' }}
                    disableShrink
                    size="25px"
                  />
                ) : (
                  <CustomButton
                    size="SM"
                    variant="secondary"
                    type="submit"
                    style={{ margin: '20px 0px' }}
                  >
                    {t('login')}
                  </CustomButton>
                )}
              </FormAuthButtonPosition>
            </Form>
          );
        }}
      </Formik>
    </InputsAccountMenuBox>
  );
};

export default Entry;

import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from '../../hooks/redux';
import { object, string } from 'yup';
import {
  AuthErrorMessage,
  FormAuthBox,
  FormAuthButtonPosition,
  FormAuthInputBox,
  InputAuth,
  InputsAccountMenuBox,
} from '../../styles/accountMenu';
import { Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Colors } from '../../styles/theme';
import { login } from '../../store/services/UserService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomButton from '../CustomButton';

const Entry = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

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

  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password'
  );

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

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

  return (
    <InputsAccountMenuBox>
      <Typography variant="roboto36400" color={Colors.primary}>
        {t('loginToUpper')}
      </Typography>
      <Formik
        initialValues={initialLoginValues}
        validationSchema={validationLoginSchema}
        onSubmit={async (values) => {
          await dispatch(
            login({
              email: values.email,
              password: values.password,
            })
          );
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
                <CustomButton
                  size="SM"
                  variant="secondary"
                  type="submit"
                  style={{ margin: '20px 0px' }}
                >
                  {t('login')}
                </CustomButton>
              </FormAuthButtonPosition>
            </Form>
          );
        }}
      </Formik>
    </InputsAccountMenuBox>
  );
};

export default Entry;

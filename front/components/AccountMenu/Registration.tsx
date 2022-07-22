import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registration } from '../../store/services/UserService';
import {
  AuthErrorMessage,
  FormAuthBox,
  FormAuthButtonPosition,
  FormAuthInputBox,
  InputAuth,
  InputsAccountMenuBox,
} from '../../styles/accountMenu';
import { Colors } from '../../styles/theme';
import { stringRegExp } from '../../utils/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomButton from '../CustomButton';

const Registration = () => {
  const { isLoading } = useAppSelector((state) => state.user);

  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const initialRegistrationValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

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
                <FormAuthInputBox>
                  <AuthErrorMessage name="name" component="span" />
                  <InputAuth name="name" id="name" placeholder="Name" />
                </FormAuthInputBox>
                <FormAuthInputBox>
                  <AuthErrorMessage name="surname" component="span" />
                  <InputAuth
                    name="surname"
                    id="surname"
                    placeholder="Surname"
                  />
                </FormAuthInputBox>
                <FormAuthInputBox>
                  <AuthErrorMessage name="email" component="span" />
                  <InputAuth name="email" id="email" placeholder="Email" />
                </FormAuthInputBox>
                <FormAuthInputBox>
                  <AuthErrorMessage name="password" component="span" />
                  <InputAuth
                    name="password"
                    id="password"
                    placeholder="Password"
                    type={passwordType}
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
                    sx={{ color: Colors.primary, margin: '25px' }}
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
                    {t('registration')}
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

export default Registration;

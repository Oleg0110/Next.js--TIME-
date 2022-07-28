import React, { useState } from 'react';
import { CircularProgress, Modal, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import {
  CheckPasswordBox,
  CheckPasswordModalBox,
  InputModal,
  ModalErrorMessage,
  ModalInputBox,
} from '../../styles/modal';
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { checkPassword, deleteUser } from '../../store/services/UserService';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomButton from '../CustomButton';

interface ICheckPasswordModal {
  isModalOpened: boolean;
  handleClose: () => void;
  userId: string;
  setIsPasswordConfig: (boolean: boolean) => void;
  setIsNewPasswordModal: (boolean: boolean) => void;
  what: 'delete' | 'email' | 'password' | 'empty';
}

const showPasswordIcon = {
  color: Colors.primary,
  position: 'absolute',
  right: '13px',
  top: '15px',
  cursor: 'pointer',
  ':hover': {
    opacity: '0.8',
  },
};

const CheckPasswordModal: NextPage<ICheckPasswordModal> = ({
  isModalOpened,
  handleClose,
  userId,
  setIsPasswordConfig,
  what,
  setIsNewPasswordModal,
}) => {
  const { t } = useTranslation('office');

  const { isLoading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

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

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CheckPasswordModalBox>
          <Typography
            variant="roboto24200"
            sx={{
              textAlign: 'center',
              color: Colors.primary,
            }}
          >
            {t('entry-password')}
          </Typography>
          <Formik
            initialValues={{ password: '' }}
            validationSchema={object().shape({
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
            })}
            onSubmit={async (values) => {
              const res = await dispatch(
                checkPassword({ password: values.password, userId })
              );

              if (res.meta.requestStatus === 'rejected') {
                toast.error('Wrong password, please try again');
              } else {
                what === 'email' &&
                  toast.success('Successfully') &&
                  setIsPasswordConfig(true);

                what === 'password' &&
                  toast.success('Successfully') &&
                  setIsNewPasswordModal(true);

                if (what === 'delete') {
                  const res = await dispatch(deleteUser(userId));

                  if (res.meta.requestStatus === 'rejected') {
                    toast.error('invalid data');
                  } else {
                    router.push('/');
                    toast.success('Successfully');
                  }
                }
                handleClose();
              }
            }}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <CheckPasswordBox>
                    <ModalInputBox>
                      <ModalErrorMessage name="password" component="span" />
                      <InputModal
                        type={passwordType}
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="off"
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
                    </ModalInputBox>
                    {isLoading ? (
                      <CircularProgress
                        sx={{ color: Colors.primary }}
                        disableShrink
                        size="25px"
                      />
                    ) : (
                      <CustomButton size="SM" type="submit">
                        {t('submit')}
                      </CustomButton>
                    )}
                  </CheckPasswordBox>
                </Form>
              );
            }}
          </Formik>
        </CheckPasswordModalBox>
      </Modal>
    </>
  );
};

export default CheckPasswordModal;

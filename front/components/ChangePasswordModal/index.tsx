import React, { useState } from 'react';
import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import {
  ChangePasswordBox,
  ChangePasswordErrorMessage,
  ChangePasswordModalBox,
  ContinueBox,
  FormChangePasswordBox,
  InputChangePasswordModal,
  ModalErrorMessage,
  ModalInputBox,
} from '../../styles/modal';
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  changeUserData,
  sendConfirmCode,
} from '../../store/services/UserService';
import CustomButton from '../CustomButton';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { is } from 'immer/dist/internal';
import { useTranslation } from 'next-i18next';

interface IChangePasswordModal {
  isModalOpened: boolean;
  handleCloseChangePassword: () => void;
  userId: string;
}

const ChangePasswordModal: NextPage<IChangePasswordModal> = ({
  isModalOpened,
  handleCloseChangePassword,
  userId,
}) => {
  const { isLoading, isCodeLoading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { t } = useTranslation('office');

  const [isPasswordType, setIsPasswordType] = useState<'text' | 'password'>(
    'password'
  );
  const [passwordConfirmation, setPasswordConfirmation] = useState<
    'text' | 'password'
  >('password');

  const [isCode, setIsCode] = useState<string>('');
  const [isPlay, setIsPlay] = useState(false);
  const [isCodesSame, setIsCodesSame] = useState(false);

  const showPasswordIcon = {
    color: Colors.primary,
    position: 'absolute',
    right: '25px',
    top: '15px',
    cursor: 'pointer',
    ':hover': {
      opacity: '0.8',
    },
  };

  const togglePassword = () => {
    if (isPasswordType === 'password') {
      setIsPasswordType('text');
      return;
    }
    setIsPasswordType('password');
  };

  const togglePasswordConfirmation = () => {
    if (passwordConfirmation === 'password') {
      setPasswordConfirmation('text');
      return;
    }
    setPasswordConfirmation('password');
  };

  const clearFunc = () => {
    setIsCode('');
    setIsPlay(false);
  };

  const generateCode = async () => {
    const givenSet = '1234567890';

    let code = '';

    for (let i = 0; i < 4; i++) {
      let pos = Math.floor(Math.random() * givenSet.length);
      code += givenSet[pos];
    }

    setIsCode(code);

    return code;
  };

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleCloseChangePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ChangePasswordModalBox>
          {isCodesSame && (
            <div>
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
                initialValues={{ password: '', passwordConfirmation: '' }}
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
                    ),
                  passwordConfirmation: string().test(
                    'passwords-match',
                    'Passwords must match',
                    function (value) {
                      return this.parent.password === value;
                    }
                  ),
                })}
                onSubmit={async (values) => {
                  const res =
                    values.password !== '' &&
                    (await dispatch(
                      changeUserData({
                        userId,
                        value: values.password,
                        changeWhat: 'password',
                      })
                    ));

                  if (res.meta.requestStatus === 'rejected') {
                    toast.error('Wrong password, please try again');
                  } else {
                    toast.success('Password successfully changed');
                    handleCloseChangePassword();
                  }
                }}
              >
                {({ handleSubmit }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <ChangePasswordBox>
                        <ModalInputBox>
                          <ChangePasswordErrorMessage
                            name="password"
                            component="span"
                          />
                          <InputChangePasswordModal
                            type={isPasswordType}
                            name="password"
                            id="password"
                            placeholder="New Password"
                            autoComplete="off"
                          />
                          {isPasswordType === 'password' ? (
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
                        <ModalInputBox>
                          <ChangePasswordErrorMessage
                            name="passwordConfirmation"
                            component="span"
                          />
                          <InputChangePasswordModal
                            type={passwordConfirmation}
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            placeholder="Confirm Password"
                            autoComplete="off"
                          />
                          {passwordConfirmation === 'password' ? (
                            <VisibilityIcon
                              onClick={togglePasswordConfirmation}
                              sx={showPasswordIcon}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={togglePasswordConfirmation}
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
                      </ChangePasswordBox>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
          {!isCodesSame && (
            <ContinueBox>
              <Typography
                variant="roboto24200"
                sx={{
                  textAlign: 'center',
                  color: Colors.primary,
                }}
              >
                {t('continue')}
              </Typography>
              <FormChangePasswordBox>
                {isPlay ? (
                  <>
                    <Formik
                      initialValues={{ code: '' }}
                      validationSchema={object().shape({
                        code: string().matches(/[0-9]/, 'Only numbers'),
                      })}
                      onSubmit={async (values, { setFieldError }) => {
                        isCode === values.code
                          ? setIsCodesSame(true)
                          : setFieldError('code', 'The code is incorrect');
                        isCode === values.code && setIsPlay(false);
                      }}
                    >
                      {({ submitForm }) => {
                        return (
                          <Form
                            onChange={() => submitForm()}
                            style={{ width: '40%' }}
                          >
                            <ChangePasswordBox>
                              <ModalInputBox>
                                <ChangePasswordErrorMessage
                                  name="code"
                                  component="span"
                                />
                                <InputChangePasswordModal
                                  type="text"
                                  name="code"
                                  id="code"
                                  placeholder="Code"
                                  autoComplete="off"
                                  disabled={isCode === ''}
                                  sx={{ paddingRight: '0px' }}
                                />
                              </ModalInputBox>
                            </ChangePasswordBox>
                          </Form>
                        );
                      }}
                    </Formik>

                    <Box sx={{ marginLeft: '20px' }}>
                      <CountdownCircleTimer
                        isPlaying={isPlay}
                        duration={90}
                        size={40}
                        strokeWidth={2}
                        colors="#685248"
                      >
                        {({ remainingTime }) => (
                          <Typography
                            variant="roboto16200"
                            sx={{ color: Colors.black }}
                          >
                            {remainingTime}
                          </Typography>
                        )}
                      </CountdownCircleTimer>
                    </Box>
                  </>
                ) : isCodeLoading ? (
                  <CircularProgress
                    sx={{ color: Colors.primary, marginTop: '12px' }}
                    disableShrink
                    size="25px"
                  />
                ) : (
                  <Typography
                    variant="roboto20200"
                    sx={{
                      textAlign: 'center',
                      color: Colors.primary,
                      cursor: 'pointer',
                      marginTop: '10px',
                      border: `1px solid ${Colors.primary}`,
                      padding: '0px 10px',
                      ':hover': {
                        color: Colors.darkGray,
                        border: `1px solid ${Colors.darkGray}`,
                      },
                    }}
                    onClick={async () => {
                      const code = await generateCode();
                      const res = await dispatch(
                        sendConfirmCode({ userId, code })
                      );

                      if (res.meta.requestStatus === 'rejected') {
                        toast.error('Error, please try again');
                      } else {
                        toast.success('Code was successfully send');
                        setTimeout(clearFunc, 90000);
                        setIsPlay(true);
                      }
                    }}
                  >
                    {t('click-to-sent-code')}
                  </Typography>
                )}
              </FormChangePasswordBox>
            </ContinueBox>
          )}
        </ChangePasswordModalBox>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;

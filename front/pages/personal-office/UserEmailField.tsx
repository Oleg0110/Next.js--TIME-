import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeUserData } from '../../store/services/UserService';
import {
  ChangeUserErrorMessage,
  ChangeUserInputBox,
  CheckBoxButton,
  InputChangeUser,
  LoadingPosition,
  TypographyUserOffice,
  UserTypographyBox,
} from '../../styles/personalOffice';
import { IChangeProps } from '../../utils/interface/userInterface';
import { toast } from 'react-toastify';
import TooltipIcon from '../../components/TooltipIcon/TooltipIcon';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

interface IUserEmailField {
  isPasswordConfig: boolean;
  isChange: IChangeProps;
  setIsChange: ({}: IChangeProps) => void;
  setIsPasswordConfig: (boolean: boolean) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userId: string;
  email: string;
  setWhat: (string: 'email') => void;
}

const UserEmailField: NextPage<IUserEmailField> = ({
  isChange,
  isPasswordConfig,
  setIsPasswordConfig,
  handleClick,
  email,
  userId,
  setIsChange,
  setWhat,
}) => {
  const { t } = useTranslation('office');

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.user);

  return (
    <UserTypographyBox>
      <TypographyUserOffice>{t('email')}</TypographyUserOffice>
      {!isPasswordConfig ? (
        <Typography
          variant="roboto24200"
          sx={{
            color: Colors.secondaryWhite,
            textAlign: 'start',
            [theme.breakpoints.down('md')]: {
              fontSize: '15px',
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '10px',
            },
          }}
        >
          {email}
        </Typography>
      ) : (
        <Formik
          initialValues={{ email }}
          validationSchema={object().shape({
            email: string().email('Not a proper email').required('Required'),
          })}
          onSubmit={async (values) => {
            const res = await dispatch(
              changeUserData({
                userId,
                value: values.email,
                changeWhat: 'email',
              })
            );

            if (res.meta.requestStatus === 'rejected') {
              toast.error('invalid data');
            } else {
              toast.success('Successfully');
              setIsPasswordConfig(false);
            }
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <ChangeUserInputBox>
                  <ChangeUserErrorMessage name="email" component="span" />
                  <InputChangeUser
                    name="email"
                    id="email"
                    placeholder="Email"
                    style={{ fontSize: '15px' }}
                  />
                  {email !== values.email &&
                    (isLoading ? (
                      <LoadingPosition>
                        <CircularProgress
                          sx={{ color: Colors.secondaryWhite }}
                          disableShrink
                          size="25px"
                        />
                      </LoadingPosition>
                    ) : (
                      <CheckBoxButton type="submit">
                        <TooltipIcon title="change">
                          <CheckOutlinedIcon
                            fontSize="large"
                            sx={{ color: '#1dc146' }}
                          />
                        </TooltipIcon>
                      </CheckBoxButton>
                    ))}
                </ChangeUserInputBox>
              </Form>
            );
          }}
        </Formik>
      )}
      <TooltipIcon
        title={!isChange.email ? 'change' : 'close'}
        style={{
          position: 'absolute',
          top: '6px',
          right: '5px',
          [theme.breakpoints.down('md')]: {
            top: '3px',
          },
          [theme.breakpoints.down('sm')]: {
            right: '-5px',
          },
        }}
        onClick={(e) => {
          isPasswordConfig
            ? setIsPasswordConfig(false)
            : setIsChange({ email: true });
          !isPasswordConfig && setWhat('email');
          isPasswordConfig && setIsChange({ email: false });
          handleClick(e);
        }}
      >
        <CreateOutlinedIcon
          sx={{
            color: Colors.secondaryWhite,
            [theme.breakpoints.down('md')]: {
              width: '15px',
              height: '15px',
            },
          }}
        />
      </TooltipIcon>
    </UserTypographyBox>
  );
};

export default UserEmailField;

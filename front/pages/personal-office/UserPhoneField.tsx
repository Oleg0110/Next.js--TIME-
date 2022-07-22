import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addPhoneNumber,
  changeUserData,
} from '../../store/services/UserService';
import {
  ChangeUserErrorMessage,
  ChangeUserInputBox,
  CheckBoxButton,
  InputChangeUser,
  LoadingPosition,
  TypographyUserDataOffice,
  TypographyUserOffice,
  UserTypographyBox,
} from '../../styles/personalOffice';
import theme, { Colors } from '../../styles/theme';
import { phoneRegExp, stringRegExp } from '../../utils/constants';
import { IChangeProps } from '../../utils/interface/userInterface';
import TooltipIcon from '../../components/TooltipIcon/TooltipIcon';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { toast } from 'react-toastify';

interface IUserPhoneField {
  isChange: IChangeProps;
  setIsChange: ({}: IChangeProps) => void;
  userId: string;
  phone: string;
}

const UserPhoneField: NextPage<IUserPhoneField> = ({
  isChange,
  phone,
  userId,
  setIsChange,
}) => {
  const { t } = useTranslation('office');
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  return (
    <UserTypographyBox>
      <TypographyUserOffice>{t('phone')}</TypographyUserOffice>
      {!isChange.phone ? (
        phone ? (
          <TypographyUserDataOffice>{phone}</TypographyUserDataOffice>
        ) : (
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
            onClick={() => setIsChange({ phone: !isChange.phone })}
          >
            {t('click-to-add-number')}
          </Typography>
        )
      ) : (
        <Formik
          initialValues={{ phone: phone || '' }}
          validationSchema={object().shape({
            phone: string()
              .matches(phoneRegExp, 'Phone number is not valid')
              .required('Required'),
          })}
          onSubmit={async (values) => {
            if (phone) {
              const res = await dispatch(
                changeUserData({
                  changeWhat: 'phone',
                  userId,
                  value: values.phone,
                })
              );

              if (res.meta.requestStatus === 'rejected') {
                toast.error('invalid data');
              } else {
                toast.success('Successfully');
                setIsChange({ phone: false });
              }
            } else {
              const res = await dispatch(
                addPhoneNumber({
                  phone: values.phone,
                  userId,
                })
              );

              if (res.meta.requestStatus === 'rejected') {
                toast.error('invalid data');
              } else {
                toast.success('Successfully');
                setIsChange({ phone: false });
              }
            }
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <ChangeUserInputBox>
                  <ChangeUserErrorMessage name="phone" component="span" />
                  <InputChangeUser
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                  {values.phone !== '' &&
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
      {phone && (
        <TooltipIcon
          title="change"
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
          onClick={() => setIsChange({ phone: !isChange.phone })}
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
      )}
    </UserTypographyBox>
  );
};

export default UserPhoneField;

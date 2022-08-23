import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { CircularProgress } from '@mui/material';
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
  TypographyUserDataOffice,
  TypographyUserOffice,
  UserTypographyBox,
} from '../../styles/personalOffice';
import { stringRegExp } from '../../utils/constants';
import { IChangeProps } from '../../utils/interface/userInterface';
import { toast } from 'react-toastify';
import TooltipIcon from '../../components/TooltipIcon/TooltipIcon';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

interface IUserField {
  isChange: IChangeProps;
  setIsChange: ({}: IChangeProps) => void;
  userId: string;
  name: string;
}

const UserField: NextPage<IUserField> = ({
  isChange,
  name,
  userId,
  setIsChange,
}) => {
  const { t } = useTranslation('office');

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.user);

  return (
    <UserTypographyBox>
      <TypographyUserOffice>{t('name')}</TypographyUserOffice>
      {!isChange.name ? (
        <TypographyUserDataOffice>{name}</TypographyUserDataOffice>
      ) : (
        <Formik
          initialValues={{ name }}
          validationSchema={object().shape({
            name: string()
              .max(15, 'Too Long')
              .matches(stringRegExp, 'Name is not valid')
              .required('Required'),
          })}
          onSubmit={async (values) => {
            const res = await dispatch(
              changeUserData({
                userId,
                value: values.name,
                changeWhat: 'name',
              })
            );

            if (res.meta.requestStatus === 'rejected') {
              toast.error('Error, please try again');
            } else {
              toast.success('Successfully');
              setIsChange({ name: false });
            }
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <ChangeUserInputBox>
                  <ChangeUserErrorMessage name="name" component="span" />
                  <InputChangeUser name="name" id="name" placeholder="Name" />
                  {name !== values.name &&
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
        title={!isChange.name ? 'change' : 'close'}
        style={{
          position: 'absolute',
          top: '9px',
          right: '5px',
          [theme.breakpoints.down('md')]: {
            top: '3px',
          },
          [theme.breakpoints.down('sm')]: {
            right: '-5px',
          },
        }}
        onClick={() => setIsChange({ name: !isChange.name })}
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

export default UserField;

import { Typography } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import CustomButton from '../../components/CustomButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createOrder } from '../../store/services/UserService';
import {
  DeliveryFormMainBox,
  FormOrderBox,
  InputOrder,
  InputOrderBox,
  InputOrderErrorMessage,
} from '../../styles/deliveryDetails';
import {
  addressRegExp,
  phoneRegExp,
  placeRegExp,
  stringRegExp,
} from '../../utils/constants';
import { cleanBag } from '../../utils/function';
import { IUserInitialOrder } from '../../utils/interface/userInterface';

const arrDataForm = [
  { id: '1', name: 'userName', placeholder: 'name' },
  { id: '2', name: 'userSurname', placeholder: 'surname' },
  { id: '3', name: 'userRegion', placeholder: 'region' },
  { id: '4', name: 'userAddress', placeholder: 'address' },
  { id: '5', name: 'userPhone', placeholder: 'phone' },
  { id: '6', name: 'userCity', placeholder: 'city' },
  { id: '7', name: 'userEmail', placeholder: 'email' },
];

interface IDeliveryForm {
  totalPrice: number;
}

const DeliveryForm: NextPage<IDeliveryForm> = ({ totalPrice }) => {
  const { productInBag } = useAppSelector((state) => state.product);

  const { t } = useTranslation('delivery');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValues: IUserInitialOrder = {
    userName: '',
    userSurname: '',
    userRegion: '',
    userAddress: '',
    userPhone: '',
    userCity: '',
    userEmail: '',
  };

  const validationSchema = object().shape({
    userName: string()
      .max(15, 'Too Long')
      .matches(stringRegExp, 'Name is not valid')
      .required('Required'),
    userSurname: string()
      .max(15, 'Too Long')
      .matches(stringRegExp, 'Surname is not valid')
      .required('Required'),
    userRegion: string()
      .max(40, 'Too Long')
      .matches(placeRegExp, 'Region is not valid')
      .required('Required'),
    userAddress: string()
      .max(70, 'Too Long')
      .matches(addressRegExp, 'Address is not valid')
      .required('Required'),
    userPhone: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    userCity: string()
      .max(30, 'Too Long')
      .matches(placeRegExp, 'City is not valid')
      .required('Required'),
    userEmail: string().email('Not a proper email').required('Required'),
  });

  return (
    <DeliveryFormMainBox>
      <Typography variant="roboto36400">{t('ordering')}</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const data = await dispatch(
            createOrder({
              userOrderData: values,
              orderProducts: productInBag,
              totalPrice,
            })
          );
          if (data.meta.requestStatus !== 'rejected') {
            toast.success('Successful Order');
            cleanBag(dispatch);
            router.push('/');
          }
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <FormOrderBox>
                {arrDataForm.map((data) => (
                  <InputOrderBox key={data.id}>
                    <InputOrderErrorMessage name={data.name} component="span" />
                    <InputOrder
                      name={data.name}
                      id={data.name}
                      placeholder={t(data.placeholder)}
                    />
                  </InputOrderBox>
                ))}
              </FormOrderBox>
              <CustomButton size="MD" type="submit" style={{ width: '55%' }}>
                {t('order')}
              </CustomButton>
            </Form>
          );
        }}
      </Formik>
    </DeliveryFormMainBox>
  );
};

export default DeliveryForm;

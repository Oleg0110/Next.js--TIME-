import React from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import {
  UserSearchBox,
  FoundProductBox,
  OrderBox,
  OrderMainBox,
  ConfirmedOrdersBox,
  OrdersProductsBox,
  OrdersScrollBox,
  UnConfirmedOrdersBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import UserSearch from '../../components/UserSearch';
import { getConfirmedOrders } from '../../store/services/ProductService';
import ProductOrderAccordion from '../../components/ProductOrderAccordion';
import AdminSearchForm from '../../components/AdminSearchForm';

const Order: NextPage = () => {
  const { t } = useTranslation('admin');

  const dispatch = useAppDispatch();
  const { ordersUnconfirmed, ordersConfirmed } = useAppSelector(
    (state) => state.product
  );

  const validationNumberSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(11, 'Too Long!')
      .required('Required')
      .matches(/^[0-9\b]+$/, 'Only Numbers'),
  });

  return (
    <OrderBox>
      <OrderMainBox>
        {ordersUnconfirmed[0] !== undefined && (
          <UnConfirmedOrdersBox>
            <Typography
              variant="roboto24500"
              sx={{
                textAlign: 'start',
                margin: '10px',
                width: '100%',
                color: Colors.primary,
              }}
            >
              {t('unconfirmed')}
              <Typography
                variant="roboto24500"
                sx={{
                  color: Colors.darkGray,
                  marginLeft: '5px',
                }}
              >
                {ordersUnconfirmed.length}
              </Typography>
            </Typography>
            <OrdersProductsBox>
              <OrdersScrollBox>
                {ordersUnconfirmed.map((data) => (
                  <div key={data.id}>
                    <ProductOrderAccordion orderData={data} />
                  </div>
                ))}
              </OrdersScrollBox>
            </OrdersProductsBox>
          </UnConfirmedOrdersBox>
        )}
        <ConfirmedOrdersBox>
          <Typography
            variant="roboto24500"
            sx={{
              textAlign: 'start',
              margin: '10px',
              width: '100%',
              color: Colors.primary,
            }}
          >
            {t('confirmed')}
          </Typography>
          {/* <OrderFormBox>
            <Formik
              initialValues={{ searchValue: '' }}
              validationSchema={validationNumberSchema}
              onSubmit={async (values) => {
                await dispatch(getConfirmedOrders(values.searchValue));
              }}
            >
              {({ submitForm }) => {
                return (
                  <Form onChange={() => submitForm()}>
                    <SearchConfirmedOrderBox>
                      <Typography
                        variant="roboto20400"
                        sx={{
                          width: '40%',
                          color: Colors.primary,
                          marginRight: '10px',
                        }}
                      >
                        {t('order-number')}
                      </Typography>
                      <SearchError name="searchValue" component="span" />
                      <SearchInput
                        name="searchValue"
                        id="searchValue"
                        placeholder={t('number')}
                      />
                    </SearchConfirmedOrderBox>
                  </Form>
                );
              }}
            </Formik>
          </OrderFormBox> */}
          <AdminSearchForm
            placeholder={t('placeholderNumber')}
            serviceFunc={getConfirmedOrders}
            validationSchema={validationNumberSchema}
            formName={t('order-number')}
          />
          <OrdersProductsBox>
            <OrdersScrollBox>
              {ordersConfirmed &&
                ordersConfirmed.map((data) => (
                  <div key={data.id}>
                    <ProductOrderAccordion orderData={data} />
                  </div>
                ))}
            </OrdersScrollBox>
          </OrdersProductsBox>
        </ConfirmedOrdersBox>
      </OrderMainBox>
    </OrderBox>
  );
};

export default Order;

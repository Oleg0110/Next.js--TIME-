import React from 'react';
import { object, string } from 'yup';
import {
  OrderBox,
  OrderMainBox,
  ConfirmedOrdersBox,
  OrdersProductsBox,
  OrdersScrollBox,
  UnConfirmedOrdersBox,
  AdminLoadingBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { getConfirmedOrders } from '../../store/services/ProductService';
import ProductOrderAccordion from '../../components/ProductOrderAccordion';
import AdminSearchForm from '../../components/AdminSearchForm';

const Order: NextPage = () => {
  const { t } = useTranslation('admin');

  const { ordersUnconfirmed, ordersConfirmed, isLoading } = useAppSelector(
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
          <AdminSearchForm
            placeholder={t('placeholderNumber')}
            serviceFunc={getConfirmedOrders}
            validationSchema={validationNumberSchema}
            formName="order-number"
          />
          <OrdersProductsBox>
            {isLoading ? (
              <AdminLoadingBox>
                <CircularProgress
                  sx={{
                    color: Colors.primary,
                    margin: '20px 0px',
                  }}
                  disableShrink
                  size="35px"
                />
              </AdminLoadingBox>
            ) : (
              <OrdersScrollBox>
                {ordersConfirmed &&
                  ordersConfirmed.map((data) => (
                    <div key={data.id}>
                      <ProductOrderAccordion orderData={data} />
                    </div>
                  ))}
              </OrdersScrollBox>
            )}
          </OrdersProductsBox>
        </ConfirmedOrdersBox>
      </OrderMainBox>
    </OrderBox>
  );
};

export default Order;

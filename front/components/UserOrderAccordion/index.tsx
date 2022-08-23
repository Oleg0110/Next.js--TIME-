import React, { useState } from 'react';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { IProductOrder } from '../../utils/interface/productInterface';
import {
  DetailsUserOrderAccordion,
  SummaryUserOrderAccordion,
  UserOrderAccordionBox,
  UserOrderInfoBox,
  UserOrderInformationBox,
  UserOrderPriceBox,
  UserAccordionScroll,
} from '../../styles/userOrderAccordion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductInAccordionOrder from '../ProductInAccordionOrder';

interface IUserOrderAccordion {
  orderData: IProductOrder;
}

const UserOrderAccordion: NextPage<IUserOrderAccordion> = ({ orderData }) => {
  const { t } = useTranslation('office');

  const [expanded, setExpanded] = useState(true);

  const {
    orderNumber,
    orderProducts,
    userName,
    orderStatus,
    totalPrice,
    userAddress,
    userCity,
    userEmail,
    userPhone,
    userRegion,
    userSurname,
    id,
  } = orderData;

  return (
    <UserOrderAccordionBox>
      <SummaryUserOrderAccordion
        expandIcon={
          expanded ? (
            <AddIcon fontSize="large" sx={{ color: Colors.secondaryWhite }} />
          ) : (
            <RemoveIcon
              fontSize="large"
              sx={{ color: Colors.secondaryWhite }}
            />
          )
        }
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <Typography variant="roboto20200">
          {t('order-number')}
          <Typography variant="roboto20400" sx={{ marginLeft: '10px' }}>
            {orderNumber}
          </Typography>
        </Typography>
      </SummaryUserOrderAccordion>
      <DetailsUserOrderAccordion>
        <Typography variant="roboto20400" sx={{ padding: '0px 0px 10px 10px' }}>
          {t('your-information')}
        </Typography>
        <UserOrderInfoBox>
          <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
            {t('name')}:
            <Typography variant="roboto20400" sx={{ paddingLeft: '10px' }}>
              {userName}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
            {t('surname')}:
            <Typography variant="roboto20400" sx={{ paddingLeft: '10px' }}>
              {userSurname}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
            {t('email')}:
            <Typography variant="roboto20400" sx={{ paddingLeft: '10px' }}>
              {userEmail}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
            {t('phone')}:
            <a href={`tel:${userPhone}`}>
              <Typography variant="roboto20400" sx={{ paddingLeft: '10px' }}>
                {userPhone}
              </Typography>
            </a>
          </Typography>
          <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
            {t('address')}:
            <Typography variant="roboto20400" sx={{ paddingLeft: '10px' }}>
              {userRegion},
              <Typography variant="roboto20400" sx={{ padding: '0px 10px' }}>
                {userCity},
              </Typography>
              {userAddress}
            </Typography>
          </Typography>
        </UserOrderInfoBox>
        <Typography variant="roboto20400" sx={{ padding: '0px 0px 10px 10px' }}>
          {t('order-info')}
        </Typography>
        <UserAccordionScroll>
          {orderProducts.map((data) => (
            <div key={data.productId}>
              <ProductInAccordionOrder
                price={data.price}
                productAmount={data.productAmount}
                productName={data.productName}
                productPhoto={data.productPhoto}
                salePrice={data.salePrice}
                sizeProduct={data.sizeProduct}
                who="user"
              />
            </div>
          ))}
        </UserAccordionScroll>
        <UserOrderInformationBox>
          <UserOrderPriceBox>
            <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
              {t('total-price')}
              <Typography variant="roboto20400" sx={{ paddingLeft: '10px' }}>
                {totalPrice} UAH
              </Typography>
            </Typography>
            <Typography variant="roboto20200" sx={{ marginLeft: '10px' }}>
              {t('order-status')}
              {orderStatus ? (
                <Typography
                  variant="roboto20400"
                  sx={{ color: '#36b922', paddingLeft: '10px' }}
                >
                  true
                </Typography>
              ) : (
                <Typography
                  variant="roboto20400"
                  sx={{ color: Colors.saleColor, paddingLeft: '10px' }}
                >
                  false
                </Typography>
              )}
            </Typography>
          </UserOrderPriceBox>
        </UserOrderInformationBox>
      </DetailsUserOrderAccordion>
    </UserOrderAccordionBox>
  );
};

export default UserOrderAccordion;

import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
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

  const userCategoryStyle = {
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
    },
  };

  const userInfoStyle = {
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
    },
  };

  return (
    <UserOrderAccordionBox>
      <SummaryUserOrderAccordion
        expandIcon={
          expanded ? (
            <AddIcon
              fontSize="large"
              sx={{
                color: Colors.secondaryWhite,
                [theme.breakpoints.down('sm')]: {
                  width: '16px',
                  height: '16px',
                },
              }}
            />
          ) : (
            <RemoveIcon
              fontSize="large"
              sx={{
                color: Colors.secondaryWhite,
                [theme.breakpoints.down('sm')]: {
                  width: '16px',
                  height: '16px',
                },
              }}
            />
          )
        }
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <Typography
          variant="roboto20200"
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: '10px',
            },
          }}
        >
          {t('order-number')}
          <Typography variant="roboto20400" sx={userCategoryStyle}>
            {orderNumber}
          </Typography>
        </Typography>
      </SummaryUserOrderAccordion>
      <DetailsUserOrderAccordion>
        <Typography
          variant="roboto20400"
          sx={{
            padding: '0px 0px 10px 10px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '13px',
            },
          }}
        >
          {t('your-information')}
        </Typography>
        <UserOrderInfoBox>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('name')}:
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userName}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('surname')}:
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userSurname}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('email')}:
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userEmail}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('phone')}:
            <a href={`tel:${userPhone}`}>
              <Typography variant="roboto20400" sx={userInfoStyle}>
                {userPhone}
              </Typography>
            </a>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('address')}:
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userRegion},
              <Typography
                variant="roboto20400"
                sx={{
                  padding: '0px 10px',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '10px',
                  },
                }}
              >
                {userCity},
              </Typography>
              {userAddress}
            </Typography>
          </Typography>
        </UserOrderInfoBox>
        <Typography
          variant="roboto20400"
          sx={{
            padding: '0px 0px 10px 10px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '13px',
            },
          }}
        >
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
            <Typography variant="roboto20200" sx={userCategoryStyle}>
              {t('total-price')}:
              <Typography variant="roboto20400" sx={userInfoStyle}>
                {totalPrice} UAH
              </Typography>
            </Typography>
            <Typography variant="roboto20200" sx={userCategoryStyle}>
              {t('order-status')}:
              {orderStatus ? (
                <Typography
                  variant="roboto20400"
                  sx={{
                    color: '#36b922',
                    paddingLeft: '10px',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '13px',
                    },
                  }}
                >
                  true
                </Typography>
              ) : (
                <Typography
                  variant="roboto20400"
                  sx={{
                    color: Colors.saleColor,
                    paddingLeft: '10px',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '13px',
                    },
                  }}
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

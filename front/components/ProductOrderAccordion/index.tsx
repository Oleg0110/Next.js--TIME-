import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { CircularProgress, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IProductOrder } from '../../utils/interface/productInterface';
import {
  ConfirmButtonPosition,
  CustomerInfoBox,
  DetailsOrderAccordion,
  OrderInformationBox,
  ProductOrderAccordionBox,
  ProductsOrderAccordion,
  ProductTotalPriceBox,
  SummaryOrderAccordion,
} from '../../styles/productOrderAccordion';
import { changeOrderStatus } from '../../store/services/ProductService';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductInAccordionOrder from '../ProductInAccordionOrder';
import CustomButton from '../CustomButton';

interface IProductOrderAccordion {
  orderData: IProductOrder;
}

const ProductOrderAccordion: NextPage<IProductOrderAccordion> = ({
  orderData,
}) => {
  const { t } = useTranslation('admin');

  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(true);

  const { isOrderStatusLoading } = useAppSelector((state) => state.product);

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
    color: Colors.black,
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  };

  const userInfoStyle = {
    color: Colors.black,
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  };

  return (
    <ProductOrderAccordionBox>
      <SummaryOrderAccordion
        expandIcon={
          expanded ? (
            <AddIcon
              fontSize="large"
              sx={{
                color: Colors.darkGray,
                [theme.breakpoints.down('sm')]: {
                  width: '20px',
                  height: '20px',
                },
              }}
            />
          ) : (
            <RemoveIcon
              fontSize="large"
              sx={{
                color: Colors.darkGray,
                [theme.breakpoints.down('sm')]: {
                  width: '20px',
                  height: '20px',
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
            color: Colors.black,
            [theme.breakpoints.down('sm')]: {
              fontSize: '14px',
            },
          }}
        >
          {t('order-number')}
          <Typography variant="roboto20400" sx={userCategoryStyle}>
            {orderNumber}
          </Typography>
        </Typography>
      </SummaryOrderAccordion>
      <DetailsOrderAccordion>
        <Typography
          variant="roboto20400"
          sx={{
            color: Colors.black,
            padding: '0px 0px 10px 10px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '15px',
            },
          }}
        >
          {t('customer-info')}
        </Typography>
        <CustomerInfoBox>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('customer-name')}
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userName}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('customer-surname')}
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userSurname}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('customer-email')}
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userEmail}
            </Typography>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('customer-phone')}
            <a href={`tel:${userPhone}`}>
              <Typography variant="roboto20400" sx={userInfoStyle}>
                {userPhone}
              </Typography>
            </a>
          </Typography>
          <Typography variant="roboto20200" sx={userCategoryStyle}>
            {t('customer-address')}
            <Typography variant="roboto20400" sx={userInfoStyle}>
              {userRegion},
              <Typography
                variant="roboto20400"
                sx={{
                  color: Colors.black,
                  padding: '0px 10px',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '12px',
                  },
                }}
              >
                {userCity},
              </Typography>
              {userAddress}
            </Typography>
          </Typography>
        </CustomerInfoBox>
        <Typography
          variant="roboto20400"
          sx={{
            color: Colors.black,
            padding: '0px 0px 10px 10px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '15px',
            },
          }}
        >
          {t('order-info')}
        </Typography>
        <ProductsOrderAccordion>
          {orderProducts.map((data) => (
            <div key={data.productId}>
              <ProductInAccordionOrder
                price={data.price}
                productAmount={data.productAmount}
                productName={data.productName}
                productPhoto={data.productPhoto}
                salePrice={data.salePrice}
                sizeProduct={data.sizeProduct}
                who="admin"
              />
            </div>
          ))}
        </ProductsOrderAccordion>
        <OrderInformationBox>
          <ProductTotalPriceBox>
            <Typography
              variant="roboto20200"
              sx={{
                color: Colors.black,
                marginLeft: '10px',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '12px',
                },
              }}
            >
              {t('total-price')}
              <Typography
                variant="roboto20400"
                sx={{
                  color: Colors.black,
                  paddingLeft: '10px',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '12px',
                  },
                }}
              >
                {totalPrice} UAH
              </Typography>
            </Typography>
            <Typography
              variant="roboto20200"
              sx={{
                color: Colors.black,
                marginLeft: '10px',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '12px',
                },
              }}
            >
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
          </ProductTotalPriceBox>
          <ConfirmButtonPosition>
            {!orderStatus &&
              (isOrderStatusLoading ? (
                <CircularProgress
                  sx={{ color: Colors.primary, margin: '25px 0px' }}
                  disableShrink
                  size="25px"
                />
              ) : (
                <CustomButton
                  size="SM"
                  onClick={async () => {
                    const res = await dispatch(
                      changeOrderStatus({ orderId: id, orderStatus: true })
                    );

                    if (res.meta.requestStatus === 'fulfilled') {
                      toast.success('Order is successful confirm');
                    } else {
                      toast.error('Problem with confirm, please try again');
                    }
                  }}
                >
                  {t('confirm')}
                </CustomButton>
              ))}
          </ConfirmButtonPosition>
        </OrderInformationBox>
      </DetailsOrderAccordion>
    </ProductOrderAccordionBox>
  );
};

export default ProductOrderAccordion;

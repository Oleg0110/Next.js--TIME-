import { CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  InputProductAmount,
  ProductAmountBox,
  ProductOnBagContainer,
  ProductOnBagCount,
  ProductOnBagInfo,
  ProductOnBagPhotoBox,
  ProductOnBagPrice,
  ProductOnBagRemove,
} from '../../styles/productOnBagPage';
import theme, { Colors } from '../../styles/theme';
import { removeFromBag } from '../../utils/function';
import { BASIC_URL } from '../../utils/httpLinks';
import {
  IProductInBag,
  IProductOrder,
} from '../../utils/interface/productInterface';
import styles from '../../styles/icons.module.scss';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { number, object } from 'yup';
import { shoppingBagDataName } from '../../utils/constants';
import { setProductInShoppingBag } from '../../store/reducers/ProductSlice';
import {
  CustomerInfoBox,
  DetailsOrderAccordion,
  OrderInformationBox,
  ProductOrderAccordionBox,
  ProductsOrderAccordion,
  ProductTotalPriceBox,
  SummaryOrderAccordion,
} from '../../styles/productOrderAccordion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductInAccordionOrder from '../ProductInAccordionOrder';
import CustomButton from '../CustomButton';
import { changeOrderStatus } from '../../store/services/ProductService';
import { toast } from 'react-toastify';

interface IProductOrderAccordion {
  orderData: IProductOrder;
}

const ProductOrderAccordion: NextPage<IProductOrderAccordion> = ({
  orderData,
}) => {
  const [expanded, setExpanded] = useState(true);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.product);
  const { t } = useTranslation('admin');

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
    <ProductOrderAccordionBox>
      <SummaryOrderAccordion
        expandIcon={
          expanded ? (
            <AddIcon fontSize="large" sx={{ color: Colors.darkGray }} />
          ) : (
            <RemoveIcon fontSize="large" sx={{ color: Colors.darkGray }} />
          )
        }
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <Typography variant="roboto20200" sx={{ color: Colors.black }}>
          {t('order-number')}
          <Typography
            variant="roboto20400"
            sx={{ color: Colors.black, marginLeft: '10px' }}
          >
            {orderNumber}
          </Typography>
        </Typography>
      </SummaryOrderAccordion>
      <DetailsOrderAccordion>
        <Typography
          variant="roboto20400"
          sx={{ color: Colors.black, padding: '0px 0px 10px 10px' }}
        >
          {t('customer-info')}
        </Typography>
        <CustomerInfoBox>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, marginLeft: '10px' }}
          >
            {t('customer-name')}
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, paddingLeft: '10px' }}
            >
              {userName}
            </Typography>
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, marginLeft: '10px' }}
          >
            {t('customer-surname')}
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, paddingLeft: '10px' }}
            >
              {userSurname}
            </Typography>
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, marginLeft: '10px' }}
          >
            {t('customer-email')}
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, paddingLeft: '10px' }}
            >
              {userEmail}
            </Typography>
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, marginLeft: '10px' }}
          >
            {t('customer-phone')}
            <a href={`tel:${userPhone}`}>
              <Typography
                variant="roboto20400"
                sx={{ color: Colors.black, paddingLeft: '10px' }}
              >
                {userPhone}
              </Typography>
            </a>
          </Typography>
          <Typography
            variant="roboto20200"
            sx={{ color: Colors.black, marginLeft: '10px' }}
          >
            {t('customer-address')}
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, paddingLeft: '10px' }}
            >
              {userRegion},
              <Typography
                variant="roboto20400"
                sx={{ color: Colors.black, padding: '0px 10px' }}
              >
                {userCity},
              </Typography>
              {userAddress}
            </Typography>
          </Typography>
        </CustomerInfoBox>
        <Typography
          variant="roboto20400"
          sx={{ color: Colors.black, padding: '0px 0px 10px 10px' }}
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
              sx={{ color: Colors.black, marginLeft: '10px' }}
            >
              {t('total-price')}
              <Typography
                variant="roboto20400"
                sx={{ color: Colors.black, paddingLeft: '10px' }}
              >
                {totalPrice} UAH
              </Typography>
            </Typography>
            <Typography
              variant="roboto20200"
              sx={{ color: Colors.black, marginLeft: '10px' }}
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
          {!orderStatus && (
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
              {isLoading ? (
                <CircularProgress disableShrink size="2rem" />
              ) : (
                `${t('confirm')}`
              )}
            </CustomButton>
          )}
        </OrderInformationBox>
      </DetailsOrderAccordion>
    </ProductOrderAccordionBox>
  );
};

export default ProductOrderAccordion;

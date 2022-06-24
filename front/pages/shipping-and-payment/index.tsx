// import useTranslation from 'next-translate/useTranslation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Desert from '../../assets/img/shipping/desert.gif';
import {
  ContentBox,
  MainPhotoBox,
  MainContentBox,
  TextBox,
} from '../../styles/shipping-and-payment';
import { ListItem, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';

const ShippingAndPayment = () => {
  const { t } = useTranslation('shipping');

  return (
    <MainLayout>
      <MainPhotoBox>
        <Typography
          variant="h1"
          color={Colors.secondaryWhite}
          zIndex="1"
          textAlign="center"
        >
          {t('title')}
        </Typography>
        <Image src={Desert} layout="fill" />
      </MainPhotoBox>
      <MainContentBox>
        <ContentBox>
          <Typography
            variant="h1"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('payment')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('payment-first-p')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('payment-second-p')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('payment-third-p')}
          </Typography>
          <TextBox>
            <Typography
              variant="roboto36400"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              {t('payment-online')}
            </Typography>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="50px"
            >
              {t('payment-online-p')}
            </Typography>
            <Typography
              variant="roboto36400"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              {t('payment-goods')}
            </Typography>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="30px"
            >
              {t('payment-goods-p')}
            </Typography>
          </TextBox>
          <Typography
            variant="h1"
            color={Colors.secondaryWhite}
            marginBottom="40px"
          >
            {t('delivery')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('delivery-can')}
          </Typography>
          <TextBox>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              <ListItem sx={{ display: 'list-item' }}>
                {t('delivery-first-items')}
              </ListItem>
            </Typography>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              <ListItem sx={{ display: 'list-item' }}>
                {t('delivery-second-items')}
              </ListItem>
            </Typography>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              <ListItem sx={{ display: 'list-item' }}>
                {t('delivery-third-items')}
              </ListItem>
            </Typography>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              <ListItem sx={{ display: 'list-item' }}>
                {t('delivery-fourth-items')}
              </ListItem>
            </Typography>
            <Typography
              variant="roboto30300"
              color={Colors.secondaryWhite}
              marginBottom="20px"
            >
              <ListItem sx={{ display: 'list-item' }}>
                {t('delivery-fifth-items')}
              </ListItem>
            </Typography>
          </TextBox>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('delivery-type')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('delivery-sending')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('delivery-service')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            {t('delivery-maximum')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="40px"
          >
            {t('delivery-goods')}
          </Typography>
          <Typography
            variant="roboto36400"
            marginBottom="20px"
            sx={{
              color: Colors.secondaryWhite,
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {t('our-manager')}
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            +310 55-555-55
          </Typography>
          <Typography
            variant="roboto30300"
            color={Colors.secondaryWhite}
            marginBottom="20px"
          >
            +380 55-555-55
          </Typography>
        </ContentBox>
      </MainContentBox>
    </MainLayout>
  );
};

export default ShippingAndPayment;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['shipping', 'common'])),
  },
});

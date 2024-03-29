import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { Typography, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from '../../hooks/redux';
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
import { removeFromBag } from '../../utils/function';
import { BASIC_URL } from '../../utils/httpLinks';
import { IProductInBag } from '../../utils/interface/productInterface';
import { ErrorMessage, Form, Formik } from 'formik';
import { number, object } from 'yup';
import { shoppingBagDataName } from '../../utils/constants';
import { setProductInShoppingBag } from '../../store/reducers/ProductSlice';
import { useRouter } from 'next/router';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';

const ProductOnBagPage: NextPage<IProductInBag> = ({
  price,
  productId,
  productName,
  productPhoto,
  salePrice,
  sizeProduct,
  productAmount,
  productFor,
}) => {
  const { t } = useTranslation('delivery');

  const MediaSM = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useAppDispatch();
  const router = useRouter();

  const addProductAmount = (productAmountValue) => {
    const ISSERVER = typeof window === 'undefined';

    if (!ISSERVER) {
      const arr: IProductInBag[] =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

      arr.forEach(
        (data) =>
          data.productId === productId &&
          (data.productAmount = productAmountValue)
      );

      localStorage.setItem(shoppingBagDataName, JSON.stringify(arr));

      const newArr =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

      dispatch(setProductInShoppingBag(newArr));
    }
  };

  return (
    <ProductOnBagContainer>
      <ProductOnBagPhotoBox>
        <img
          src={`${BASIC_URL}/${productPhoto}`}
          width={MediaSM ? '60px' : '100px'}
          height={MediaSM ? '60px' : '100px'}
          onClick={() =>
            router.push(`/product/${productFor}/${productName}/${productId}`)
          }
          style={{ cursor: 'pointer' }}
        />
        <ProductOnBagInfo>
          <Typography
            variant="roboto16400"
            marginBottom="8px"
            color={Colors.black}
            sx={{
              maxWidth: '260px',
              textAlign: 'start',
              color: Colors.secondaryWhite,
              cursor: 'pointer',
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
              ':hover': {
                color: Colors.lightGray,
              },
            }}
            onClick={() =>
              router.push(`/product/${productFor}/${productName}/${productId}`)
            }
          >
            {productName}
          </Typography>
          <Typography
            variant="roboto16200"
            color={Colors.secondaryWhite}
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {t('size')}: {sizeProduct}
          </Typography>
        </ProductOnBagInfo>
      </ProductOnBagPhotoBox>
      <ProductOnBagCount>
        <Formik
          initialValues={{ productAmount: productAmount }}
          validationSchema={object().shape({
            productAmount: number()
              .min(1, 'More than 0')
              .max(5, 'Max is 5')
              .required('Required'),
          })}
          onSubmit={async (values) => {
            addProductAmount(values.productAmount);
          }}
        >
          {({ submitForm, values }) => {
            return (
              <Form onChange={() => submitForm()}>
                <ErrorMessage name="productAmount" component="span" />
                <ProductAmountBox>
                  <Typography
                    variant="roboto16200"
                    sx={{
                      color: Colors.secondaryWhite,
                      marginRight: '10px',
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '12px',
                      },
                    }}
                  >
                    {t('amount')}:
                  </Typography>
                  <InputProductAmount
                    type="number"
                    name="productAmount"
                    id="productAmount"
                    value={values.productAmount}
                  />
                </ProductAmountBox>
              </Form>
            );
          }}
        </Formik>
      </ProductOnBagCount>
      {salePrice === 0 ? (
        <ProductOnBagPrice>
          <Typography
            variant="roboto16200"
            sx={{
              color: Colors.secondaryWhite,
              width: '240px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {price} UAH
          </Typography>
        </ProductOnBagPrice>
      ) : (
        <ProductOnBagPrice>
          <Typography
            variant="roboto16200"
            color={Colors.secondaryWhite}
            sx={{
              textDecoration: 'line-through',
              textDecorationThickness: '1px',
              marginRight: '10px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
                marginRight: '0px',
              },
            }}
          >
            {price} UAH
          </Typography>
          <Typography
            variant="roboto20400"
            sx={{
              color: Colors.saleColor,
              [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
              },
            }}
          >
            {salePrice} UAH
          </Typography>
        </ProductOnBagPrice>
      )}
      <ProductOnBagRemove>
        <TooltipIcon
          title="remove-from-shopping-bag"
          onClick={() => removeFromBag(productId, dispatch)}
        >
          <div className={styles.closeWhite} />
        </TooltipIcon>
      </ProductOnBagRemove>
    </ProductOnBagContainer>
  );
};

export default ProductOnBagPage;

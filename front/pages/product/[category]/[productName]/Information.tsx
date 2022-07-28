import React, { useState } from 'react';
import { ListItem, Typography } from '@mui/material';
import { NextPage } from 'next';
import {
  AddButtonProductPage,
  InfoProductPageBox,
  LikeIconPosition,
  PriceBottomLineBox,
  PriceProductPageBox,
  ProductPageColorBox,
  ProductPageSizeBox,
} from '../../../../styles/productPage';
import { Colors } from '../../../../styles/theme';
import { sizesArray } from '../../../../utils/constants';
import { includesSizeFunc, setInShoppingBag } from '../../../../utils/function';
import { IProduct } from '../../../../utils/interface/productInterface';
import { SizeType } from '../../../../utils/types/form';
import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import TooltipIcon from '../../../../components/TooltipIcon/TooltipIcon';
import CheckBoxRadioInput from '../../../../components/CheckBoxRadioInput';
import CustomButton from '../../../../components/CustomButton';
import styles from '../../../../styles/product.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../../../store/services/ProductService';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

interface IInformation {
  product: IProduct;
}

const Information: NextPage<IInformation> = ({ product }) => {
  const { t } = useTranslation(['product', 'toast']);

  const { isAuth, user } = useAppSelector((state) => state.user);
  const { productsFavorite } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const isFavorite =
    productsFavorite &&
    productsFavorite.find((f) => f.product?.id === product.id);

  const sizesArr: SizeType[] = includesSizeFunc(
    sizesArray,
    product.productSize
  );

  const copyEmail = async () => {
    if (product.productNumber === undefined) {
      toast.error(t('failed-copy', { ns: 'toast' }));
    } else {
      await navigator.clipboard.writeText(product.productNumber);
      toast.success(
        `${t('successful-copy', { ns: 'toast' })} ${product.productNumber}`
      );
    }
  };

  return (
    <>
      {product && (
        <InfoProductPageBox>
          <Typography variant="roboto30300" sx={{ color: Colors.black }}>
            {product.productName}
          </Typography>
          <LikeIconPosition>
            {!!isFavorite ? (
              <TooltipIcon
                title="remove-from-favorites"
                onClick={async () => {
                  if (isAuth) {
                    await dispatch(
                      removeFromFavorite({
                        favoriteId: isFavorite.id,
                        userId: user.id,
                      })
                    );
                  } else {
                    toast.warning('Please log in to add');
                  }
                }}
              >
                <div className={styles.likeProductFilled} />
              </TooltipIcon>
            ) : (
              <TooltipIcon
                title="add-to-favorites"
                onClick={async () => {
                  if (isAuth) {
                    await dispatch(
                      addToFavorite({ productId: product.id, userId: user.id })
                    );
                  } else {
                    toast.warning('Please log in to add');
                  }
                }}
              >
                <div className={styles.likeProduct} />
              </TooltipIcon>
            )}
          </LikeIconPosition>
          {product.productDiscountPrice === 0 ? (
            <PriceBottomLineBox>
              <Typography variant="roboto30300" sx={{ color: Colors.darkGray }}>
                {product.productPrice} UAH
              </Typography>
            </PriceBottomLineBox>
          ) : (
            <PriceBottomLineBox>
              <PriceProductPageBox>
                <Typography
                  variant="roboto24200"
                  color={Colors.darkGray}
                  sx={{
                    textDecoration: 'line-through',
                    textDecorationThickness: '1px',
                    margin: '3px 10px 0px 0px',
                  }}
                >
                  {product.productPrice} UAH
                </Typography>
                <Typography variant="roboto30300" color={Colors.saleColor}>
                  {product.productDiscountPrice} UAH
                </Typography>
              </PriceProductPageBox>
            </PriceBottomLineBox>
          )}

          <Typography variant="roboto24200" color={Colors.black}>
            Kod:
            <TooltipIcon title="click-to-copy">
              <Typography
                variant="roboto24200"
                sx={{ color: Colors.darkGray, marginLeft: '5px' }}
              >
                {product.productNumber}
              </Typography>
            </TooltipIcon>
          </Typography>
          {/* {product.productSize.map((data) => (
<div key={data} className={styles.sizeCheckbox}>
  <Typography variant="roboto24200" color={Colors.black}>
    {data}
  </Typography>
</div>
))} */}
          <Formik
            initialValues={{ size: '' }}
            validationSchema={object().shape({
              size: string().required('Choose some sizes'),
            })}
            onSubmit={async (values) => {
              setInShoppingBag(
                dispatch,
                +values.size,
                product.id,
                product.productName,
                product.productMainPictures,
                product.productDiscountPrice,
                product.productPrice,
                product.productFor
              );
            }}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Typography
                    variant="roboto30300"
                    sx={{
                      color: Colors.black,
                      margin: '20px 10px 0px 0px',
                    }}
                  >
                    {t('size')}
                  </Typography>
                  <Typography
                    variant="roboto30300"
                    sx={{
                      color: Colors.black,
                      margin: '20px 10px 0px 0px',
                    }}
                  >
                    {t('sizeTable')}
                  </Typography>
                  <ErrorMessage
                    name="size"
                    component="span"
                    className={styles.errorStyle}
                  />
                  <ProductPageSizeBox>
                    {sizesArr.map((data) => (
                      <div key={data.size}>
                        <CheckBoxRadioInput
                          inputType="radio"
                          type="size"
                          fieldName="size"
                          htmlFor={String(data.size)}
                          value={String(data.size)}
                          isSize={data.is}
                        />
                      </div>
                    ))}
                  </ProductPageSizeBox>
                  <Typography
                    variant="roboto30300"
                    sx={{
                      color: Colors.black,
                      margin: '10px 0px 20px',
                    }}
                  >
                    {t('color')}
                  </Typography>
                  <ProductPageColorBox>
                    <div className={styles.colorBox}>
                      <div
                        className={`${
                          styles[`color-${product.productColor}`]
                        } ${styles.colorProperty}`}
                      />
                    </div>
                  </ProductPageColorBox>
                  <AddButtonProductPage>
                    <CustomButton isIcon={true} size="LG" type="submit">
                      {t('add-to-shopping-bag')}
                    </CustomButton>
                  </AddButtonProductPage>
                </Form>
              );
            }}
          </Formik>
          <Typography
            variant="roboto30300"
            sx={{ color: Colors.black, margin: '20px 0px' }}
          >
            {t('description')}
          </Typography>
          <Typography
            variant="roboto24200"
            sx={{ color: Colors.black, marginBottom: '20px' }}
          >
            {product.productDescription}
          </Typography>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, padding: '0px' }}
            >
              {t('color')}: {product.productColor}
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, padding: '0px' }}
            >
              {t('style')}: {product.productStyleName}
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography
              variant="roboto20400"
              sx={{ color: Colors.black, padding: '0px' }}
            >
              {t('material')}: {product.productStyleMaterial}
            </Typography>
          </ListItem>
        </InfoProductPageBox>
      )}
    </>
  );
};

export default Information;

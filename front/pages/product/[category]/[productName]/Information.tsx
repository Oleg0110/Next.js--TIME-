import React from 'react';
import theme, { Colors } from '../../../../styles/theme';
import { ListItem, Typography, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import {
  AddButtonProductPage,
  InfoProductPageBox,
  ProductPageColorBox,
  ProductPageSizeBox,
  SizeTitleBox,
} from '../../../../styles/productPage';
import { sizesArray } from '../../../../utils/constants';
import { includesSizeFunc, setInShoppingBag } from '../../../../utils/function';
import { IProduct } from '../../../../utils/interface/productInterface';
import { SizeType } from '../../../../utils/types/form';
import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useAppDispatch } from '../../../../hooks/redux';
import { useTranslation } from 'next-i18next';
import ProductNameBox from './ProductNameBox';
import CheckBoxRadioInput from '../../../../components/CheckBoxRadioInput';
import CustomButton from '../../../../components/CustomButton';
import styles from '../../../../styles/product.module.scss';

interface IInformation {
  product: IProduct;
}

const Information: NextPage<IInformation> = ({ product }) => {
  const mediaMD = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation('product');

  const dispatch = useAppDispatch();

  const sizesArr: SizeType[] = includesSizeFunc(
    sizesArray,
    product.productSize
  );

  return (
    <>
      {product && (
        <InfoProductPageBox>
          {!mediaMD && <ProductNameBox product={product} />}
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
                  <SizeTitleBox>
                    <Typography
                      variant="roboto30300"
                      sx={{
                        color: Colors.black,
                      }}
                    >
                      {t('size')}
                    </Typography>
                    <Typography
                      variant="roboto16200"
                      sx={{
                        color: Colors.lightGray,
                      }}
                    >
                      {t('sizeTable')}
                    </Typography>
                  </SizeTitleBox>
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
                    <CustomButton
                      size="LG"
                      type="submit"
                      style={{ fontSize: '20px' }}
                    >
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

import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CustomButton from '../CustomButton';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { IProduct } from '../../utils/interface/productInterface';
import { array, boolean, number, object, string } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CheckBoxRadioInput from '../CheckBoxRadioInput';
import styles from '../../styles/AdminPage.module.scss';
import {
  colorArray,
  materialArray,
  sizeArray,
  styleArray,
} from '../../utils/constants';
import {
  ChangeClickPosition,
  ChangeProductStateBox,
  DescriptionChangeBox,
  InfoChangeBox,
  MainChangeModalBox,
} from '../../styles/changeModal';
import { changeProduct } from '../../store/services/ProductService';
import { toast } from 'react-toastify';

interface IChangeModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
  product: IProduct;
  searchValue: string;
}

const ChangeModal: NextPage<IChangeModalProps> = ({
  isModalOpened,
  handleClose,
  product,
  searchValue,
}) => {
  const { t } = useTranslation(['admin', 'toast']);

  const initialValues: Omit<
    IProduct,
    'id' | 'date' | 'productMainPictures' | 'productNumber'
  > = {
    productName: product.productName,
    productFor: product.productFor,
    productPrice: product.productPrice,
    productDiscountPrice: product.productDiscountPrice,
    productSale: product.productSale,
    productNew: product.productNew,
    productSize: [],
    productColor: product.productColor,
    // productMainPictures: [{}],
    productDescription: product.productDescription,
    productStyleName: product.productStyleName,
    productStyleMaterial: product.productStyleMaterial,
  };

  const validationSchema = object().shape({
    productName: string()
      .min(3, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
    productFor: string().required('Men or Women'),
    productPrice: number()
      .min(1, 'More than 0')
      .max(15000, 'Max is 15000')
      .required('Required'),
    productDiscountPrice: number()
      .min(0)
      .max(14999, 'Max is 14999')
      .required('Required'),
    productSale: boolean(),
    productNew: boolean(),
    productSize: array().of(number()).required().min(1, 'Choose some sizes'),
    productColor: string().required('Choose by colors propose'),
    productDescription: string()
      .min(20, 'Too Short!')
      .max(150, 'Too Long!')
      .required('Required'),
    productStyleName: string().required('Choose by style propose'),
    productStyleMaterial: string().required('Choose by material propose'),
  });

  const dispatch = useAppDispatch();
  const { productSearch } = useAppSelector((state) => state.product);

  const styleSpan = { width: '45%', color: Colors.primary };

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <MainChangeModalBox>
          <Typography
            variant="roboto30300"
            sx={{
              textAlign: 'center',
              marginBottom: '10px',
              color: Colors.primary,
            }}
          >
            {t('change-product')}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (JSON.stringify(initialValues) === JSON.stringify(values)) {
                return toast.warning(t('product-modified', { ns: 'toast' }));
              }

              const data = await dispatch(
                changeProduct({
                  productId: product.id,
                  product: values,
                  searchValue,
                })
              );

              data.payload[0] === undefined &&
                toast.warning(t('product-not-change', { ns: 'toast' }));
              handleClose();
              data.payload[0] !== undefined &&
                toast.success(t('product-was-change', { ns: 'toast' }));
            }}
          >
            {({ values, setFieldValue, handleSubmit, isValid }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('name')}
                    </Typography>
                    <ErrorMessage
                      name="productName"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <Field
                    name="productName"
                    id="productName"
                    placeholder={t('placeholderName')}
                    className={styles.inputText}
                  />
                  <ChangeProductStateBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('sex')}
                    </Typography>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productFor === 'women' && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="radio"
                        name="productFor"
                        className={styles.radioInput}
                        value="women"
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        {t('women')}
                      </Typography>
                    </label>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productFor === 'men' && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="radio"
                        name="productFor"
                        className={styles.radioInput}
                        value="men"
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        {t('men')}
                      </Typography>
                    </label>
                  </ChangeProductStateBox>
                  <ErrorMessage
                    name="productFor"
                    component="span"
                    className={styles.errorStyle}
                  />
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('price')}
                    </Typography>
                    <ErrorMessage
                      name="productPrice"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <Field
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    className={styles.numberInput}
                  />
                  <ChangeProductStateBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('isSale')}
                    </Typography>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productSale === false && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="checkBox"
                        name="productSale"
                        className={styles.radioInput}
                        value={false}
                        onChange={() => setFieldValue('productSale', false)}
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        {t('no')}
                      </Typography>
                    </label>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productSale === true && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="checkBox"
                        name="productSale"
                        className={styles.radioInput}
                        value={true}
                        onChange={() => setFieldValue('productSale', true)}
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        {t('yes')}
                      </Typography>
                    </label>
                  </ChangeProductStateBox>
                  {values.productSale === true && (
                    <>
                      <InfoChangeBox>
                        <Typography variant="roboto24500" sx={styleSpan}>
                          {t('discount-price')}
                        </Typography>
                        <ErrorMessage
                          name="productDiscountPrice"
                          component="span"
                          className={styles.errorStyle}
                        />
                      </InfoChangeBox>
                      <Field
                        type="number"
                        name="productDiscountPrice"
                        id="productDiscountPrice"
                        className={styles.numberInput}
                      />
                    </>
                  )}
                  <ChangeProductStateBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('isNew')}
                    </Typography>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productNew === false && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="checkBox"
                        name="productNew"
                        className={styles.radioInput}
                        value={false}
                        onChange={() => setFieldValue('productNew', false)}
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        {t('no')}
                      </Typography>
                    </label>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productNew === true && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="checkBox"
                        name="productNew"
                        className={styles.radioInput}
                        value={true}
                        onChange={() => setFieldValue('productNew', true)}
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        {t('yes')}
                      </Typography>
                    </label>
                  </ChangeProductStateBox>
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('size')}
                    </Typography>
                    <ErrorMessage
                      name="productSize"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <DescriptionChangeBox>
                    {sizeArray.map((data) => (
                      <div key={data.id}>
                        <CheckBoxRadioInput
                          type="size"
                          fieldName="productSize"
                          htmlFor={data.id}
                          value={data.size}
                        />
                      </div>
                    ))}
                  </DescriptionChangeBox>
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('color')}
                    </Typography>
                    <ErrorMessage
                      name="productColor"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <DescriptionChangeBox>
                    {colorArray.map((data) => (
                      <div key={data.id}>
                        <CheckBoxRadioInput
                          type="color"
                          fieldName="productColor"
                          htmlFor={data.id}
                          value={data.color}
                        />
                      </div>
                    ))}
                  </DescriptionChangeBox>

                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('description')}
                    </Typography>
                    <ErrorMessage
                      name="productDescription"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <Field
                    as="textarea"
                    name="productDescription"
                    id="productDescription"
                    placeholder={t('placeholderDescription')}
                    className={styles.textArea}
                  />
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('style')}
                    </Typography>
                    <ErrorMessage
                      name="productStyleName"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <DescriptionChangeBox>
                    {styleArray.map((data) => (
                      <div key={data.id}>
                        <CheckBoxRadioInput
                          type="style"
                          fieldName="productStyleName"
                          htmlFor={data.id}
                          key={data.id}
                          value={data.style}
                          valueName={data.styleName}
                        />
                      </div>
                    ))}
                  </DescriptionChangeBox>
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('material')}
                    </Typography>
                    <ErrorMessage
                      name="productStyleMaterial"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>
                  <DescriptionChangeBox>
                    {materialArray.map((data) => (
                      <div key={data.id}>
                        <CheckBoxRadioInput
                          type="material"
                          fieldName="productStyleMaterial"
                          htmlFor={data.id}
                          key={data.id}
                          value={data.material}
                          valueName={data.materialName}
                        />
                      </div>
                    ))}
                  </DescriptionChangeBox>
                  <ChangeClickPosition>
                    <CustomButton size="LG" type="submit">
                      {t('change-product')}
                    </CustomButton>
                  </ChangeClickPosition>
                </Form>
              );
            }}
          </Formik>
        </MainChangeModalBox>
      </Modal>
    </>
  );
};

export default ChangeModal;

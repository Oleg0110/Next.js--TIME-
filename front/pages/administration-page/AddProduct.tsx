import React, { useRef } from 'react';
import { IProduct } from '../../utils/interface/productInterface';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { array, boolean, number, object, string } from 'yup';
import {
  AddFormBox,
  AddMainFormBox,
  AddProductBox,
  ButtonClickPosition,
  DescriptionOptionsBox,
  InfoAddBox,
  ProductStateBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { addProduct } from '../../store/services/ProductService';
import { NextPage } from 'next';
import {
  colorArray,
  materialArray,
  sizeArray,
  styleArray,
} from '../../utils/constants';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import CustomButton from '../../components/CustomButton';
import CheckBoxRadioInput from '../../components/CheckBoxRadioInput';
import styles from '../../styles/AdminPage.module.scss';
import PreviewImage from '../../components/PreviewImage';

const AddProduct: NextPage = () => {
  const { t } = useTranslation(['admin', 'toast']);

  const dispatch = useAppDispatch();

  const initialValues: Omit<IProduct, 'id' | 'date' | 'productNumber'> = {
    productName: '',
    productFor: 'women',
    productPrice: 0,
    productDiscountPrice: 0,
    productSale: false,
    productNew: false,
    productSize: [],
    productColor: 'black',
    productMainPictures: [],
    productDescription:
      'Lorem, ipsum dolo. Porro et perspiciatis vel autem? Aperiam tenetur minima nihil adipisci, eniti harum itaque asperiores.',
    productStyleName: 'boots',
    productStyleMaterial: 'leather',
  };

  const validationSchema = object().shape({
    // productName: string()
    //   .min(3, 'Too Short!')
    //   .max(40, 'Too Long!')
    //   .required('Required'),
    // productFor: string().required('Men or Women'),
    // productPrice: number()
    //   .min(1, 'More than 0')
    //   .max(15000, 'Max is 15000')
    //   .required('Required'),
    // productDiscountPrice: number()
    //   .min(0)
    //   .max(14999, 'Max is 14999')
    //   .required('Required'),
    // productSale: boolean(),
    // productNew: boolean(),
    // productSize: array().of(number()).required().min(1, 'Choose some sizes'),
    // productColor: string().required('Choose by colors propose'),
    // productMainPictures: array(),
    // productDescription: string()
    //   .min(20, 'Too Short!')
    //   .max(150, 'Too Long!')
    //   .required('Required'),
    // productStyleName: string().required('Choose by style propose'),
    // productStyleMaterial: string().required('Choose by material propose'),
  });

  const styleSpan = { width: '45%', color: Colors.primary };

  const fileRef = useRef(null);

  return (
    <AddProductBox>
      <AddMainFormBox>
        <AddFormBox>
          <Typography
            variant="roboto30300"
            sx={{
              textAlign: 'center',
              marginBottom: '10px',
              color: Colors.primary,
            }}
          >
            {t('product')}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const data = await dispatch(
                addProduct({
                  product: values,
                  photoFile: values.productMainPictures,
                })
              );
              // resetForm();
              //!! Problem
              // if (data.payload !== undefined || null)
              //   return toast.success(t('product-was-created', { ns: 'toast' }));
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('name')}
                    </Typography>
                    <ErrorMessage
                      name="productName"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <Field
                    name="productName"
                    id="productName"
                    placeholder={t('placeholderName')}
                    className={styles.inputText}
                  />
                  <input
                    // hidden
                    // ref={fileRef}
                    type="file"
                    name="productMainPictures"
                    onChange={(event) => {
                      console.log(event.target.files[0]);

                      setFieldValue(
                        'productMainPictures',
                        values.productMainPictures.concat(event.target.files[0])
                      );
                    }}
                  />
                  {/* <input
                    hidden
                    ref={fileRef}
                    type="file"
                    name="productMainPictures"
                    onChange={(event) => {
                      setFieldValue(
                        'productMainPictures',
                        event.target.files[0]
                      );
                    }}
                  /> */}
                  {/* {values.productMainPictures && (
                    <PreviewImage file={values.productMainPictures} />
                  )} */}
                  {/* <button onClick={() => fileRef.current.click()}>
                    Upload
                  </button> */}
                  <ProductStateBox>
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
                  </ProductStateBox>
                  <ErrorMessage
                    name="productFor"
                    component="span"
                    className={styles.errorStyle}
                  />
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('price')}
                    </Typography>
                    <ErrorMessage
                      name="productPrice"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <Field
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    className={styles.numberInput}
                  />
                  <ProductStateBox>
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
                  </ProductStateBox>
                  {values.productSale === true && (
                    <>
                      <InfoAddBox>
                        <Typography variant="roboto24500" sx={styleSpan}>
                          {t('discount-price')}
                        </Typography>
                        <ErrorMessage
                          name="productDiscountPrice"
                          component="span"
                          className={styles.errorStyle}
                        />
                      </InfoAddBox>
                      <Field
                        type="number"
                        name="productDiscountPrice"
                        id="productDiscountPrice"
                        className={styles.numberInput}
                      />
                    </>
                  )}
                  <ProductStateBox>
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
                  </ProductStateBox>
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('size')}
                    </Typography>
                    <ErrorMessage
                      name="productSize"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <DescriptionOptionsBox>
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
                  </DescriptionOptionsBox>
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('color')}
                    </Typography>
                    <ErrorMessage
                      name="productColor"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <DescriptionOptionsBox>
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
                  </DescriptionOptionsBox>

                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('description')}
                    </Typography>
                    <ErrorMessage
                      name="productDescription"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <Field
                    as="textarea"
                    name="productDescription"
                    id="productDescription"
                    placeholder="Description"
                    className={styles.textArea}
                  />
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('style')}
                    </Typography>
                    <ErrorMessage
                      name="productStyleName"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <DescriptionOptionsBox>
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
                  </DescriptionOptionsBox>
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('material')}
                    </Typography>
                    <ErrorMessage
                      name="productStyleMaterial"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>
                  <DescriptionOptionsBox>
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
                  </DescriptionOptionsBox>
                  <ButtonClickPosition>
                    <CustomButton size="LG" type="submit">
                      {t('add-product')}
                    </CustomButton>
                  </ButtonClickPosition>
                </Form>
              );
            }}
          </Formik>
        </AddFormBox>
      </AddMainFormBox>
    </AddProductBox>
  );
};

export default AddProduct;

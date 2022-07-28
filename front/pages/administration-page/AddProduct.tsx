import React, { useRef, useState } from 'react';
import { IProduct } from '../../utils/interface/productInterface';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { array, boolean, number, object, string } from 'yup';
import {
  AddFormBox,
  AddMainFormBox,
  AddMainPhotoBox,
  AddPhotoBox,
  AddProductBox,
  AdminLoadingBox,
  ButtonAddPhotos,
  ButtonClickPosition,
  DescriptionOptionsBox,
  InfoAddBox,
  MainPhotoBox,
  PhotoBox,
  PhotosBox,
  ProductStateBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
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
import TooltipIcon from '../../components/TooltipIcon/TooltipIcon';

const styleSpan = { width: '45%', color: Colors.primary };

const AddProduct: NextPage = () => {
  const { t } = useTranslation(['admin', 'toast']);

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.product);

  const initialValues: Omit<IProduct, 'id' | 'date' | 'productNumber'> = {
    productName: '',
    productFor: 'women',
    productPrice: 0,
    productDiscountPrice: 0,
    productSale: false,
    productNew: false,
    productSize: [],
    productColor: 'black',
    productMainPictures: null,
    productDescription: '',
    productStyleName: 'boots',
    productStyleMaterial: 'leather',
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
    productMainPictures: array().min(1, 'Require').required('Require'),
    productDescription: string()
      .min(20, 'Too Short!')
      .max(400, 'Too Long!')
      .required('Required'),
    productStyleName: string().required('Choose by style propose'),
    productStyleMaterial: string().required('Choose by material propose'),
  });

  const [isPhotos, setIsPhotos] = useState({ images: [] });
  const [isMainPhoto, setIsMainPhoto] = useState({ images: [] });

  const addPhotos = (event, setFieldValue, isBo) => {
    event.preventDefault();

    const allPhotos = [
      ...isPhotos.images,
      ...isMainPhoto.images,
      ...event.target.files,
    ];

    !isBo &&
      setIsPhotos({ images: [...isPhotos.images, ...event.target.files] });
    isBo && setIsMainPhoto({ images: [...event.target.files] });
    setFieldValue('productMainPictures', allPhotos);
  };

  const deletePhoto = (index, setFieldValue) => {
    const imagesArr = isPhotos.images;
    imagesArr.splice(index, 1);

    setIsPhotos({ images: imagesArr });

    setFieldValue('productMainPictures', imagesArr);
  };

  const deleteMainPhoto = (index, setFieldValue) => {
    const imagesArr = isMainPhoto.images;
    imagesArr.splice(index, 1);

    setIsMainPhoto({ images: imagesArr });

    const allPhotos = [...isPhotos.images, ...isMainPhoto.images];

    setFieldValue('productMainPictures', allPhotos);
  };

  const mainPhotoRef = useRef(null);
  const photosRef = useRef(null);

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
              const res = await dispatch(
                addProduct({
                  product: values,
                  photoFile: values.productMainPictures,
                })
              );
              resetForm();
              setIsMainPhoto({ images: [] });
              setIsPhotos({ images: [] });
              if (res.meta.requestStatus === 'fulfilled') {
                return toast.success(t('product-was-created', { ns: 'toast' }));
              } else {
                return toast.error(t('Problem', { ns: 'toast' }));
              }
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
                    ref={mainPhotoRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      addPhotos(event, setFieldValue, true);
                    }}
                  />
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('main-photo')}:
                    </Typography>
                    <ErrorMessage
                      name="productMainPictures"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoAddBox>

                  {isMainPhoto.images[0] === undefined ? (
                    <AddMainPhotoBox
                      onClick={(e) => {
                        e.preventDefault();
                        mainPhotoRef.current.click();
                      }}
                    >
                      {t('click-to-add')}
                    </AddMainPhotoBox>
                  ) : (
                    <MainPhotoBox>
                      {isMainPhoto.images.map((src, index) => {
                        const url = URL.createObjectURL(src);
                        return (
                          <TooltipIcon
                            key={index}
                            title="delete-photo"
                            onClick={() =>
                              deleteMainPhoto(index, setFieldValue)
                            }
                          >
                            <img src={url} width="125px" height="125px" />
                          </TooltipIcon>
                        );
                      })}
                    </MainPhotoBox>
                  )}
                  <input
                    multiple
                    style={{ display: 'none' }}
                    ref={photosRef}
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      addPhotos(event, setFieldValue, false);
                    }}
                  />
                  <AddPhotoBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('photos')}:
                    </Typography>
                    <ButtonAddPhotos
                      onClick={(e) => {
                        e.preventDefault();
                        photosRef.current.click();
                      }}
                    >
                      {t('add-photos')}
                    </ButtonAddPhotos>
                  </AddPhotoBox>
                  <PhotosBox>
                    {isPhotos.images.map((src, index) => {
                      const url = URL.createObjectURL(src);
                      return (
                        <PhotoBox key={index}>
                          <TooltipIcon
                            title="delete-photo"
                            onClick={() => deletePhoto(index, setFieldValue)}
                          >
                            <img src={url} width="100px" height="100px" />
                          </TooltipIcon>
                        </PhotoBox>
                      );
                    })}
                  </PhotosBox>
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
                  {isLoading ? (
                    <AdminLoadingBox>
                      <CircularProgress
                        sx={{
                          color: Colors.primary,
                          margin: '10px 0px',
                        }}
                        disableShrink
                        size="35px"
                      />
                    </AdminLoadingBox>
                  ) : (
                    <ButtonClickPosition>
                      <CustomButton size="LG" type="submit">
                        {t('add-product')}
                      </CustomButton>
                    </ButtonClickPosition>
                  )}
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

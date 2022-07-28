import React, { useRef, useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { IProduct } from '../../utils/interface/productInterface';
import { array, boolean, number, object, string } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppDispatch } from '../../hooks/redux';
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
} from '../../styles/modal';
import { changeProduct } from '../../store/services/ProductService';
import { toast } from 'react-toastify';
import {
  AddMainPhotoBox,
  AddPhotoBox,
  ButtonAddPhotos,
  MainPhotoBox,
  PhotosBox,
  PhotoBox,
} from '../../styles/administration';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import CheckBoxRadioInput from '../CheckBoxRadioInput';
import CustomButton from '../CustomButton';
import styles from '../../styles/AdminPage.module.scss';

interface IChangeModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
  product: IProduct;
  searchValue: string;
}

const styleSpan = { width: '45%', color: Colors.primary };

const ChangeModal: NextPage<IChangeModalProps> = ({
  isModalOpened,
  handleClose,
  product,
  searchValue,
}) => {
  const { t } = useTranslation(['admin', 'toast']);

  const dispatch = useAppDispatch();

  const initialValues: Omit<IProduct, 'id' | 'date' | 'productNumber'> = {
    productName: product.productName,
    productFor: product.productFor,
    productPrice: product.productPrice,
    productDiscountPrice: product.productDiscountPrice,
    productSale: product.productSale,
    productNew: product.productNew,
    productSize: [],
    productColor: product.productColor,
    productMainPictures: null,
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

              const res = await dispatch(
                changeProduct({
                  productId: product.id,
                  product: values,
                  searchValue,
                  photoFile: values.productMainPictures,
                })
              );

              if (res.meta.requestStatus === 'rejected') {
                toast.error(t('product-not-change', { ns: 'toast' }));
              } else {
                toast.success(t('product-was-change', { ns: 'toast' }));
                // handleClose();
              }
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => {
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
                  <input
                    ref={mainPhotoRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      addPhotos(event, setFieldValue, true);
                    }}
                  />
                  <InfoChangeBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('main-photo')}:
                    </Typography>
                    <ErrorMessage
                      name="productMainPictures"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeBox>

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

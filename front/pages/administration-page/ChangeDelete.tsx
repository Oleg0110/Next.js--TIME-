import React from 'react';
import { IProduct } from '../../utils/interface/productInterface';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { array, boolean, number, object, ObjectSchema, string } from 'yup';
import CustomButton from '../../components/CustomButton';
import styles from '../../styles/AddProduct.module.scss';
import {
  AddFormBox,
  AddMainFormBox,
  AddProductBox,
  ButtonClickPosition,
  ChangeDeleteBox,
  ChangeDeleteFormBox,
  ChangeDeleteMainFormBox,
  DescriptionOptionsBox,
  InfoAddBox,
  InfoChangeDeleteBox,
  ProductStateBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import CheckBoxRadioInput from '../../components/CheckBoxRadioInput';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import {
  addProduct,
  getSearchProduct,
} from '../../store/services/ProductService';
import { NextPage } from 'next';

const ChangeDelete: NextPage = () => {
  const initialValues: Omit<IProduct, 'id' | 'date' | 'productMainPictures'> = {
    productName: '',
    productFor: 'womens',
    productPrice: 0,
    productDiscountPrice: 0,
    productSale: false,
    productNew: false,
    productSize: [],
    productColor: 'black',
    // productMainPictures: [{}],
    productDescription:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam commodi laborum accusantium. Porro et perspiciatis vel autem? Aperiam tenetur minima nihil adipisci, soluta molestiae omnis vitae deleniti harum itaque asperiores.',
    productStyleName: 'boots',
    productStyleMaterial: 'leather',
  };

  const validationSchema = object().shape({
    productName: string()
      .min(3, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
    productFor: string().required("Mens or Women's"),
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

  const validationNumberSchema = object().shape({
    productNumber: string()
      .min(1, 'Too Short!')
      .max(11, 'Too Long!')
      .required('Required')
      .matches(/^[0-9\b]+$/, 'Only Numbers'),
  });

  const dispatch = useAppDispatch();

  const styleSpan = { width: '45%', color: Colors.primary };

  return (
    <ChangeDeleteBox>
      <ChangeDeleteMainFormBox>
        <Typography
          variant="roboto30300"
          sx={{
            textAlign: 'center',
            marginBottom: '10px',
            color: Colors.primary,
          }}
        >
          Find Product
        </Typography>
        <ChangeDeleteFormBox>
          <Formik
            initialValues={{ productNumber: '1' }}
            validationSchema={validationNumberSchema}
            onSubmit={async (values) => {
              await dispatch(getSearchProduct(values.productNumber));
            }}
          >
            {() => {
              return (
                <Form>
                  <InfoChangeDeleteBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      Product №
                    </Typography>
                    <ErrorMessage
                      name="productNumber"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeDeleteBox>
                  <Field
                    name="productNumber"
                    id="productNumber"
                    placeholder="Number"
                    className={styles.inputText}
                  />
                  {/* <ButtonClickPosition>
                    <CustomButton size="LG" type="submit">
                      Add Product
                    </CustomButton>
                  </ButtonClickPosition> */}
                </Form>
              );
            }}
          </Formik>
        </ChangeDeleteFormBox>
      </ChangeDeleteMainFormBox>
    </ChangeDeleteBox>
  );
};

export default ChangeDelete;

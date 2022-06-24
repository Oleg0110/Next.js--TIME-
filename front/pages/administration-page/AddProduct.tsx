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
  DescriptionOptionsBox,
  InfoAddBox,
  ProductStateBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import CheckBoxRadioInput from '../../components/CheckBoxRadioInput';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { addProduct } from '../../store/services/ProductService';
import { NextPage } from 'next';

type SizeType = {
  id: string;
  size: string;
};

type ColorType = {
  id: string;
  color: string;
  colorName: string;
};

type StyleType = {
  id: string;
  style: string;
  styleName: string;
};

type MaterialType = {
  id: string;
  material: string;
  materialName: string;
};

const sizeArray: SizeType[] = [
  { id: '1', size: '35' },
  { id: '2', size: '36' },
  { id: '3', size: '37' },
  { id: '4', size: '38' },
  { id: '5', size: '39' },
  { id: '6', size: '40' },
  { id: '7', size: '41' },
  { id: '8', size: '42' },
  { id: '9', size: '43' },
  { id: '10', size: '44' },
  { id: '11', size: '45' },
];

const colorArray: ColorType[] = [
  { id: '12', color: 'black', colorName: 'Black' },
  { id: '13', color: 'gray', colorName: 'Gray' },
  { id: '14', color: 'white', colorName: 'White' },
  { id: '15', color: 'brown', colorName: 'Brown' },
  { id: '16', color: 'blue', colorName: 'Blue' },
  { id: '17', color: 'pink', colorName: 'Pink' },
  { id: '18', color: 'green', colorName: 'Green' },
];

const styleArray: StyleType[] = [
  { id: '21', style: 'boots', styleName: 'Boots' },
  { id: '19', style: 'sneakers', styleName: 'Sneakers' },
  { id: '20', style: 'loafers', styleName: 'Loafers' },
  { id: '22', style: 'bootforts', styleName: 'Bootforts' },
  { id: '23', style: 'sandals', styleName: 'Sandals' },
  { id: '24', style: 'footwear', styleName: 'Footwear' },
  { id: '25', style: 'slippers', styleName: 'Slippers' },
];

const materialArray: MaterialType[] = [
  { id: '28', material: 'leather', materialName: 'Leather' },
  { id: '26', material: 'genuine leather', materialName: 'Genuine leather' },
  { id: '27', material: 'eco leather', materialName: 'ECO leather' },
  { id: '29', material: 'suede', materialName: 'Suede' },
  { id: '30', material: 'nylon', materialName: 'Nylon' },
  { id: '31', material: 'velor', materialName: 'Velor' },
  {
    id: '32',
    material: 'artificial materials',
    materialName: 'Artificial materials',
  },
  {
    id: '33',
    material: 'fiber',
    materialName: 'Fiber',
  },
];

const AddProduct: NextPage = () => {
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
      'Lorem, ipsum dolo. Porro et perspiciatis vel autem? Aperiam tenetur minima nihil adipisci, eniti harum itaque asperiores.',
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

  const dispatch = useAppDispatch();

  const styleSpan = { width: '45%', color: Colors.primary };

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
            Product
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const da = await dispatch(addProduct(values));
              // console.log(1, da.payload);
              resetForm();
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => {
              // console.log(values.productSize);
              return (
                <Form onSubmit={handleSubmit}>
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      Name
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
                    placeholder="Name"
                    className={styles.inputText}
                  />
                  <ProductStateBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      Sex:
                    </Typography>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productFor === 'womens' && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="radio"
                        name="productFor"
                        className={styles.radioInput}
                        value="womens"
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        Women's
                      </Typography>
                    </label>
                    <label
                      className={`${styles.booleanCheckBox} ${
                        values.productFor === 'mens' && styles.booleanChecked
                      }`}
                    >
                      <Field
                        type="radio"
                        name="productFor"
                        className={styles.radioInput}
                        value="mens"
                      />
                      <Typography variant="roboto16400" color={Colors.black}>
                        Mens
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
                      Price
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
                      Is Sale:
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
                        False
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
                        True
                      </Typography>
                    </label>
                  </ProductStateBox>
                  {values.productSale === true && (
                    <>
                      <InfoAddBox>
                        <Typography variant="roboto24500" sx={styleSpan}>
                          Discount Price
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
                      Is New:
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
                        False
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
                        True
                      </Typography>
                    </label>
                  </ProductStateBox>
                  <InfoAddBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      Size
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
                      Color
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
                      Description
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
                      Style
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
                      Material
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
                      Add Product
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

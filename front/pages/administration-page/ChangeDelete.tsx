import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import {
  ChangeDeleteBox,
  ChangeDeleteFormBox,
  ChangeDeleteMainFormBox,
  Davay,
  FoundProductBox,
  InfoChangeDeleteBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSearchProduct } from '../../store/services/ProductService';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import ProductSearch from '../../components/ProductSearch';
import styles from '../../styles/AdminPage.module.scss';

const ChangeDelete: NextPage = () => {
  const { t } = useTranslation('admin');

  const [isValue, setIsValue] = useState('');

  const dispatch = useAppDispatch();
  const { productSearch } = useAppSelector((state) => state.product);

  const validationNumberSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(11, 'Too Long!')
      .required('Required')
      .matches(/^[0-9\b]+$/, 'Only Numbers'),
  });

  const styleSpan = {
    width: '45%',
    color: Colors.primary,
    marginRight: '10px',
  };

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
          {t('find-product')}
        </Typography>
        <ChangeDeleteFormBox>
          <Formik
            initialValues={{ searchValue: '' }}
            validationSchema={validationNumberSchema}
            onSubmit={async (values) => {
              await dispatch(getSearchProduct(values.searchValue));
              setIsValue(values.searchValue);
            }}
          >
            {() => {
              return (
                <Form>
                  <InfoChangeDeleteBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('product-number')}
                    </Typography>
                    <ErrorMessage
                      name="searchValue"
                      component="span"
                      className={styles.errorStyle}
                    />
                  </InfoChangeDeleteBox>
                  <Field
                    name="searchValue"
                    id="searchValue"
                    placeholder={t('placeholderNumber')}
                    className={styles.inputText}
                  />
                </Form>
              );
            }}
          </Formik>
        </ChangeDeleteFormBox>
        {productSearch[0] !== undefined && (
          <FoundProductBox>
            <Davay>
              {productSearch.map((data) => (
                <div key={data.id}>
                  <ProductSearch product={data} searchValue={isValue} />
                </div>
              ))}
            </Davay>
          </FoundProductBox>
        )}
      </ChangeDeleteMainFormBox>
    </ChangeDeleteBox>
  );
};

export default ChangeDelete;

import React from 'react';
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
import { NextPage } from 'next';
import { getSearchCustomer } from '../../store/services/CustomerService';
import { useTranslation } from 'next-i18next';
import CustomerSearch from '../../components/CustomerSearch';
import styles from '../../styles/AdminPage.module.scss';

const CustomManagement: NextPage = () => {
  const { t } = useTranslation('admin');

  const dispatch = useAppDispatch();
  const { customerSearch } = useAppSelector((state) => state.customer);

  const validationSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
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
          {t('find-customer')}
        </Typography>
        <ChangeDeleteFormBox>
          <Formik
            initialValues={{ searchValue: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await dispatch(getSearchCustomer(values.searchValue));
            }}
          >
            {() => {
              return (
                <Form>
                  <InfoChangeDeleteBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('customer')}
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
                    placeholder={t('placeholderName-Email')}
                    className={styles.inputText}
                  />
                </Form>
              );
            }}
          </Formik>
        </ChangeDeleteFormBox>
        {customerSearch[0] !== undefined && (
          <FoundProductBox>
            <Davay>
              {customerSearch.map((data) => (
                <div key={data.id}>
                  <CustomerSearch
                    customerEmail={data.email}
                    customerName={data.name}
                    customerSurname={data.surname}
                  />
                </div>
              ))}
            </Davay>
          </FoundProductBox>
        )}
      </ChangeDeleteMainFormBox>
    </ChangeDeleteBox>
  );
};

export default CustomManagement;

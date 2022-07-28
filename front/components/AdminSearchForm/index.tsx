import React from 'react';
import { Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from '../../hooks/redux';
import {
  AdminFormBox,
  SearchAdminFormBox,
  SearchAdminFormError,
  SearchAdminFormInput,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';

interface IAdminSearchForm {
  validationSchema: {};
  serviceFunc: (string: string) => any;
  placeholder: string;
  formName: string;
  setProductSearchValue?: (string: string) => void;
}

const AdminSearchForm: NextPage<IAdminSearchForm> = ({
  validationSchema,
  serviceFunc,
  placeholder,
  formName,
  setProductSearchValue,
}) => {
  const { t } = useTranslation('admin');

  const dispatch = useAppDispatch();

  return (
    <AdminFormBox
      sx={formName === 'user' && { margin: '0px 10px 0px', padding: '0px' }}
    >
      <Formik
        initialValues={{ searchValue: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await dispatch(serviceFunc(values.searchValue));
          !!setProductSearchValue && setProductSearchValue(values.searchValue);
        }}
      >
        {({ submitForm }) => {
          return (
            <Form onChange={() => submitForm()}>
              <SearchAdminFormBox>
                {formName !== 'user' && (
                  <Typography
                    variant="roboto24200"
                    sx={{
                      width: '55%',
                      color: Colors.primary,
                      marginRight: '10px',
                    }}
                  >
                    {t(formName)}:
                  </Typography>
                )}
                <SearchAdminFormError
                  name="searchValue"
                  component="span"
                  sx={formName === 'user' && { left: '5px' }}
                />
                <SearchAdminFormInput
                  name="searchValue"
                  id="searchValue"
                  placeholder={placeholder}
                />
              </SearchAdminFormBox>
            </Form>
          );
        }}
      </Formik>
    </AdminFormBox>
  );
};

export default AdminSearchForm;

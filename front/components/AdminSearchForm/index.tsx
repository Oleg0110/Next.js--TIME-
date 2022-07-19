import { Typography } from '@mui/material';
import { AnyARecord } from 'dns';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import React from 'react';
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation('admin');

  return (
    <AdminFormBox>
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
                <Typography
                  variant="roboto24200"
                  sx={{
                    width: '45%',
                    color: Colors.primary,
                    marginRight: '10px',
                  }}
                >
                  {formName} :
                </Typography>
                <SearchAdminFormError name="searchValue" component="span" />
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

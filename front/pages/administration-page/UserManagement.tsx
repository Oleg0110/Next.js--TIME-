import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import {
  ChangeDeleteBox,
  ChangeDeleteFormBox,
  ChangeDeleteMainFormBox,
  UserSearchBox,
  FoundProductBox,
  InfoChangeDeleteBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { NextPage } from 'next';
import { getSearchUser } from '../../store/services/UserService';
import { useTranslation } from 'next-i18next';
import UserSearch from '../../components/UserSearch';
import styles from '../../styles/AdminPage.module.scss';

const CustomManagement: NextPage = () => {
  const { t } = useTranslation('admin');

  const dispatch = useAppDispatch();
  const { userSearch } = useAppSelector((state) => state.user);

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
          {t('find-user')}
        </Typography>
        <ChangeDeleteFormBox>
          <Formik
            initialValues={{ searchValue: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await dispatch(getSearchUser(values.searchValue));
            }}
          >
            {() => {
              return (
                <Form>
                  <InfoChangeDeleteBox>
                    <Typography variant="roboto24500" sx={styleSpan}>
                      {t('user')}
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
        {userSearch[0] !== undefined && (
          <FoundProductBox>
            <UserSearchBox>
              {userSearch.map((data) => (
                <div key={data.id}>
                  <UserSearch
                    userEmail={data.email}
                    userName={data.name}
                    userSurname={data.surname}
                  />
                </div>
              ))}
            </UserSearchBox>
          </FoundProductBox>
        )}
      </ChangeDeleteMainFormBox>
    </ChangeDeleteBox>
  );
};

export default CustomManagement;

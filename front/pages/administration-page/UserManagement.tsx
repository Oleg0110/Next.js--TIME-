import React from 'react';
import { object, string } from 'yup';
import {
  UserSearchBox,
  FoundProductBox,
  UserManagementBox,
  UserManagementMainFormBox,
  UserManagementFormBox,
  InfoUserManagementBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { NextPage } from 'next';
import { getSearchUser } from '../../store/services/UserService';
import { useTranslation } from 'next-i18next';
import UserSearch from '../../components/UserSearch';
import AdminSearchForm from '../../components/AdminSearchForm';

const UserManagement: NextPage = () => {
  const { t } = useTranslation('admin');

  const { userSearch } = useAppSelector((state) => state.user);

  const validationSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
  });

  return (
    <UserManagementBox>
      <UserManagementMainFormBox>
        <Typography
          variant="roboto24500"
          sx={{
            textAlign: 'start',
            margin: '10px',
            width: '100%',
            color: Colors.primary,
          }}
        >
          {t('find-user')}
        </Typography>
        <AdminSearchForm
          placeholder={t('placeholderName-Email')}
          serviceFunc={getSearchUser}
          validationSchema={validationSchema}
          formName={t('user')}
        />
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
      </UserManagementMainFormBox>
    </UserManagementBox>
  );
};

export default UserManagement;

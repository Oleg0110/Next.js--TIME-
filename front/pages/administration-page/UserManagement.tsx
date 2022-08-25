import React, { useEffect } from 'react';
import { object, string } from 'yup';
import {
  UserSearchBox,
  FoundProductBox,
  UserManagementBox,
  UserManagementMainFormBox,
  UserManagementTeamBox,
  UserManagementInputBox,
  AdminLoadingBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { NextPage } from 'next';
import { getSearchUser, getUserInTeam } from '../../store/services/UserService';
import { useTranslation } from 'next-i18next';
import UserSearch from '../../components/UserSearch';
import AdminSearchForm from '../../components/AdminSearchForm';

const UserManagement: NextPage = () => {
  const { t } = useTranslation('admin');

  const dispatch = useAppDispatch();

  const { userSearch, userInTeam, isLoading } = useAppSelector(
    (state) => state.user
  );

  const validationSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
  });

  useEffect(() => {
    const asyncFunc = async () => {
      await dispatch(getUserInTeam());
    };
    asyncFunc();
  }, []);

  return (
    <UserManagementBox>
      <UserManagementTeamBox>
        <Typography
          variant="roboto24500"
          sx={{
            textAlign: 'start',
            width: '100%',
            color: Colors.primary,
          }}
        >
          {t('team')}
        </Typography>
        <FoundProductBox>
          <UserSearchBox>
            {userInTeam[0] !== undefined &&
              userInTeam.map((data) => (
                <div key={data.id}>
                  <UserSearch
                    userEmail={data.email}
                    userName={data.name}
                    userSurname={data.surname}
                    userRole={data.userRole}
                    userId={data.id}
                    what="team"
                  />
                </div>
              ))}
          </UserSearchBox>
        </FoundProductBox>
      </UserManagementTeamBox>
      <UserManagementMainFormBox>
        <UserManagementInputBox>
          <Typography
            variant="roboto24500"
            sx={{
              textAlign: 'start',
              margin: '0px 10px',
              width: '50%',
              color: Colors.primary,
            }}
          >
            {t('find-user')}
          </Typography>
          <AdminSearchForm
            placeholder={t('placeholderName-Email')}
            serviceFunc={getSearchUser}
            validationSchema={validationSchema}
            formName="user"
          />
        </UserManagementInputBox>
        <FoundProductBox>
          <UserSearchBox>
            {isLoading ? (
              <AdminLoadingBox>
                <CircularProgress
                  sx={{
                    color: Colors.primary,
                    margin: '40px 0px',
                  }}
                  disableShrink
                  size="35px"
                />
              </AdminLoadingBox>
            ) : (
              userSearch[0] !== undefined &&
              userSearch.map((data) => (
                <div key={data.id}>
                  <UserSearch
                    userEmail={data.email}
                    userName={data.name}
                    userSurname={data.surname}
                    userRole={data.userRole}
                    userId={data.id}
                    what="find"
                  />
                </div>
              ))
            )}
          </UserSearchBox>
        </FoundProductBox>
      </UserManagementMainFormBox>
    </UserManagementBox>
  );
};

export default UserManagement;

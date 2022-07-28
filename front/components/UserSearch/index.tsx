import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import {
  UserSearchContainer,
  InfoUserContainer,
  UserStatusBox,
} from '../../styles/userSearch';
import { toast } from 'react-toastify';
import ChangeUserStatusModal from '../ChangeUserStatusModal';

interface IUserSearch {
  userId: string;
  userName: string;
  userSurname: string;
  userEmail: string;
  userRole: string;
  what: 'find' | 'team';
}

const spanStyle = {
  width: '260px',
  color: Colors.black,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    fontSize: '15px',
  },
};

const UserSearch: NextPage<IUserSearch> = ({
  userId,
  userName,
  userSurname,
  userEmail,
  userRole,
  what,
}) => {
  const { t } = useTranslation(['admin', 'toast']);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyEmail = async () => {
    if (userEmail === undefined) {
      toast.error(t('failed-copy', { ns: 'toast' }));
    } else {
      await navigator.clipboard.writeText(userEmail);
      toast.success(`${t('successful-copy', { ns: 'toast' })} ${userEmail}`);
    }
  };

  return (
    <>
      <ChangeUserStatusModal
        isModalOpened={open}
        handleClose={handleClose}
        userId={userId}
        userName={userName}
        userSurname={userSurname}
        userRole={userRole}
      />
      <Tooltip
        title={what === 'team' ? t('click-to-copy') : t('click-to-change')}
        placement="top"
        onClick={(e) => {
          if (what === 'team') {
            copyEmail();
          } else {
            if (userRole === 'owner') {
              return toast.warning("Owner can't change");
            }
            handleClick(e);
          }
        }}
      >
        <UserSearchContainer>
          <InfoUserContainer>
            <Typography variant="roboto20200" sx={spanStyle}>
              {`${userName} ${userSurname}`}
            </Typography>
            <Typography
              variant="roboto16400"
              color={Colors.primary}
              sx={{ ...spanStyle, fontSize: '12px' }}
            >
              {userEmail}
            </Typography>
          </InfoUserContainer>
          <UserStatusBox>
            <Typography
              variant="roboto16400"
              sx={{
                textAlign: 'start',
                width: '100%',
                fontSize: '15px',
                color: Colors.black,
                [theme.breakpoints.down('sm')]: {
                  fontSize: '10px',
                },
              }}
            >
              {t('status')}:
              <Typography
                variant="roboto16400"
                sx={{
                  color: Colors.primary,
                  marginLeft: '10px',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '10px',
                  },
                }}
              >
                {t(`role-${userRole}`)}
              </Typography>
            </Typography>
          </UserStatusBox>
        </UserSearchContainer>
      </Tooltip>
    </>
  );
};

export default UserSearch;

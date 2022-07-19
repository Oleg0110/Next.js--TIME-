import React, { useState } from 'react';
import { Typography } from '@mui/material';
import theme, { Colors } from '../../styles/theme';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { useAppDispatch } from '../../hooks/redux';
import {
  ChangeButton,
  UserSearchButtonBox,
  UserSearchContainer,
  InfoUserContainer,
} from '../../styles/userSearch';
import { toast } from 'react-toastify';
import ChangeModal from '../ChangeModal';
import styles from '../../styles/icons.module.scss';

interface IUserSearch {
  userName: string;
  userSurname: string;
  userEmail: string;
}

const UserSearch: NextPage<IUserSearch> = ({
  userName,
  userSurname,
  userEmail,
}) => {
  const { t } = useTranslation(['admin', 'toast']);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const spanStyle = {
    width: '260px',
    color: Colors.black,
    [theme.breakpoints.down('md')]: {
      width: '175px',
      fontSize: '15px',
    },
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
    <UserSearchContainer onClick={copyEmail}>
      {/* <ChangeModal
        isModalOpened={open}
        handleClose={handleClose}
        product={product}
        searchValue={searchValue}
      /> */}
      <InfoUserContainer>
        <Typography variant="roboto20200" sx={spanStyle}>
          {`${userName} ${userSurname}`}
        </Typography>
        <Typography variant="roboto16400" color={Colors.primary} sx={spanStyle}>
          {userEmail}
        </Typography>
        {/* <UserSearchButtonBox> */}
        {/* <DeleteButton
            onClick={async () => {
              await dispatch(
                deleteProduct({ productId: product.id, searchValue })
                );
              }}
              >
              {t('remove')}
              Delete
              </DeleteButton>
            </UserSearchButtonBox> */}
      </InfoUserContainer>
      <Typography
        variant="roboto16400"
        sx={{ ...spanStyle, color: Colors.darkGray }}
      >
        {t('click-to-copy')}
      </Typography>
    </UserSearchContainer>
  );
};

export default UserSearch;

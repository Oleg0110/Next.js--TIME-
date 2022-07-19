import React from 'react';
import { Divider, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/services/UserService';
import { AuthBox, FormAuthButtonPosition } from '../../styles/accountMenu';
import { Colors } from '../../styles/theme';
import Link from 'next/link';
import CustomButton from '../CustomButton';
import { clearFavorite } from '../../store/reducers/ProductSlice';

const AuthMenu = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  return (
    <AuthBox>
      <Typography
        variant="roboto20400"
        color={Colors.black}
        sx={{ width: '100%', textAlign: 'start', marginLeft: '30px' }}
      >
        {`${user.name} ${user.surname}`}
      </Typography>
      <Divider sx={{ borderColor: Colors.primary, width: '100%' }} />
      <Link href={'/personal-office'}>
        <Typography
          variant="roboto16200"
          sx={{
            width: '100%',
            textAlign: 'start',
            margin: '10px 0px',
            padding: '5px',
            color: Colors.darkGray,
            cursor: 'pointer',
            ':hover': {
              background: Colors.primary,
              color: Colors.secondaryWhite,
            },
          }}
        >
          Personal office
        </Typography>
      </Link>
      <FormAuthButtonPosition>
        <CustomButton
          size="SM"
          variant="secondary"
          type="submit"
          style={{ marginBottom: '10px' }}
          onClick={async () => {
            await dispatch(logout());
            await dispatch(clearFavorite([]));
          }}
        >
          {t('logout')}
        </CustomButton>
      </FormAuthButtonPosition>
    </AuthBox>
  );
};

export default AuthMenu;

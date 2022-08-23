import React from 'react';
import { CircularProgress, Divider, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/services/UserService';
import { AuthBox, FormAuthButtonPosition } from '../../styles/accountMenu';
import { Colors } from '../../styles/theme';
import { clearFavorite } from '../../store/reducers/ProductSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import CustomButton from '../CustomButton';

const AuthMenu = () => {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, isLoading } = useAppSelector((state) => state.user);

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
            width: '95%',
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
        {isLoading ? (
          <CircularProgress
            sx={{ color: Colors.primary, margin: '11px' }}
            disableShrink
            size="25px"
          />
        ) : (
          <CustomButton
            size="SM"
            variant="secondary"
            type="submit"
            style={{ marginBottom: '10px' }}
            onClick={async () => {
              const res = await dispatch(logout());

              if (res.meta.requestStatus === 'rejected') {
                toast.error('Error, please try again');
              } else {
                toast.success('Successfully logout');
                await dispatch(clearFavorite([]));
                router.push('/');
              }
            }}
          >
            {t('logout')}
          </CustomButton>
        )}
      </FormAuthButtonPosition>
    </AuthBox>
  );
};

export default AuthMenu;

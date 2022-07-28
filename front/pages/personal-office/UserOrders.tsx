import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getOrders } from '../../store/services/UserService';
import {
  UserOrdersBox,
  UserOrdersScrollBox,
  UserProductsOrdersBox,
} from '../../styles/personalOffice';
import { Colors } from '../../styles/theme';
import CustomButton from '../../components/CustomButton';
import UserOrderAccordion from '../../components/UserOrderAccordion';

const UserOrders = () => {
  const { t } = useTranslation('office');

  const dispatch = useAppDispatch();

  const { user, userOrders, isOrdersLoading } = useAppSelector(
    (state) => state.user
  );

  return (
    <UserOrdersBox>
      <Typography
        variant="roboto20200"
        sx={{
          color: Colors.secondaryWhite,
          textAlign: 'start',
          width: '100%',
        }}
      >
        {t('orders')}
      </Typography>
      {userOrders[0] && (
        <UserProductsOrdersBox>
          <UserOrdersScrollBox>
            {userOrders.map((data) => (
              <div key={data.id}>
                <UserOrderAccordion orderData={data} />
              </div>
            ))}
          </UserOrdersScrollBox>
        </UserProductsOrdersBox>
      )}
      {!userOrders[0] &&
        (isOrdersLoading ? (
          <CircularProgress
            sx={{ color: Colors.secondaryWhite, margin: '15px' }}
            disableShrink
            size="25px"
          />
        ) : (
          <CustomButton
            size="SM"
            variant="secondary"
            style={{ fontSize: '22px', margin: '10px' }}
            onClick={async () => await dispatch(getOrders(user.id))}
          >
            {t('add-all-Orders')}
          </CustomButton>
        ))}
    </UserOrdersBox>
  );
};

export default UserOrders;

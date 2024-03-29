import React from 'react';
import {
  AdminPageBadge,
  IconsContainerDesktop,
  IconsContainerMobile,
} from '../../styles/navBar';
import { useMediaQuery } from '@mui/material';
import { ROUTES } from '../../utils/constants';
import { useAppSelector } from '../../hooks/redux';
import ShopFavorBag from '../ShopFavorBag';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import AccountMenu from '../AccountMenu';
import theme from '../../styles/theme';
import styles from '../../styles/icons.module.scss';
import Link from 'next/link';
import GlobalProductSearch from '../GlobalProductSearch';

const IconButtons = () => {
  const { ordersUnconfirmed } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);

  const mediaMD = useMediaQuery(theme.breakpoints.down('md'));

  const Component = mediaMD ? IconsContainerMobile : IconsContainerDesktop;

  const isAllow =
    (user && user.userRole === 'admin') || (user && user.userRole === 'owner');

  return (
    <>
      {isAllow && (
        <TooltipIcon title="admin-page">
          <Link href={ROUTES.adminPage}>
            <AdminPageBadge
              badgeContent={ordersUnconfirmed.length}
              color="error"
            >
              <div className={styles.settings} />
            </AdminPageBadge>
          </Link>
        </TooltipIcon>
      )}
      {/* <TooltipIcon title="search">
        <div className={styles.search} />
      </TooltipIcon> */}
      <GlobalProductSearch />
      <Component>
        <ShopFavorBag who="bag" />
        <AccountMenu />
        <ShopFavorBag who="favorite" />
      </Component>
    </>
  );
};

export default IconButtons;

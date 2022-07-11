import React from 'react';
import {
  IconsContainerDesktop,
  IconsContainerMobile,
} from '../../styles/navBar';
import { useMediaQuery } from '@mui/material';
import { ROUTES } from '../../utils/constants';
import ShopFavorBag from '../ShopFavorBag';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import AccountMenu from '../AccountMenu';
import theme from '../../styles/theme';
import styles from '../../styles/icons.module.scss';
import Link from 'next/link';

const IconButtons = () => {
  const media = useMediaQuery(theme.breakpoints.down('md'));

  const Component = media ? IconsContainerMobile : IconsContainerDesktop;

  return (
    <>
      <TooltipIcon title="admin-page">
        <Link href={ROUTES.adminPage}>
          <div className={styles.settings} />
        </Link>
      </TooltipIcon>
      <TooltipIcon title="search">
        <div className={styles.search} />
      </TooltipIcon>
      <Component>
        <ShopFavorBag who="bag" />
        <AccountMenu />
        <ShopFavorBag who="favorite" />
      </Component>
    </>
  );
};

export default IconButtons;

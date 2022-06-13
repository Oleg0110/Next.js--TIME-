import React from 'react';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import {
  IconsContainerDesktop,
  IconsContainerMobile,
} from '../../styles/navBar';
import AccountMenu from '../AccountMenu';
import { useMediaQuery } from '@mui/material';
import ShopFavorCart from '../ShopFavorCart';
import theme from '../../styles/theme';
import styles from '../../styles/icons.module.scss';

const IconButtons = () => {
  const media = useMediaQuery(theme.breakpoints.down('md'));

  const Component = media ? IconsContainerMobile : IconsContainerDesktop;

  return (
    <>
      <TooltipIcon title="search">
        <div className={styles.search} />
      </TooltipIcon>
      <Component>
        <ShopFavorCart who="cart" />
        <AccountMenu />
        <ShopFavorCart who="favorite" />
      </Component>
    </>
  );
};

export default IconButtons;

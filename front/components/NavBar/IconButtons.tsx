import React, { useState } from 'react';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import { Icons } from '../../styles/navBar';
import ShoppingCart from '../ShoppingCart';
import { Drawer } from '@mui/material';

const IconButtons = () => {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenFavorites, setIsOpenFavorites] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const openFunc = (set, is) => {
    switch (is) {
      case 'Favorites':
        set(!isOpenFavorites);
        setIsOpenSearch(false);
        setIsOpenCart(false);
        setIsOpenAccount(false);
        break;
      case 'Account':
        set(!isOpenAccount);
        setIsOpenSearch(false);
        setIsOpenCart(false);
        setIsOpenFavorites(false);
        break;
      case 'Cart':
        set(!isOpenCart);
        setIsOpenSearch(false);
        setIsOpenAccount(false);
        setIsOpenFavorites(false);
        break;
      case 'Search':
        set(!isOpenSearch);
        setIsOpenCart(false);
        setIsOpenAccount(false);
        setIsOpenFavorites(false);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <TooltipIcon
        title="search"
        onClick={() => openFunc(setIsOpenSearch, 'Search')}
      >
        <div className={styles.search} />
      </TooltipIcon>
      <Icons>
        <TooltipIcon
          title="shopping-cart"
          onClick={() => openFunc(setIsOpenCart, 'Cart')}
        >
          {isOpenCart ? (
            <div className={styles.bagHeaderFilled} />
          ) : (
            <div className={styles.bagHeader} />
          )}
        </TooltipIcon>
        <TooltipIcon
          title="your-account"
          onClick={() => openFunc(setIsOpenAccount, 'Account')}
        >
          {isOpenAccount ? (
            <div className={styles.personFilled} />
          ) : (
            <div className={styles.person} />
          )}
        </TooltipIcon>
        <TooltipIcon
          title="favorites"
          onClick={() => openFunc(setIsOpenFavorites, 'Favorites')}
        >
          {isOpenFavorites ? (
            <div className={styles.likeHeaderFilled} />
          ) : (
            <div className={styles.likeHeader} />
          )}
        </TooltipIcon>
      </Icons>
      <ShoppingCart isCartOpened={isOpenCart} setIsCartOpened={setIsOpenCart} />
    </>
  );
};

export default IconButtons;

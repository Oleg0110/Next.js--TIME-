import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/NavBar/index';
import Footer from '../components/Footer';
import {
  MainContentBox,
  MainNavBarContainer,
  MainFooterContainer,
} from '../styles/global';
import { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IProductInBag } from '../utils/interface/productInterface';
import { setProductInShoppingBag } from '../store/reducers/ProductSlice';
import { shoppingBagDataName, token } from '../utils/constants';
import {
  getFavorite,
  getUnconfirmedOrders,
} from '../store/services/ProductService';
import { checkAuth } from '../store/services/UserService';
import { AuthResponse } from '../utils/interface/userInterface';

interface MainLayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children?: any;
}

const MainLayout: NextPage<MainLayoutProps> = ({
  children,
  title = 'shoe store',
  keywords = 'shoe, shop, buy, style, fashion. clothing',
  description,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { productsFavorite } = useAppSelector((state) => state.product);

  useEffect(() => {
    const asyncFunc = async () => {
      const arr: IProductInBag[] =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

      const isAuth: string = localStorage.getItem(token);

      !!isAuth && (await dispatch(checkAuth()));

      await dispatch(setProductInShoppingBag(arr));
      // console.log(user);

      // user &&
      //   productsFavorite[0] === undefined &&
      //   (await dispatch(getFavorite(user.id)));
      // console.log(user);
      if ((user && user.userRole === 'admin') || user.userRole === 'owner') {
        await dispatch(getUnconfirmedOrders());
      }

      // if (user && productsFavorite[0] === undefined) {
      //   await dispatch(getFavorite(user.id));
      // }

      // ((await user) && user.userRole === 'admin') ||
      //   ((await user) &&
      //     user.userRole === 'owner' &&
      //     (await dispatch(getUnconfirmedOrders())));
    };

    asyncFunc();
  }, [dispatch, productsFavorite, getFavorite]);

  const getFavoriteProduct = async () => {
    user &&
      productsFavorite[0] === undefined &&
      (await dispatch(getFavorite(user.id)));
    (user && user.userRole === 'admin') ||
      (user.userRole === 'owner' && (await dispatch(getUnconfirmedOrders())));
  };

  // getFavoriteProduct();

  return (
    <>
      <Head>
        <title>TIME - {title}</title>
        <meta
          name="description"
          content={`Shoe store. Anybody can buy some shoe here. ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/heart-icon.ico" />
      </Head>
      <MainNavBarContainer>
        <Navbar />
      </MainNavBarContainer>
      <MainContentBox>{children}</MainContentBox>
      <MainFooterContainer>
        <Footer />
      </MainFooterContainer>
    </>
  );
};

export default MainLayout;

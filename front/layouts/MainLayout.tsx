import React, { useEffect } from 'react';
import {
  MainContentBox,
  MainNavBarContainer,
  MainFooterContainer,
} from '../styles/global';
import { NextPage } from 'next';
import { useAppDispatch } from '../hooks/redux';
import { IProductInBag } from '../utils/interface/productInterface';
import { setProductInShoppingBag } from '../store/reducers/ProductSlice';
import { shoppingBagDataName, tokenLocalStorageName } from '../utils/constants';
import { checkAuth } from '../store/services/UserService';
import { getFavoriteAndOrders } from '../utils/function';
import Head from 'next/head';
import Navbar from '../components/NavBar/index';
import Footer from '../components/Footer';

interface MainLayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children?: React.ReactNode;
}

const MainLayout: NextPage<MainLayoutProps> = ({
  children,
  title,
  keywords,
  description,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getFavoriteAndOrders(dispatch);
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      const arr: IProductInBag[] =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

      const isAuth: string = localStorage.getItem(tokenLocalStorageName);

      !!isAuth && (await dispatch(checkAuth()));

      await dispatch(setProductInShoppingBag(arr));
    };

    asyncFunc();
  }, []);

  return (
    <>
      <Head>
        <title>
          {(title && `TIME - shoe store - ${title}`) || 'TIME - shoe store'}
        </title>
        <meta
          name="description"
          content={`Shoe store. Anybody can buy some shoe here. ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`shoe, shop, buy, style, fashion, clothing, ${keywords} `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/high-heels.ico" />
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

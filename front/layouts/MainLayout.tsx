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
import { useAppDispatch } from '../hooks/redux';
import { IProductInBag } from '../utils/interface/productInterface';
import { setProductInShoppingBag } from '../store/reducers/ProductSlice';
import { shoppingBagDataName } from '../utils/constants';

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
  const ISSERVER = typeof window === 'undefined';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ISSERVER) {
      const arr: IProductInBag[] =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

      dispatch(setProductInShoppingBag(arr));
    }
  }, []);

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

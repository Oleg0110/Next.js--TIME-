import React, {
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Container } from '@mui/material';
import Head from 'next/head';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children?: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'TIME',
  keywords = 'shoe, shop, buy, style, fashion. clothing',
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Shoe store. Anybody can buy some shoe here. ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <Container>
        <Navbar title={title} />
        {children}
      </Container>
    </>
  );
};

export default MainLayout;

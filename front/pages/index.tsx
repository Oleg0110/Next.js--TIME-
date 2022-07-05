import MainLayout from '../layouts/MainLayout';
import PhotoBox from '../components/PhotoBox';
import ProductOnPage from '../components/ProductOnPage';
import About from './home/About';
import New from './home/New';
import { InferGetStaticPropsType, NextPage } from 'next';
import { IProduct } from '../utils/interface/productInterface';
import { ProductMainBox } from '../styles/productOnPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Sale from './home/Sale';
import { BASIC_URL } from '../utils/httpLinks';

export const getServerSideProps = async ({ locale }) => {
  const res = await fetch(`${BASIC_URL}`);

  const saleCarouselProduct: IProduct[] = await res.json();

  return {
    props: {
      saleCarouselProduct,
      ...(await serverSideTranslations(locale, [
        'home',
        'common',
        'shopFavorCart',
      ])),
    },
  };
};

const Index = ({
  saleCarouselProduct,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <MainLayout>
      <PhotoBox />
      <About />
      <New />
      <Sale saleCarouselProduct={saleCarouselProduct} />
    </MainLayout>
  );
};

export default Index;

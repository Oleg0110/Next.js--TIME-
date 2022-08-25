import { InferGetStaticPropsType } from 'next';
import { IProduct } from '../utils/interface/productInterface';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BASIC_URL } from '../utils/httpLinks';
import MainLayout from '../layouts/MainLayout';
import PhotoBox from '../components/PhotoBox';
import About from './home/About';
import New from './home/New';
import Sale from './home/Sale';

export const getServerSideProps = async ({ locale }) => {
  const res = await fetch(BASIC_URL);

  const saleCarouselProduct: IProduct[] = await res.json();
  return {
    props: {
      saleCarouselProduct,
      ...(await serverSideTranslations(locale, ['home', 'common'])),
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

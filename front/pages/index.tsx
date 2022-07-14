import MainLayout from '../layouts/MainLayout';
import PhotoBox from '../components/PhotoBox';
import About from './home/About';
import New from './home/New';
import { InferGetStaticPropsType } from 'next';
import { IProduct } from '../utils/interface/productInterface';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Sale from './home/Sale';
import { BASIC_URL } from '../utils/httpLinks';

export const getServerSideProps = async ({ locale }) => {
  const res = await fetch(`${BASIC_URL}`);
  // const da = await fetch(
  //   'https://raw.githubusercontent.com/Adushar/UkraineCitiesAndVillages/main/CitiesAndVillages%20-%2014%20March.json'
  // );
  // const no = await da.json();
  // console.log(no);

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

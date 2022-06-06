import { Button, Typography } from '@mui/material';
import styles from '../styles/da.module.scss';
import MainLayout from '../layouts/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import PhotoBox from '../components/PhotoBox';
import Link from 'next/link';
import { ROUTES } from '../utils/constants';
import {
  AboutBox,
  AboutContentBox,
  AboutLargePhoto,
  AboutPhoto,
  AboutSmallPhoto,
  NewContentBox,
  CategoryPositionBox,
  WomanNewBox,
  ManNewBox,
} from '../styles/home';
import { Colors } from '../styles/theme';
import Image from 'next/image';
import WhiteBox from '../assets/img/home/whiteBox.jpg';
import TimeLogoGif from '../assets/img/home/timeLogoGif.gif';
import WhitePackage from '../assets/img/home/whitePackage.jpg';
import Woman from '../assets/img/home/woman.png';
import Man from '../assets/img/home/man.png';

const Index = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <PhotoBox />
      <AboutContentBox>
        <AboutBox>
          <Link href={ROUTES.aboutUs}>
            <Typography variant="h1" color={Colors.black}>
              {/* {t('home.home')} */}
              About us
            </Typography>
          </Link>
          <Typography
            variant="roboto24200"
            component="p"
            color={Colors.black}
            marginBottom="20px"
          >
            Behind the name and history of the brand is an international team
            with its own design office, which since 2010 uses the experience and
            inspiration of experts in the fashion industry, supporting the
            desire of everyone to express themselves. Therefore, the opinion of
            Antonio Biaggi is trusted, and his style and image are imitated. A
            distinctive feature of the brand is the creation of shoe collections
            that embody the fashion trends of the catwalks of Milan, Paris,
            Tokyo, New York and London, and at the same time suitable for the
            usual routes of the big city. In each collection there are more than
            700 items of shoes, designer models of bags, wallets and other
            accessories
          </Typography>
          <Button style={{ fontSize: '40px' }}>More</Button>
        </AboutBox>
        <AboutPhoto>
          <AboutSmallPhoto>
            <Image src={WhiteBox} width="310px" height="328px" />
            <Image src={TimeLogoGif} width="310px" height="259px" />
          </AboutSmallPhoto>
          <AboutLargePhoto>
            <Image src={WhitePackage} width="419px" height="605px" />
          </AboutLargePhoto>
        </AboutPhoto>
      </AboutContentBox>
      <NewContentBox>
        <Link href={ROUTES.aboutUs}>
          <Typography variant="h1" color={Colors.black}>
            {/* {t('home.home')} */}
            NEW
          </Typography>
        </Link>
        <CategoryPositionBox>
          <WomanNewBox>
            <Image src={Woman} width="570px" height="770px" />
            <Button style={{ fontSize: '40px', paddingTop: '30px' }}>
              Woman
            </Button>
          </WomanNewBox>
          <ManNewBox>
            <Image src={Man} width="570px" height="770px" />
            <Button style={{ fontSize: '40px', paddingTop: '30px' }}>
              Man
            </Button>
          </ManNewBox>
        </CategoryPositionBox>
      </NewContentBox>
      <Link href={ROUTES.aboutUs}>
        <Typography variant="h1" color={Colors.black}>
          {/* {t('home.home')} */}
          SALE
        </Typography>
      </Link>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
});

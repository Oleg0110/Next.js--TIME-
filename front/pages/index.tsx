import { Button, Typography } from '@mui/material';
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
  ImageOpacity,
  AboutMainBox,
  SmallPhotoBox,
  NewMainBox,
} from '../styles/home';
import { Colors } from '../styles/theme';
import Image from 'next/image';
import WhiteBox from '../assets/img/home/whiteBox.jpg';
import TimeLogoGif from '../assets/img/home/timeLogoGif.gif';
import WhitePackage from '../assets/img/home/whitePackage.jpg';
import Woman from '../assets/img/home/woman.png';
import Man from '../assets/img/home/man.png';
import CustomButton from '../components/Button';
import ProductInCart from '../components/ProductInCart';

const Index = () => {
  const { t } = useTranslation('home');

  return (
    <MainLayout>
      <PhotoBox />
      <AboutMainBox>
        <AboutContentBox>
          <AboutBox>
            <Typography variant="h1" color={Colors.black}>
              {t('about')}
            </Typography>
            <Typography
              variant="roboto24200"
              component="p"
              color={Colors.black}
              marginBottom="20px"
            >
              {t('about-text')}
            </Typography>
            <Link href={ROUTES.aboutUs}>
              <a>
                <CustomButton
                  isIcon={true}
                  style={{ marginTop: '30px' }}
                  size="LG"
                >
                  <Typography variant="inherit" color="inherit">
                    {t('about-more')}
                  </Typography>
                </CustomButton>
              </a>
            </Link>
          </AboutBox>
          <AboutPhoto>
            <AboutSmallPhoto>
              <SmallPhotoBox>
                <Image src={WhiteBox} width="290px" height="310px" />
              </SmallPhotoBox>
              <SmallPhotoBox>
                <Image src={TimeLogoGif} width="290px" height="240px" />
              </SmallPhotoBox>
            </AboutSmallPhoto>
            <AboutLargePhoto>
              <Image src={WhitePackage} width="330px" height="480px" />
            </AboutLargePhoto>
          </AboutPhoto>
        </AboutContentBox>
      </AboutMainBox>
      <NewMainBox>
        <NewContentBox>
          <Typography variant="h1" color={Colors.black}>
            {t('new')}
          </Typography>
          <CategoryPositionBox>
            <WomanNewBox>
              <Link href={`${ROUTES.new}${ROUTES.women}`}>
                <a>
                  <ImageOpacity>
                    <Image src={Woman} width="370px" height="570px" />
                  </ImageOpacity>
                </a>
              </Link>
              <CustomButton style={{ marginTop: '30px' }} size="LG">
                <Link href={`${ROUTES.new}${ROUTES.women}`}>
                  <Typography variant="inherit" color="inherit">
                    {t('women')}
                  </Typography>
                </Link>
              </CustomButton>
            </WomanNewBox>
            <ManNewBox>
              <Link href={`${ROUTES.new}${ROUTES.men}`}>
                <a>
                  <ImageOpacity>
                    <Image src={Man} width="370px" height="570px" />
                  </ImageOpacity>
                </a>
              </Link>
              <CustomButton style={{ marginTop: '30px' }} size="LG">
                <Link href={`${ROUTES.new}${ROUTES.men}`}>
                  <Typography variant="inherit" color="inherit">
                    {t('men')}
                  </Typography>
                </Link>
              </CustomButton>
            </ManNewBox>
          </CategoryPositionBox>
        </NewContentBox>
      </NewMainBox>
      <Typography variant="h1" color={Colors.black}>
        {t('sale')}
      </Typography>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'home',
      'common',
      'shopFavorCart',
    ])),
  },
});

import React from 'react';
import Link from 'next/link';
import CustomButton from '../../components/CustomButton';
import Image from 'next/image';
import WhiteBox from '../../assets/img/home/whiteBox.jpg';
import TimeLogoGif from '../../assets/img/home/timeLogoGif.gif';
import WhitePackage from '../../assets/img/home/whitePackage.jpg';
import { Typography } from '@mui/material';
import {
  AboutMainBox,
  AboutContentBox,
  AboutBox,
  AboutPhoto,
  AboutSmallPhoto,
  SmallPhotoBox,
  AboutLargePhoto,
} from '../../styles/home';
import { Colors } from '../../styles/theme';
import { ROUTES } from '../../utils/constants';
import { useTranslation } from 'next-i18next';

const About = () => {
  const { t } = useTranslation('home');
  return (
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
  );
};

export default About;

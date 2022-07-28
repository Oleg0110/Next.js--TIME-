import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  AboutUsContainer,
  AboutUsContentBox,
  CleanPhotoBox,
  DetailsBox,
  MakePhotoBox,
  SinceBox,
} from '../../styles/aboutUs';
import { Colors } from '../../styles/theme';
import Image from 'next/image';
import MainLayout from '../../layouts/MainLayout';
import CleanShoe from '../../assets/img/about/cleanShoe.png';
import MakeShoe from '../../assets/img/about/makeShoe.png';

const AboutUs = () => {
  const { t } = useTranslation('about');

  return (
    <MainLayout title="About Us" keywords="about us, about company">
      <AboutUsContainer>
        <AboutUsContentBox>
          <SinceBox>
            <MakePhotoBox>
              <Image src={MakeShoe} width="400px" height="550px" />
            </MakePhotoBox>
            <Typography variant="roboto30200" margin="10px 0px 10px 0px">
              {t('since-paragraph')}
            </Typography>
            <Typography variant="roboto30200" marginBottom="10px">
              {t('ideal-paragraph')}
            </Typography>
            <Typography variant="roboto30200" marginBottom="10px">
              {t('identita-paragraph')}
            </Typography>
            <Typography variant="roboto30200">{t('goal-paragraph')}</Typography>
          </SinceBox>
          <DetailsBox>
            <Typography
              variant="h1"
              color={Colors.secondaryWhite}
              marginBottom="25px"
            >
              {t('about-us')}
            </Typography>
            <Typography variant="roboto30200" marginBottom="10px">
              {t('details-paragraph')}
            </Typography>
            <Typography variant="roboto30200">
              {t('answer-paragraph')}
            </Typography>
            <CleanPhotoBox>
              <Image src={CleanShoe} width="450px" height="700px" />
            </CleanPhotoBox>
          </DetailsBox>
        </AboutUsContentBox>
      </AboutUsContainer>
    </MainLayout>
  );
};

export default AboutUs;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['about', 'common'])),
  },
});

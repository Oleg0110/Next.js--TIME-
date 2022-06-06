// import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  AboutUsContainer,
  AboutUsContentBox,
  CleanPhotoBox,
  DetailsBox,
  MakePhotoBox,
  SinceBox,
} from '../../styles/aboutUs';
import CleanShoe from '../../assets/img/about/cleanShoe.png';
import MakeShoe from '../../assets/img/about/makeShoe.png';
import { Colors } from '../../styles/theme';

const AboutUs = () => {
  const { t } = useTranslation('common');

  return (
    <MainLayout title="About Us" keywords="about us, about company">
      <AboutUsContainer>
        <AboutUsContentBox>
          <SinceBox>
            <MakePhotoBox>
              <Image src={MakeShoe} width="400px" height="550px" />
            </MakePhotoBox>
            <Typography variant="roboto30200" margin="10px 0px 10px 0px">
              Since 2010, this passion has been the leitmotif of our company,
              making a sincere and passionate contribution to the world of
              fashion with a line of high-heeled shoes that can pay tribute to
              women in their diversity, allowing everyone to express themselves
              with their individuality. .
            </Typography>
            <Typography variant="roboto30200" marginBottom="10px">
              The ideal and artistic avant-garde does not abandon the tradition
              of craftsmanship, where each decoration is embroidered exclusively
              by hand. In addition, almost obsessive research of materials,
              accurate and punctual choice of models and careful attention to
              detail make our company unique in the global market.
            </Typography>
            <Typography variant="roboto30200" marginBottom="10px">
              Identità Srl boasts a well-structured reality in graphics, design,
              translation, IT, customer service, marketing and sales. Stylists
              and productions are ordered in several regions throughout the
              country. Orders are shipped from Identità Srl warehouses worldwide
              in carefully prepared packaging, with a certificate of
              authenticity, designation of origin, dust collector, box and outer
              packaging with the Maison logo, designed for EXPRESS shipments
              with delivery within 24 working days. hours for Italy and 2/4
              working days for any other destination in the world.
            </Typography>
            <Typography variant="roboto30200">
              The goal we pursue is to turn the hidden desires in every woman's
              heart into reality, and this is what makes each of our shoes a
              unique experience of style and luxury.
            </Typography>
          </SinceBox>
          <DetailsBox>
            <Typography
              variant="h1"
              color={Colors.secondaryWhite}
              marginBottom="25px"
            >
              {/* {t('new')} */}
              About Us
            </Typography>
            <Typography variant="roboto30200" marginBottom="10px">
              DETAILS Identità's works are true works of art that can be worn,
              the perfect result of a balance between creativity, sophisticated
              design and experience, proudly Made in Italy.
            </Typography>
            <Typography variant="roboto30200">
              The answer we found in looking at the past of our work and the
              origins of our company is contained in a quote from Balthasar
              Graciano: "Passion paints everything it touches with its paints."
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
    ...(await serverSideTranslations(locale, ['about-us', 'common'])),
  },
});

import Link from 'next/link';
import Information from './Information';
import Catalog from './Catalog';
import IconsField from './IconsField';
import Contacts from './Contacts';
import {
  InformBox,
  MainFooterBox,
  MediaBox,
  NameBox,
} from '../../styles/footer/index';
import { Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Footer = () => {
  return (
    <MainFooterBox>
      <NameBox>
        <Link href={'/'}>
          <Typography variant="title">TIME</Typography>
        </Link>
      </NameBox>
      <MediaBox>
        <InformBox>
          <Information />
        </InformBox>
        <InformBox>
          <Catalog />
        </InformBox>
        <InformBox>
          <Contacts />
        </InformBox>
      </MediaBox>
      <IconsField />
    </MainFooterBox>
  );
};

export default Footer;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

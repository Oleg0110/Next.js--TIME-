import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  BurgerBox,
  CommunicationBox,
  IconsBox,
  LinkBox,
  MainNavBarBox,
  TitleBox,
} from '../../styles/navBar';
import { BUTTONS } from '../../utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Drawer, Typography } from '@mui/material';
import Link from 'next/link';
import IconButtons from './IconButtons';
import Communication from './Communication';
import SwipeableTemporaryDrawer from '../Drawer';
import styles from '../../styles/icons.module.scss';

const NavbarDesktop = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <MainNavBarBox>
      <TitleBox>
        <BurgerBox>
          <SwipeableTemporaryDrawer />
        </BurgerBox>
        <CommunicationBox>
          <Communication />
        </CommunicationBox>
        <Link href={'/'}>
          <Typography variant="title">TIME</Typography>
        </Link>
        <IconsBox>
          <IconButtons />
        </IconsBox>
      </TitleBox>
      <LinkBox>
        {BUTTONS.map((data) => (
          <Link key={data.id} href={data.link}>
            <Typography variant="h2">{t(data.name)}</Typography>
          </Link>
        ))}
      </LinkBox>
    </MainNavBarBox>
  );
};

export default NavbarDesktop;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

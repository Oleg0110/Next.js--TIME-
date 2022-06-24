import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  BurgerBox,
  CommunicationBox,
  IconsBox,
  LinkBox,
  LinkNavBarContainer,
  MainNavBarBox,
  TitleBox,
} from '../../styles/navBar';
import { BUTTONS } from '../../utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Typography } from '@mui/material';
import Link from 'next/link';
import IconButtons from './IconButtons';
import Communication from './Communication';
import SwipeableTemporaryDrawer from '../Drawer';
import styles from '../../styles/icons.module.scss';

const NavbarDesktop = () => {
  // const router = useRouter();
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
          <Typography variant="title" sx={{ marginLeft: '50px' }}>
            TIME
          </Typography>
        </Link>
        <IconsBox>
          <IconButtons />
        </IconsBox>
      </TitleBox>
      <LinkNavBarContainer>
        <LinkBox>
          {BUTTONS.map((data) => (
            <Link key={data.id} href={data.link}>
              <Typography variant="h2">{t(data.name)}</Typography>
            </Link>
          ))}
        </LinkBox>
      </LinkNavBarContainer>
    </MainNavBarBox>
  );
};

export default NavbarDesktop;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

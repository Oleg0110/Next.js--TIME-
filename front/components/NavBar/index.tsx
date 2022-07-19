import { useTranslation } from 'next-i18next';
import {
  BurgerBox,
  CommunicationBox,
  HoverNavbar,
  HoverNavbarCollapse,
  IconsBox,
  LinkBox,
  LinkNavBarContainer,
  MainNavBarBox,
  TitleBox,
} from '../../styles/navBar';
import { BUTTONS } from '../../utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  ClickAwayListener,
  Collapse,
  Popover,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import IconButtons from './IconButtons';
import Communication from './Communication';
import SwipeableTemporaryDrawer from '../Drawer';
import styles from '../../styles/icons.module.scss';
import { useState } from 'react';

const Navbar = () => {
  const { t } = useTranslation('common');
  const [show, setShow] = useState('empty');

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
            <div
              key={data.id}
              onMouseOut={() => setShow('empty')}
              onMouseOver={() => data.hoverBlock && setShow(data.name)}
            >
              {data.link ? (
                <Link href={data.link}>
                  <Typography variant="h2">{t(data.name)}</Typography>
                </Link>
              ) : (
                <Typography variant="h2">{t(data.name)}</Typography>
              )}
              {data.buttonsHoverArr && (
                <HoverNavbarCollapse in={show === data.name}>
                  <HoverNavbar>
                    {data.buttonsHoverArr.map((data) => (
                      <Link key={data.id} href={data.link}>
                        <Typography
                          onClick={() => setShow('empty')}
                          variant="roboto24200hover"
                          sx={{ width: '140px' }}
                        >
                          {data.name}
                        </Typography>
                      </Link>
                    ))}
                  </HoverNavbar>
                </HoverNavbarCollapse>
              )}
            </div>
          ))}
        </LinkBox>
      </LinkNavBarContainer>
    </MainNavBarBox>
  );
};

export default Navbar;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

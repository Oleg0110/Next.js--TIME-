import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
  Tooltip,
} from '@mui/material';
import { BUTTONS } from '../../utils/constants';
import { useTranslation } from 'next-i18next';
import Communication from '../NavBar/Communication';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/icons.module.scss';
import { CommunicationMenuBox } from '../../styles/navBar';

type Anchor = 'left';

const SwipeableTemporaryDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState({
    left: false,
  });

  const { t } = useTranslation('common');

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsMenuOpen({ ...isMenuOpen, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      role="presentation"
      sx={{
        width: anchor === 'left' ? 'auto' : 250,
      }}
    >
      <CommunicationMenuBox>
        <Communication />
      </CommunicationMenuBox>
      <List>
        {BUTTONS.map((data) => (
          <>
            {/* <Link key={data.id} href={data.link}>
              <ListItem disablePadding>
                <ListItemButton>{t(data.name)}</ListItemButton>
              </ListItem>
            </Link> */}
            //!! Problem
            {data.link !== undefined ? (
              <Link href={data.link}>
                <ListItemButton>{t(data.name)}</ListItemButton>
              </Link>
            ) : (
              <ListItemButton>{t(data.name)}</ListItemButton>
            )}
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Tooltip title="Menu" onClick={toggleDrawer('left', true)}>
        <IconButton>
          <div className={styles.burgerMenu} />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer
        anchor={'left'}
        open={isMenuOpen['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </>
  );
};

export default SwipeableTemporaryDrawer;

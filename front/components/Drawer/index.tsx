import {
  Box,
  Collapse,
  IconButton,
  List,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from '@mui/material';
import { BUTTONS } from '../../utils/constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { CommunicationMenuBox, HoverNavbar } from '../../styles/navBar';
import { Colors } from '../../styles/theme';
import Communication from '../NavBar/Communication';
import styles from '../../styles/icons.module.scss';

type Anchor = 'left';

const SwipeableTemporaryDrawer = () => {
  const { t } = useTranslation('common');

  const [isMenuOpen, setIsMenuOpen] = useState({
    left: false,
  });
  const [show, setShow] = useState('empty');

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
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      role="presentation"
      sx={{
        width: anchor === 'left' ? 'auto' : 250,
      }}
    >
      <CommunicationMenuBox>
        <Communication />
      </CommunicationMenuBox>
      <List sx={{ padding: '0px 15px' }}>
        {BUTTONS.map((data) => (
          <Box
            key={data.id}
            onClick={() =>
              show === 'new' || show === 'sale'
                ? setShow('empty')
                : setShow(data.name)
            }
            sx={{ margin: '10px 0px' }}
          >
            {data.link ? (
              <Link href={data.link}>
                <Typography onClick={toggleDrawer(anchor, false)} variant="h2">
                  {t(data.name)}
                </Typography>
              </Link>
            ) : (
              <Typography variant="h2">{t(data.name)}</Typography>
            )}
            {data.buttonsHoverArr && (
              <Collapse in={show === data.name}>
                <HoverNavbar>
                  {data.buttonsHoverArr.map((data) => (
                    <Link key={data.id} href={data.link}>
                      <Typography
                        onClick={toggleDrawer(anchor, false)}
                        variant="roboto20200"
                        sx={{
                          width: '140px',
                          cursor: 'pointer',
                          ':hover': {
                            color: Colors.darkGray,
                          },
                        }}
                      >
                        {data.name}
                      </Typography>
                    </Link>
                  ))}
                </HoverNavbar>
              </Collapse>
            )}
          </Box>
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

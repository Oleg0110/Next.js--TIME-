import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import AccountMenuModal from '../AccountMenuModal';
import {
  ButtonAccountMenuBox,
  ButtonAccountMenuStyle,
} from '../../styles/accountMenu';
import { NextPage } from 'next';
import { useAppSelector } from '../../hooks/redux';
import Entry from './Entry';
import Registration from './Registration';
import AuthMenu from './AuthMenu';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';

const AccountMenu: NextPage = ({}) => {
  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');

  const { isAuth } = useAppSelector((state) => state.user);

  const [isEntry, setIsEntry] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <TooltipIcon title="your-account" onClick={handleClick}>
          {open ? (
            <div className={styles.personFilled} />
          ) : (
            <div className={styles.person} />
          )}
        </TooltipIcon>
      </Box>
      {media ? (
        <AccountMenuModal isModalOpened={open} handleClose={handleClose} />
      ) : (
        <>
          <Menu
            variant="menu"
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            disableScrollLock={true}
            sx={
              isAuth
                ? {
                    overflow: 'none',
                    '& .scss-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper ':
                      {
                        minWidth: '220px',
                      },
                  }
                : {
                    overflow: 'none',
                    '& .scss-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper ':
                      {
                        minWidth: '340px',
                      },
                  }
            }
          >
            {isAuth && <AuthMenu />}
            {!isAuth && (
              <div>
                <ButtonAccountMenuBox>
                  <ButtonAccountMenuStyle
                    onClick={(e) => {
                      setIsEntry(true);
                      e.stopPropagation();
                    }}
                    sx={
                      isEntry && {
                        color: Colors.primary,
                        borderBottom: `3px solid ${Colors.primary}`,
                      }
                    }
                  >
                    {t('entry')}
                  </ButtonAccountMenuStyle>
                  <ButtonAccountMenuStyle
                    onClick={(e) => {
                      setIsEntry(false);
                      e.stopPropagation();
                    }}
                    sx={
                      !isEntry && {
                        color: Colors.primary,
                        borderBottom: `3px solid ${Colors.primary}`,
                      }
                    }
                  >
                    {t('registration')}
                  </ButtonAccountMenuStyle>
                </ButtonAccountMenuBox>
                {isEntry ? <Entry /> : <Registration />}
              </div>
            )}
          </Menu>
        </>
      )}
    </>
  );
};

export default AccountMenu;

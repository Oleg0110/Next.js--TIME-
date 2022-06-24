import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import theme, { Colors } from '../../styles/theme';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import { Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import AccountMenuModal from '../AccountMenuModal';
import {
  ButtonAccountMenuBox,
  ButtonAccountMenuStyle,
  InputsAccountMenuBox,
} from '../../styles/accountMenu';
import CustomButton from '../CustomButton';
import { NextPage } from 'next';

const AccountMenu: NextPage = ({}) => {
  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');

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
            onClick={handleClose}
            disableScrollLock={true}
          >
            {/* <MenuItem>
          <Avatar>M</Avatar>
          <Typography
            marginLeft="5px"
            variant="roboto20400"
            color={Colors.black}
          >
            {t('profile')}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" style={{ color: `${Colors.primary}` }} />
          </ListItemIcon>
          {t('logout')}
        </MenuItem> */}
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
            {isEntry ? (
              <InputsAccountMenuBox>
                <Typography variant="roboto36400" color={Colors.primary}>
                  {t('loginToUpper')}
                </Typography>
                <label htmlFor="email"></label>
                <input type="email" />
                <CustomButton size="LG" variant="secondary">
                  {t('login')}
                </CustomButton>
              </InputsAccountMenuBox>
            ) : (
              <InputsAccountMenuBox>
                <Typography variant="roboto36400" color={Colors.primary}>
                  {t('registration')}
                </Typography>
                <label htmlFor="password"></label>
                <input type="password" id="password" />
                <CustomButton size="LG" variant="secondary">
                  {t('registration')}
                </CustomButton>
              </InputsAccountMenuBox>
            )}
            {/* <MenuItem>
              <ListItemIcon>
                <LoginIcon
                  fontSize="small"
                  style={{ color: `${Colors.primary}` }}
                />
              </ListItemIcon>
              <Typography variant="roboto20400" color={Colors.black}>
                {t('login')}
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout
                  fontSize="small"
                  style={{ color: `${Colors.primary}` }}
                />
              </ListItemIcon>
              <Typography variant="roboto20400" color={Colors.black}>
                {t('registration')}
              </Typography>
            </MenuItem> */}
          </Menu>
        </>
      )}
    </>
  );
};

export default AccountMenu;

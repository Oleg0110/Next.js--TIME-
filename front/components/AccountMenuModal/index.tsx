import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import {
  ButtonAccountModalBox,
  ButtonStyle,
  MainAccountModalBox,
} from '../../styles/accountMenuModal';
import { NextPage } from 'next';
import { useAppSelector } from '../../hooks/redux';
import Entry from '../AccountMenu/Entry';
import Registration from '../AccountMenu/Registration';
import AuthMenu from '../AccountMenu/AuthMenu';

interface IAccountMenuModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
}

const AccountMenuModal: NextPage<IAccountMenuModalProps> = ({
  isModalOpened,
  handleClose,
}) => {
  const { t } = useTranslation('common');

  const { isAuth } = useAppSelector((state) => state.user);

  const [isEntry, setIsEntry] = useState(true);

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <MainAccountModalBox>
          {isAuth && <AuthMenu />}
          {!isAuth && (
            <ButtonAccountModalBox>
              <ButtonStyle
                onClick={() => setIsEntry(true)}
                sx={
                  isEntry && {
                    color: Colors.primary,
                    borderBottom: `3px solid ${Colors.primary}`,
                  }
                }
              >
                {t('entry')}
              </ButtonStyle>
              <ButtonStyle
                onClick={() => setIsEntry(false)}
                sx={
                  !isEntry && {
                    color: Colors.primary,
                    borderBottom: `3px solid ${Colors.primary}`,
                  }
                }
              >
                {t('registration')}
              </ButtonStyle>
            </ButtonAccountModalBox>
          )}
          {isEntry ? !isAuth && <Entry /> : !isAuth && <Registration />}
        </MainAccountModalBox>
      </Modal>
    </>
  );
};

export default AccountMenuModal;

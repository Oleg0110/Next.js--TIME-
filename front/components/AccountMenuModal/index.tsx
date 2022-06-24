import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CustomButton from '../CustomButton';
import { Colors } from '../../styles/theme';
import {
  ButtonAccountModalBox,
  ButtonStyle,
  InputsBox,
  MainAccountModalBox,
} from '../../styles/accountMenuModal';
import { NextPage } from 'next';

interface IAccountMenuModalProps {
  isModalOpened: boolean;
  handleClose: () => void;
}

const AccountMenuModal: NextPage<IAccountMenuModalProps> = ({
  isModalOpened,
  handleClose,
}) => {
  const [isEntry, setIsEntry] = useState(true);

  const { t } = useTranslation('common');

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
          {isEntry ? (
            <InputsBox>
              <Typography variant="roboto36400" color={Colors.primary}>
                {t('loginToUpper')}
              </Typography>
              <label htmlFor="email"></label>
              <input type="email" />
              <CustomButton size="LG" variant="secondary">
                {t('login')}
              </CustomButton>
            </InputsBox>
          ) : (
            <InputsBox>
              <Typography variant="roboto36400" color={Colors.primary}>
                {t('registration')}
              </Typography>
              <label htmlFor="password"></label>
              <input type="password" id="password" />
              <CustomButton size="LG" variant="secondary">
                {t('registration')}
              </CustomButton>
            </InputsBox>
          )}
        </MainAccountModalBox>
      </Modal>
    </>
  );
};

export default AccountMenuModal;

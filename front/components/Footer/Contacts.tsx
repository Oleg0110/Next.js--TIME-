import React from 'react';
import { ContactBox } from '../../styles/footer/index';
import styles from '../../styles/Footer.module.scss';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

const Contacts = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Typography variant="roboto24500">{t('contacts')}</Typography>
      <Typography variant="roboto24500hover">+310 55-555-55</Typography>
      <Typography variant="roboto24500hover">+380 55-555-55</Typography>
      <ContactBox>
        <div className={styles.mailIcon} />
        <Typography variant="footerMail">time.shoe.shop@gmail.com</Typography>
      </ContactBox>
    </>
  );
};

export default Contacts;

import React from 'react';
import { ContactBox } from '../../styles/footer/index';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/icons.module.scss';

const Contacts = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Typography variant="roboto24500">{t('contacts')}</Typography>
      <a href="tel:+310 55-555-55">
        <Typography variant="roboto24500hover">+310 55-555-55</Typography>
      </a>

      <a href="tel:+380 55-555-55">
        <Typography variant="roboto24500hover">+380 55-555-55</Typography>
      </a>

      <ContactBox>
        <div className={styles.mailIcon} />
        <a href="mailto:time.shoe.shop@gmail.com">
          <Typography variant="footerMail">time.shoe.shop@gmail.com</Typography>
        </a>
      </ContactBox>
    </>
  );
};

export default Contacts;

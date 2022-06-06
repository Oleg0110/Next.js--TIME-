import React from 'react';
import { IconsBox, MainIcons, MainIconsBox } from '../../styles/footer/index';
import styles from '../../styles/Footer.module.scss';
import Link from 'next/link';

const IconsField = () => {
  return (
    <MainIconsBox>
      <MainIcons>
        <Link href={'http://www.visa.com'}>
          <a target="_blank">
            <div className={styles.visa} />
          </a>
        </Link>
        <Link href={'http://www.applePay.com'}>
          <a target="_blank">
            <div className={styles.applePay} />
          </a>
        </Link>
      </MainIcons>
      <IconsBox>
        <Link href={'http://www.facebook.com'}>
          <a target="_blank">
            <div className={styles.facebook} />
          </a>
        </Link>
        <Link href={'http://www.google.com'}>
          <a target="_blank">
            <div className={styles.google} />
          </a>
        </Link>
        <Link href={'http://www.instagram.com'}>
          <a target="_blank">
            <div className={styles.instagram} />
          </a>
        </Link>
        <Link href={'http://www.twitter.com'}>
          <a target="_blank">
            <div className={styles.twitter} />
          </a>
        </Link>
      </IconsBox>
    </MainIconsBox>
  );
};

export default IconsField;

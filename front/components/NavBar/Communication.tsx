import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import Link from 'next/link';

const Communication = () => {
  const [isOpenNumbers, setIsOpenNumbers] = useState(false);

  const router = useRouter();

  return (
    <>
      <TooltipIcon
        title="phone-numbers"
        onClick={() => setIsOpenNumbers(!isOpenNumbers)}
      >
        <div className={styles.phone} />
      </TooltipIcon>
      <TooltipIcon title="translation">
        <div className={styles.earth} />
      </TooltipIcon>
      <Link href={router.asPath} locale={'en'}>
        <Typography
          variant="translation"
          color={
            router.locale === 'en' ? Colors.darkGray : Colors.secondaryWhite
          }
        >
          EN
        </Typography>
      </Link>
      <Link href={router.asPath} locale={'ua'}>
        <Typography
          variant="translation"
          color={
            router.locale === 'ua' ? Colors.darkGray : Colors.secondaryWhite
          }
        >
          UA
        </Typography>
      </Link>
    </>
  );
};

export default Communication;

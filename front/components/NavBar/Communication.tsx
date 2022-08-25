import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { useRouter } from 'next/router';
import { Box, Typography, useMediaQuery } from '@mui/material';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import Link from 'next/link';

const Communication = () => {
  const mediaMD = useMediaQuery(theme.breakpoints.down('md'));

  const [isOpenNumbers, setIsOpenNumbers] = useState(false);

  const router = useRouter();

  return (
    <Box
      sx={
        mediaMD
          ? {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
            }
          : {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }
      }
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
      >
        <TooltipIcon
          title="phone-numbers"
          onClick={() => !mediaMD && setIsOpenNumbers(!isOpenNumbers)}
        >
          <div className={styles.phone} />
        </TooltipIcon>
        {mediaMD && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxHeight: '120px',
              marginLeft: '5px',
            }}
          >
            <Typography>
              <a href="tel:+310 55-555-55">
                <Typography
                  variant="roboto16200"
                  sx={{
                    fontSize: '10px',
                    ':hover': {
                      color: Colors.darkGray,
                    },
                  }}
                >
                  +310 55-555-55
                </Typography>
              </a>
            </Typography>
            <Typography>
              <a href="tel:+380 55-555-55">
                <Typography
                  variant="roboto16200"
                  sx={{
                    fontSize: '10px',
                    ':hover': {
                      color: Colors.darkGray,
                    },
                  }}
                >
                  +380 55-555-55
                </Typography>
              </a>
            </Typography>
          </Box>
        )}
        {isOpenNumbers && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxHeight: '80px',
              marginLeft: '5px',
            }}
          >
            <a href="tel:+310 55-555-55">
              <Typography
                variant="roboto16200"
                sx={{
                  fontSize: '13px',
                  ':hover': {
                    color: Colors.darkGray,
                  },
                }}
              >
                +310 55-555-55
              </Typography>
            </a>
            <a href="tel:+380 55-555-55">
              <Typography
                variant="roboto16200"
                sx={{
                  fontSize: '13px',
                  ':hover': {
                    color: Colors.darkGray,
                  },
                }}
              >
                +380 55-555-55
              </Typography>
            </a>
          </Box>
        )}
      </Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
      >
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
      </Box>
    </Box>
  );
};

export default Communication;

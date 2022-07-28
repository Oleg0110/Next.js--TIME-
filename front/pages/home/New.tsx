import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  CategoryPositionBox,
  ImageOpacity,
  ManNewBox,
  NewContentBox,
  NewMainBox,
  WomanNewBox,
} from '../../styles/home';
import { Colors } from '../../styles/theme';
import { ROUTES } from '../../utils/constants';
import Link from 'next/link';
import Woman from '../../assets/img/home/woman.png';
import Man from '../../assets/img/home/man.png';
import Image from 'next/image';
import CustomButton from '../../components/CustomButton';

const New = () => {
  const { t } = useTranslation('home');

  return (
    <NewMainBox>
      <NewContentBox>
        <Typography variant="h1" color={Colors.black}>
          {t('new')}
        </Typography>
        <CategoryPositionBox>
          <WomanNewBox>
            <Link href={`${ROUTES.newWomen}`}>
              <a>
                <ImageOpacity>
                  <Image src={Woman} width="370px" height="570px" />
                </ImageOpacity>
              </a>
            </Link>
            <CustomButton style={{ marginTop: '30px' }} size="LG">
              <Link href={`${ROUTES.newWomen}`}>
                <Typography variant="inherit" color="inherit">
                  {t('women')}
                </Typography>
              </Link>
            </CustomButton>
          </WomanNewBox>
          <ManNewBox>
            <Link href={`${ROUTES.newMen}`}>
              <a>
                <ImageOpacity>
                  <Image src={Man} width="370px" height="570px" />
                </ImageOpacity>
              </a>
            </Link>
            <CustomButton style={{ marginTop: '30px' }} size="LG">
              <Link href={`${ROUTES.newMen}`}>
                <Typography variant="inherit" color="inherit">
                  {t('men')}
                </Typography>
              </Link>
            </CustomButton>
          </ManNewBox>
        </CategoryPositionBox>
      </NewContentBox>
    </NewMainBox>
  );
};

export default New;

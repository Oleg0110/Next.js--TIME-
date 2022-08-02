import React, { useRef } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { IProduct } from '../../utils/interface/productInterface';
import {
  // ButtonArrowNext,
  // ButtonArrowPrev,
  // SaleContentBox,
  SaleMainBox,
} from '../../styles/home';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import theme, { Colors } from '../../styles/theme';
import ProductCarousel from '../../components/ProductCarousel';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import styles from '../../styles/icons.module.scss';
import styles from '../../styles/Home.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

interface ISaleProps {
  saleCarouselProduct: IProduct[];
}

const Sale: NextPage<ISaleProps> = ({ saleCarouselProduct }) => {
  const mediaSM = useMediaQuery(theme.breakpoints.down('sm'));
  const mediaMD = useMediaQuery(theme.breakpoints.down('md'));

  // const slidesPerView = mediaSM ? 1 : mediaMD ? 2 : 4;

  const breakDa = mediaMD && {
    900: {
      width: 600,
      slidesPerView: 1,
    },
  };
  // console.log(slidesPerView);

  const { t } = useTranslation('home');

  const swiper = useSwiper();
  const [swiperRef, setSwiperRef] = useState<typeof swiper>();

  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <>
      <SaleMainBox>
        <Typography variant="h1" color={Colors.black}>
          {t('sale')}
        </Typography>

        {/* <ButtonArrowPrev onClick={handleLeftClick}>
          <div className={styles.carouselArrowPrev} />
        </ButtonArrowPrev>
        <ButtonArrowNext onClick={handleRightClick}>
          <div className={styles.carouselArrowNext} />
        </ButtonArrowNext> */}
      </SaleMainBox>
      <Box sx={{ width: '100%', position: 'relative', margin: '0px 0px 40px' }}>
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={-10}
          speed={800}
          slidesPerView={4}
          loop
          centeredSlides={false}
          // autoplay={{ delay: 3000 }}
          // breakpoints={{
          //   410: {
          //     slidesPerView: 1,
          //   },
          //   640: {
          //     slidesPerView: 2,
          //   },
          //   1000: {
          //     slidesPerView: 3,
          //   },
          //   1500: {
          //     slidesPerView: 4,
          //   },
          // }}
          className={styles.myswiper}
        >
          {saleCarouselProduct &&
            saleCarouselProduct.map((product) => (
              <SwiperSlide key={product.id} className={styles.swiperSlide}>
                <ProductCarousel
                  productDiscountPrice={product.productDiscountPrice}
                  productFor={product.productFor}
                  productId={product.id}
                  productMainPictures={product.productMainPictures}
                  productName={product.productName}
                  productSize={product.productSize}
                  productPrice={product.productPrice}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className={styles.swiperNavPrev} onClick={handleLeftClick} />
        <div className={styles.swiperNavNext} onClick={handleRightClick} />
      </Box>
    </>
  );
};

export default Sale;

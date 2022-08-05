import React, { useCallback, useState } from 'react';
import theme, { Colors } from '../../../../styles/theme';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux';
import { useTranslation } from 'next-i18next';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import ProductCarousel from '../../../../components/ProductCarousel';
import styles from '../../../../styles/recommendedSwiper.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

const Recommended = () => {
  const { t } = useTranslation('product');

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

  const { productsRecommended } = useAppSelector((state) => state.product);

  return (
    <>
      {productsRecommended[0] !== undefined && (
        <>
          <Typography
            variant="h1"
            color={Colors.black}
            sx={{
              textAlign: 'center',
              [theme.breakpoints.down('sm')]: {
                fontSize: '30px',
              },
            }}
          >
            {t('recommended')}
          </Typography>

          <Box
            sx={{
              width: '100%',
              position: 'relative',
              margin: '0px 0px 40px',
            }}
          >
            <Swiper
              onSwiper={setSwiperRef}
              modules={[Navigation, Autoplay]}
              spaceBetween={-10}
              speed={800}
              slidesPerView="auto"
              loop
              autoplay={{ delay: 3000 }}
              breakpoints={{
                410: {
                  slidesPerView: 1,
                  spaceBetween: 250,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1000: {
                  slidesPerView: 3,
                  spaceBetween: 80,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1500: {
                  slidesPerView: 4,
                  spaceBetween: -10,
                },
              }}
              className={styles.myswiper}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: '150px',
                }}
              >
                {productsRecommended.map((product) => (
                  <SwiperSlide key={product.id} className={styles.swiperSlide}>
                    <ProductCarousel
                      productMainPictures={product.productMainPictures}
                      productFor={product.productFor}
                      productId={product.id}
                      productDiscountPrice={product.productDiscountPrice}
                      productName={product.productName}
                      productPrice={product.productPrice}
                      productSize={product.productSize}
                    />
                  </SwiperSlide>
                ))}
              </Box>
            </Swiper>
            <div className={styles.swiperNavPrev} onClick={handleLeftClick} />
            <div className={styles.swiperNavNext} onClick={handleRightClick} />
          </Box>
        </>
      )}
    </>
  );
};

export default Recommended;

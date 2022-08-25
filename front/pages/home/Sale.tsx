import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { IProduct } from '../../utils/interface/productInterface';
import { SaleMainBox } from '../../styles/home';
import { Box, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import ProductCarousel from '../../components/ProductCarousel';
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
      </SaleMainBox>
      <Box sx={{ width: '100%', position: 'relative', margin: '0px 0px 40px' }}>
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
              spaceBetween: -20,
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
          </Box>
        </Swiper>
        <div className={styles.swiperNavPrev} onClick={handleLeftClick} />
        <div className={styles.swiperNavNext} onClick={handleRightClick} />
      </Box>
    </>
  );
};

export default Sale;

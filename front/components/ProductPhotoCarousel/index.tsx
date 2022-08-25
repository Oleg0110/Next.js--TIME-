import React, { useCallback, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import {
  SwiperPhotoContainer,
  SwiperProductContainer,
} from '../../styles/productPage';
import { IProductPhoto } from '../../utils/interface/productInterface';
import { NextPage } from 'next';
import { BASIC_URL } from '../../utils/httpLinks';
import { useMediaQuery } from '@mui/material';
import theme from '../../styles/theme';
import styles from '../../styles/productPhotosSwiper.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useAppSelector } from '../../hooks/redux';

interface IProductPhotoCarousel {
  productPhotos: IProductPhoto[];
}

const ProductPhotoCarousel: NextPage<IProductPhotoCarousel> = ({
  productPhotos,
}) => {
  const mediaLG = useMediaQuery(theme.breakpoints.down('lg'));

  const swiper = useSwiper();
  const [thumbsSwiper, setThumbsSwiper] = useState<typeof swiper>();
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
    <SwiperProductContainer>
      <SwiperPhotoContainer>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          loop
          direction={mediaLG ? 'horizontal' : 'vertical'}
          className={styles.mySwiper}
          breakpoints={{
            410: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {productPhotos &&
            productPhotos.map((data) => (
              <SwiperSlide key={data.id} className={styles.swiperSlider}>
                <img
                  width="100%"
                  height="100%"
                  src={`${BASIC_URL}/${data.photoName}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className={styles.swiperNavPrev} onClick={handleLeftClick} />
        <div className={styles.swiperNavNext} onClick={handleRightClick} />
      </SwiperPhotoContainer>
      <Swiper
        onSwiper={setSwiperRef}
        spaceBetween={0}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        loop
        centeredSlides={true}
        className={styles.mySwiper2}
        breakpoints={{
          900: {
            spaceBetween: 10,
          },
        }}
      >
        {productPhotos &&
          productPhotos.map((data) => (
            <SwiperSlide key={data.id} className={styles.swiperSlider2}>
              <img
                width="100%"
                height="100%"
                src={`${BASIC_URL}/${data.photoName}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </SwiperProductContainer>
  );
};

export default ProductPhotoCarousel;

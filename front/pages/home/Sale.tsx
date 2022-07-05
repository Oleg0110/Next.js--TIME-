import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useCallback, useRef, useState } from 'react';
import SaleCarouselProduct from '../../components/SaleCarouselProduct';
import { IProduct } from '../../utils/interface/productInterface';
import { Swiper, SwiperSlide, useSwiper, SwiperProps } from 'swiper/react';
import { Autoplay, Navigation, SwiperOptions } from 'swiper';
import styles from '../../styles/icons.module.scss';
import {
  ButtonArrowNext,
  ButtonArrowPrev,
  SaleContentBox,
  SaleMainBox,
} from '../../styles/home';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { BASIC_URL } from '../../utils/httpLinks';

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
    <SaleMainBox>
      <SaleContentBox>
        <Typography variant="h1" color={Colors.black}>
          {t('sale')}
        </Typography>
        <ButtonArrowPrev onClick={handleLeftClick}>
          <div className={styles.carouselArrowPrev} />
        </ButtonArrowPrev>
        <ButtonArrowNext onClick={handleRightClick}>
          <div className={styles.carouselArrowNext} />
        </ButtonArrowNext>
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={4}
          slidesPerGroup={1}
          // breakpoints={{
          //   640: {
          //     width: 640,
          //     slidesPerView: 1,
          //   },
          // }}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
        >
          {saleCarouselProduct &&
            saleCarouselProduct.map((product) => (
              <SwiperSlide key={product.id}>
                <SaleCarouselProduct
                  src={`${BASIC_URL}/${product.productMainPictures}`}
                  name={product.productName}
                  price={product.productPrice}
                  href="/"
                  salePrice={product.productDiscountPrice}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </SaleContentBox>
    </SaleMainBox>
  );
};

export default Sale;

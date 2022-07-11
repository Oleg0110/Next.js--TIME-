import { Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import ProductCarousel from '../../../../components/ProductCarousel';
import {
  ButtonArrowNext,
  ButtonArrowPrev,
  ProductRecommended,
} from '../../../../styles/productPage';
import { Colors } from '../../../../styles/theme';
import styles from '../../../../styles/icons.module.scss';
import { useAppSelector } from '../../../../hooks/redux';
import { Autoplay, Navigation } from 'swiper';
import { BASIC_URL } from '../../../../utils/httpLinks';

const Recommended = () => {
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
    <div>
      {productsRecommended[0] !== undefined && (
        <ProductRecommended>
          <Typography variant="h1" color={Colors.black}>
            {/* {t('sale')} */}
            RECOMMENDED FOR YOU
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
            {productsRecommended.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCarousel
                  src={`${BASIC_URL}/${product.productMainPictures}`}
                  name={product.productName}
                  price={product.productPrice}
                  href={product.id}
                  salePrice={product.productDiscountPrice}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ProductRecommended>
      )}
    </div>
  );
};

export default Recommended;

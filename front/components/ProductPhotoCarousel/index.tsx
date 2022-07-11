import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import styles from '../../styles/product.module.scss';
import { SwiperProductContainer } from '../../styles/productPage';

const ProductPhotoCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <SwiperProductContainer>
      <Swiper modules={[Navigation]}>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            width="250px"
            height="250px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            width="250px"
            height="250px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            width="250px"
            height="250px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            width="250px"
            height="250px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            width="250px"
            height="250px"
          />
        </SwiperSlide>
      </Swiper>
    </SwiperProductContainer>
  );
};

export default ProductPhotoCarousel;

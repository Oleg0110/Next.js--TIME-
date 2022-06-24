// import React from 'react'

// import { Box, Container, Typography } from '@mui/material'
// import { Autoplay } from 'swiper'
// import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

// import { CustomButton } from 'src/components/buttons'
// import { CustomCard } from 'src/components/card'
// import CustomIcon from 'src/components/customIcon'

// import { IconType } from 'src/types/enums'

// import { sliderCards } from 'src/utils/constants/landing'

// import 'swiper/css'
// import 'swiper/css/navigation'
// import { useStyles } from './style'

// const SwiperButtonNext: React.FC = () => {
//   const classes = useStyles()
//   const swiper = useSwiper()

//   return (
//     <CustomButton
//       className={classes.arrowBtn}
//       icon={IconType.arrowRight}
//       onClick={() => swiper.slideNext()}
//     />
//   )
// }

// const SwiperButtonPrev: React.FC = () => {
//   const classes = useStyles()
//   const swiper = useSwiper()

//   return (
//     <CustomButton
//       className={classes.arrowBtn}
//       icon={IconType.arrowLeft}
//       onClick={() => swiper.slidePrev()}
//     />
//   )
// }

// export const CardsCarousel: React.FC = () => {
//   const classes = useStyles()

//   return (
//     <Swiper
//       slidesPerView={1}
//       spaceBetween={-50}
//       centeredSlides={true}
//       loop={true}
//       autoplay={{
//         delay: 3000,
//         disableOnInteraction: false
//       }}
//       breakpoints={{
//         360: {
//           slidesPerView: 1,
//           spaceBetween: -100
//         },
//         410: {
//           slidesPerView: 1,
//           spaceBetween: -150
//         },
//         640: {
//           slidesPerView: 2,
//           spaceBetween: 20
//         },
//         800: {
//           slidesPerView: 2,
//           spaceBetween: -280
//         },
//         1024: {
//           slidesPerView: 4,
//           spaceBetween: 50
//         },
//         1300: {
//           slidesPerView: 4,
//           spaceBetween: -250
//         }
//       }}
//       modules={[Autoplay]}
//       className='mySwiper'
//     >
//       {sliderCards.map((item, index) => (
//         <SwiperSlide key={index}>
//           <CustomCard {...item} />
//         </SwiperSlide>
//       ))}
//       <Container className={classes.containerRow}>
//         <Box className={classes.actionRow}>
//           <Typography variant='h7' className={classes.coursesBtn}>
//             View all courses <CustomIcon type={IconType.rectangle} />
//           </Typography>
//           <Box className={classes.btnGroup}>
//             <SwiperButtonPrev />
//             <SwiperButtonNext />
//           </Box>
//         </Box>
//       </Container>
//     </Swiper>
//   )
// }

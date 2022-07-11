import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme, { Colors } from '../theme';

export const MainProductPageContainer = styled(Box)(() => ({
  backgroundColor: Colors.secondaryWhite,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '30px 10px 30px 10px',
})) as typeof Box;

export const ProductPageMainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1500px',
  minWidth: '0px',
})) as typeof Box;

export const ProductPageLinkBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
})) as typeof Box;

export const ProductPageMainInfoBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  minWidth: '0px',
  marginBottom: '50px',
})) as typeof Box;

export const InfoProductPageBox = styled(Box)(() => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginRight: '15px',
})) as typeof Box;

export const PriceBottomLineBox = styled(Box)(() => ({
  width: '100%',
  borderBottom: `1px solid ${Colors.primary}`,
  paddingBottom: '10px',
  marginBottom: '10px',
})) as typeof Box;

export const PriceProductPageBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
})) as typeof Box;

// export const MakePhotoBox = styled(Box)(() => ({
//   maxWidth: '500px',
//   marginBottom: '40px',
//   [theme.breakpoints.down('md')]: {
//     margin: 'auto',
//   },
// })) as typeof Box;

export const PhotoDescriptionBox = styled(Box)(() => ({
  width: '65%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minWidth: '0px',
})) as typeof Box;

// export const CleanPhotoBox = styled(Box)(() => ({
//   maxWidth: '790px',
//   maxHeight: '1100px',
//   marginTop: '50px',
//   [theme.breakpoints.down('sm')]: {
//     marginBottom: '100px',
//     maxWidth: '400px',
//     maxHeight: '550px',
//   },
// })) as typeof Box;

export const LikeIconPosition = styled(Box)(() => ({
  position: 'absolute',
  right: '0px',
  cursor: 'pointer',
})) as typeof Box;

export const AddButtonProductPage = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  margin: '20px 0px',
})) as typeof Box;

export const ProductPageSizeBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0 15px',
  justifyContent: 'start',
})) as typeof Box;

export const ProductPageColorBox = styled(Box)(() => ({
  marginTop: '10px',
})) as typeof Box;

// Product Swiper
export const SwiperProductContainer = styled(Box)(() => ({
  height: '575px',
  width: 'inherit',
})) as typeof Box;

// Product Recommended
export const ProductRecommended = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1430px',
  position: 'relative',
})) as typeof Box;

export const ButtonArrowPrev = styled(Box)(() => ({
  position: 'absolute',
  cursor: 'pointer',
  zIndex: '3',
  left: '-3%',
  top: '40%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const ButtonArrowNext = styled(Box)(() => ({
  position: 'absolute',
  cursor: 'pointer',
  zIndex: '3',
  right: '-3%',
  top: '40%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

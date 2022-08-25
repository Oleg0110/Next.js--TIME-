import theme, { Colors } from '../theme';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

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
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  },
})) as typeof Box;

export const InfoProductPageBox = styled(Box)(() => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginRight: '15px',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    margin: '0px 0px 30px',
  },
})) as typeof Box;

export const SizeTitleBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
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

export const PhotoDescriptionBox = styled(Box)(() => ({
  width: '65%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minWidth: '0px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
})) as typeof Box;

export const ProductNameMainBox = styled(Box)(() => ({
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
})) as typeof Box;

export const LikeIconPosition = styled(Box)(() => ({
  position: 'absolute',
  right: '0px',
  top: '0px',
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
  margin: '10px 10px 15px',
  justifyContent: 'start',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
})) as typeof Box;

export const ProductPageColorBox = styled(Box)(() => ({
  margin: '10px',
})) as typeof Box;

// Product Swiper
export const SwiperProductContainer = styled(Box)(() => ({
  minHeight: '575px',
  width: '100%',
  display: 'flex',
  margin: '25px 0px 40px',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    maxHeight: '600px',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '475px',
    margin: '10px 0px',
  },
})) as typeof Box;

export const SwiperPhotoContainer = styled(Box)(() => ({
  width: '200px',
  height: '100%',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    position: 'relative',
    width: '90%',
    height: '155px',
    margin: '20px',
  },
  [theme.breakpoints.down('md')]: {
    width: '500px',
    height: '105px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '350px',
    height: '105px',
  },
})) as typeof Box;

// Product Recommended

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

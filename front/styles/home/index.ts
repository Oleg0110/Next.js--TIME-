import theme, { Colors } from '../theme';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

//Photo

export const MainPhotoBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  width: '100%',
  height: '850px',
  padding: '0px 10px',
  backgroundColor: Colors.primary,
  [theme.breakpoints.down('md')]: {
    height: '650px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '450px',
  },
  [theme.breakpoints.down('xs')]: {
    height: '350px',
  },
})) as typeof Box;

export const PhotoContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '900px',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '700px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '500px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '400px',
  },
})) as typeof Box;

export const ColumnPhotoBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 5px',
})) as typeof Box;

//About

export const AboutMainBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '100px',
  padding: '0px 10px',
  [theme.breakpoints.down('lg')]: {
    marginTop: '65px',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '35px',
  },
})) as typeof Box;

export const AboutContentBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '1200px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})) as typeof Box;

export const AboutBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  marginRight: '25px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: '0px 0px 40px 0px',
    textAlign: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0px',
  },
})) as typeof Box;

export const AboutPhoto = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '690px',
  maxWidth: '650px',
})) as typeof Box;

export const AboutSmallPhoto = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  minHeight: '240px',
  maxWidth: '312px',
  margin: '-70px 15px 0px 0px',
  [theme.breakpoints.down('lg')]: {
    height: '500px',
    marginTop: '-30px',
  },
})) as typeof Box;

export const SmallPhotoBox = styled(Box)(() => ({
  margin: '5px 0',
})) as typeof Box;

export const AboutLargePhoto = styled(Box)(() => ({
  maxWidth: '380px',
  height: '600px',
  marginTop: '30px',
  [theme.breakpoints.down('lg')]: {
    marginTop: '50px',
  },
})) as typeof Box;

//NEW

export const NewMainBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0px 10px',
})) as typeof Box;

export const NewContentBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1200px',
})) as typeof Box;

export const CategoryPositionBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  marginTop: '30px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})) as typeof Box;

export const WomanNewBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    width: '45%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60%',
  },
})) as typeof Box;

export const ManNewBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: '5%',
  [theme.breakpoints.down('md')]: {
    width: '45%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60%',
    margin: '30px 0',
  },
})) as typeof Box;

export const ImageOpacity = styled(Box)(() => ({
  ':hover': {
    opacity: 0.7,
  },
})) as typeof Box;

//Sale

export const SaleMainBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0px 10px',
  margin: '70px 0px 50px',
})) as typeof Box;

// export const SaleContentBox = styled(Box)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   width: '1430px',
//   position: 'relative',
// })) as typeof Box;

// export const ButtonArrowPrev = styled(Box)(() => ({
//   position: 'absolute',
//   cursor: 'pointer',
//   zIndex: '3',
//   left: '-3%',
//   top: '40%',
//   [theme.breakpoints.down('md')]: {
//     display: 'none',
//   },
// })) as typeof Box;

// export const ButtonArrowNext = styled(Box)(() => ({
//   position: 'absolute',
//   cursor: 'pointer',
//   zIndex: '3',
//   right: '-3%',
//   top: '40%',
//   [theme.breakpoints.down('md')]: {
//     display: 'none',
//   },
// })) as typeof Box;

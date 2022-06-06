import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

//Photo

export const MainPhotoBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  width: '100%',
  height: '800px',
  padding: '0px 10px',
  backgroundColor: Colors.primary,
  [theme.breakpoints.down('md')]: {
    height: '650px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '450px',
  },
  [theme.breakpoints.down('xs')]: {
    height: '300px',
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

export const AboutContentBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '1200px',
  margin: 'auto',
  marginTop: '100px',
})) as typeof Box;

export const AboutBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  marginRight: '25px',
})) as typeof Box;

export const AboutPhoto = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'centers',
  height: '690px',
  width: '75%',
})) as typeof Box;

export const AboutSmallPhoto = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '605px',
  width: '312px',
  justifyContent: 'space-between',
  marginRight: '15px',
})) as typeof Box;

export const AboutLargePhoto = styled(Box)(() => ({
  width: '380px',
  height: '600px',
  marginTop: '30px',
})) as typeof Box;

//NEW

export const NewContentBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1200px',
  margin: 'auto',
  marginTop: '100px',
})) as typeof Box;

export const CategoryPositionBox = styled(Box)(() => ({
  display: 'flex',
  // justifyContent: 'space-between',
  alignItems: 'center',
  width: 'inherit',
  marginTop: '60px',
})) as typeof Box;

export const WomanNewBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginRight: '10%',
})) as typeof Box;

export const ManNewBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: '5%',
})) as typeof Box;

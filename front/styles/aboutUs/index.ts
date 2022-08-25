import theme, { Colors } from '../theme';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AboutUsContainer = styled(Box)(() => ({
  backgroundColor: Colors.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '50px 10px 0px 10px',
  [theme.breakpoints.down('md')]: {
    paddingTop: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '0px',
  },
})) as typeof Box;

export const AboutUsContentBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '900px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-around',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
})) as typeof Box;

export const SinceBox = styled(Box)(() => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '10px',
  [theme.breakpoints.down('md')]: {
    'span:nth-of-type(n)': {
      fontSize: '15px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: '100%',
    margin: '0px',
  },
})) as typeof Box;

export const MakePhotoBox = styled(Box)(() => ({
  maxWidth: '500px',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    margin: 'auto',
  },
})) as typeof Box;

export const DetailsBox = styled(Box)(() => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    'h1:nth-of-type(n)': {
      fontSize: '35px',
    },
    'span:nth-of-type(n)': {
      fontSize: '15px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
})) as typeof Box;

export const CleanPhotoBox = styled(Box)(() => ({
  maxWidth: '790px',
  maxHeight: '1100px',
  marginTop: '50px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '100px',
    maxWidth: '400px',
    maxHeight: '550px',
  },
})) as typeof Box;

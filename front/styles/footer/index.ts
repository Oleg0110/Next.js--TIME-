import { badgeClasses, Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { url } from 'inspector';
import theme, { Colors } from '../theme';
import IconCart from '../../assets/icon/bag.svg';

//Boxes

export const MainFooterBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
  width: '1920px',
  minHeight: '400px',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
})) as typeof Box;

export const NameBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15%',
})) as typeof Box;

export const MediaBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '60%',
  height: '200px',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    margin: '30px 0 30px 0',
  },
  [theme.breakpoints.down('md')]: {
    height: '150px',
    padding: '0px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: '300px',
    margin: '0px',
    alignItems: 'center',
    width: '200px',
  },
})) as typeof Box;

export const InformBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '0px 10px',
  [theme.breakpoints.down('md')]: {
    width: '33%',
    'span:nth-of-type(n+2)': {
      fontSize: '15px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    alignItems: 'center',
    'span:nth-of-type(1)': {
      fontSize: '15px',
    },

    'span:nth-of-type(n+2)': {
      fontSize: '10px',
    },
    ':nth-of-type(3)': {
      width: '160px',
      textAlign: 'center',
    },
  },
})) as typeof Box;

export const ContactBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
  marginTop: '35px',
  [theme.breakpoints.down('md')]: {
    marginTop: '20px',
  },
})) as typeof Box;

export const MainIconsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 40px 0 40px',
  width: '20%',
  [theme.breakpoints.down('lg')]: {
    width: '30%',
  },
  [theme.breakpoints.down('md')]: {
    width: '40%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60%',
  },
  [theme.breakpoints.down('xs')]: {
    width: '80%',
  },
})) as typeof Box;

export const MainIcons = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})) as typeof Box;

export const IconsBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
})) as typeof Box;

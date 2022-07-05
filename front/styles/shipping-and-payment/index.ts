import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const MainPhotoBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '700px',
  position: 'relative',
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

export const MainContentBox = styled(Box)(() => ({
  backgroundColor: Colors.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '30px 20px 0px 20px',
})) as typeof Box;

export const ContentBox = styled(Box)(() => ({
  display: 'flex',
  width: '1200px',
  flexDirection: 'column',
  alignItems: 'center',
})) as typeof Box;

export const TextBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '30px 0px',
})) as typeof Box;

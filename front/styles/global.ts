import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from './theme/index';

export const MainContentBox = styled(Container)(() => ({
  width: theme.breakpoints.down('lg'),
  backgroundColor: Colors.secondaryWhite,
})) as typeof Container;

export const MainNavBarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  width: '100%',
  height: '100px',
  backgroundColor: Colors.primary,
  [theme.breakpoints.down('md')]: {
    height: '70px',
  },
})) as typeof Box;

export const MainFooterContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  width: '100%',
  maxHeight: '1000px',
  backgroundColor: Colors.primary,
})) as typeof Box;

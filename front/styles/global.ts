import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from './theme/index';

export const MainContentBox = styled(Container)(() => ({
  width: theme.breakpoints.down('lg'),
  backgroundColor: Colors.secondaryWhite,
  paddingTop: '75px',
  minHeight: '650px',
  [theme.breakpoints.down('md')]: {
    paddingTop: '60px',
  },
})) as typeof Container;

export const MainNavBarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  width: '100%',
  height: '75px',
  backgroundColor: Colors.primary,
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
  position: 'fixed',
  zIndex: '10',
  [theme.breakpoints.down('md')]: {
    height: '60px',
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
  paddingBottom: '10px',
  [theme.breakpoints.down('md')]: {
    paddingBottom: '40px',
  },
})) as typeof Box;

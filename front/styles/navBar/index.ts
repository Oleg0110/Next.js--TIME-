import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

//Boxes

export const MainNavBarBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  width: '1920px',
  height: '100%',
  marginBottom: '10px',
})) as typeof Box;

export const BurgerBox = styled(Box)(() => ({
  display: 'none',
  width: '50px',
  justifyContent: 'start',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
})) as typeof Box;

export const TitleBox = styled(Box)(() => ({
  display: 'flex',
  margin: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '-10px',
  [theme.breakpoints.down('md')]: {
    height: '100%',
  },
})) as typeof Box;

export const CommunicationBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '200px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const CommunicationMenuBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
})) as typeof Box;

export const LinkBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '820px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const IconsBox = styled(Box)(() => ({
  display: 'flex',
  width: '200px',
  justifyContent: 'end',
  [theme.breakpoints.down('md')]: {
    width: '50px',
  },
})) as typeof Box;

export const Icons = styled(Box)(() => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const IconsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'fixed',
  background: Colors.primary,
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 99,
  borderTop: `1px solid ${Colors.secondaryWhite}`,
})) as typeof Box;

export const IconsContainerDesktop = styled(Box)(() => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

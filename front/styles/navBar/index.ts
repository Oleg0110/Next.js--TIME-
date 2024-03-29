import theme, { Colors } from '../theme';
import { Badge, Box, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';

//Boxes

export const MainNavBarBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px 10px 0px',
  width: '1920px',
})) as typeof Box;

export const BurgerBox = styled(Box)(() => ({
  display: 'none',
  width: '100px',
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
  height: '50px',
  marginBottom: '-10px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '0px',
    height: '100%',
  },
})) as typeof Box;

export const CommunicationBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  minWidth: '250px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const CommunicationMenuBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
})) as typeof Box;

export const LinkNavBarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '103%',
  marginTop: '5px',
  borderTop: `1px solid ${Colors.secondaryWhite}`,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const LinkBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '70%',
})) as typeof Box;

export const HoverNavbarCollapse = styled(Collapse)(() => ({
  position: 'absolute',
  top: '22px',
  left: '0px',
  width: '100%',
  background: '#685248',
  borderBottom: '1px solid #fff',
  paddingLeft: '22%',
  height: '90px',
})) as typeof Collapse;

export const HoverNavbar = styled(Box)(() => ({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
})) as typeof Box;

export const IconsBox = styled(Box)(() => ({
  display: 'flex',
  minWidth: '230px',
  justifyContent: 'end',
  [theme.breakpoints.down('md')]: {
    minWidth: '100px',
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
  height: '45px',
  zIndex: 99,
  borderTop: `1px solid ${Colors.secondaryWhite}`,
})) as typeof Box;

export const IconsContainerDesktop = styled(Box)(() => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
})) as typeof Box;

export const AdminPageBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: 3,
    top: 6,
  },
}));

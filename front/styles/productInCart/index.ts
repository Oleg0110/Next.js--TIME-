import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const MainContainer = styled(Box)(() => ({
  maxWidth: '450px',
  minHeight: '150px',
  borderBottom: `1px solid ${Colors.primary}`,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginRight: '5px',
  [theme.breakpoints.down('md')]: {
    marginRight: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    marginBottom: '30px',
  },
})) as typeof Box;

export const PhotoContainer = styled(Box)(() => ({
  padding: '5px 10px 15px 10px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px',
  },
})) as typeof Box;

export const InfoContainer = styled(Box)(() => ({
  width: '265px',
  minHeight: '130px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  [theme.breakpoints.down('sm')]: {
    minWidth: '200px',
  },
})) as typeof Box;

export const RemoveBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
})) as typeof Box;

export const RemoveButton = styled(Button)(() => ({
  color: Colors.darkGray,
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: 200,
  width: '95px',
  textTransform: 'none',
  paddingRight: '0px',
  border: 'none',
  ':hover': {
    border: 'none',
    color: Colors.lightGray,
    backgroundColor: Colors.secondaryWhite,
    fontWeight: 300,
  },
}));

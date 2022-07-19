import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const UserSearchContainer = styled(Box)(() => ({
  width: '100%',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  margin: '10px 0px',
  cursor: 'pointer',
  padding: '10px 20px',
  border: `1px solid ${Colors.primary}`,
  borderRadius: '15px',
  [theme.breakpoints.down('md')]: {
    marginRight: '0px',
  },
  ':hover': {
    backgroundColor: Colors.lightGray,
  },
})) as typeof Box;

export const InfoUserContainer = styled(Box)(() => ({
  width: '50%',
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    minWidth: '200px',
  },
})) as typeof Box;

export const UserSearchButtonBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
})) as typeof Box;

export const ChangeButton = styled(Button)(() => ({
  color: Colors.darkGray,
  background: 'none',
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: 400,
  width: '70px',
  padding: '0px',
  border: 'none',
  ':hover': {
    border: 'none',
    color: Colors.black,
    background: 'none',
  },
}));

export const DeleteButton = styled(Button)(() => ({
  color: Colors.darkGray,
  background: 'none',
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: 400,
  width: '95px',
  textTransform: 'none',
  paddingRight: '0px',
  border: 'none',
  ':hover': {
    border: 'none',
    color: Colors.saleColor,
    background: 'none',
  },
}));

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const MainProductSearchContainer = styled(Box)(() => ({
  width: '100%',
  height: '100px',
  borderBottom: `1px solid ${Colors.primary}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '10px 0px',
  [theme.breakpoints.down('md')]: {
    marginRight: '0px',
  },
})) as typeof Box;

export const PhotoProductSearch = styled(Box)(() => ({
  padding: '5px',
})) as typeof Box;

export const InfoSearchContainer = styled(Box)(() => ({
  width: '50%',
  minHeight: '88px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  marginLeft: '10px',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    minWidth: '200px',
  },
})) as typeof Box;

export const ProductSearchButtonBox = styled(Box)(() => ({
  width: '100%',
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

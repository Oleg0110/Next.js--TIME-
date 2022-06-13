import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const MainAccountModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  maxHeight: '370px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '4px',
  [theme.breakpoints.down('sm')]: {
    width: '370px',
  },
})) as typeof Box;

export const ButtonAccountModalBox = styled(Box)(() => ({
  display: 'flex',
  width: '350px',
  alignItem: 'center',
  margin: 'auto',
})) as typeof Box;

export const ButtonStyle = styled(Button)(() => ({
  fontWeight: 400,
  width: '50%',
  fontSize: '25px',
  color: Colors.lightGray,
  backgroundColor: Colors.secondaryWhite,
  border: 'none',
  borderRadius: '0px',
  borderBottom: `3px solid ${Colors.lightGray}`,
  textTransform: 'none',
  margin: '1px',
  ':hover': {
    border: 'none',
    backgroundColor: Colors.secondaryWhite,
    color: Colors.primary,
    borderBottom: `3px solid ${Colors.primary}`,
  },
}));

export const InputsBox = styled(Box)(() => ({
  minHeight: '150px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '15px',
})) as typeof Box;

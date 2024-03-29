import theme, { Colors } from '../theme';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

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

export const ButtonAccountMenuBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItem: 'center',
  padding: '15px',
})) as typeof Box;

export const ButtonAccountMenuStyle = styled(Button)(() => ({
  fontWeight: 400,
  width: '50%',
  fontSize: '20px',
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

export const InputsAccountMenuBox = styled(Box)(() => ({
  minHeight: '150px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
})) as typeof Box;

export const FormAuthBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})) as typeof Box;

export const FormAuthInputBox = styled(Box)(() => ({
  position: 'relative',
})) as typeof Box;

export const InputAuth = styled(Field)(() => ({
  border: `1px solid ${Colors.primary}`,
  width: '260px',
  padding: '3px 10px',
  fontSize: '18px',
  margin: '8px 0px',
})) as typeof Field;

export const AuthErrorMessage = styled(ErrorMessage)(() => ({
  position: 'absolute',
  color: '#e64848',
  top: '35px',
  left: '10px',
  fontSize: '13px',
})) as typeof ErrorMessage;

export const FormAuthButtonPosition = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
})) as typeof Box;

//Auth

export const AuthBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})) as typeof Box;

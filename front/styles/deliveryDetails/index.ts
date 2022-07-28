import theme, { Colors } from '../theme';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorMessage, Field } from 'formik';

export const DeliveryContainer = styled(Box)(() => ({
  backgroundColor: Colors.primary,
  width: '100%',
  minHeight: '600px',
  margin: 0,
  padding: '0px 10px 50px',
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
})) as typeof Box;

export const DeliveryMainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
})) as typeof Box;

export const DeliveryContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
})) as typeof Box;

export const ProductOnDeliveryBox = styled(Box)(() => ({
  width: '45%',
  minWidth: '400px',
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
})) as typeof Box;

export const ProductOnDeliveryScroll = styled(Box)(() => ({
  width: '100%',
  maxHeight: '450px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.primary,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.darkGray,
    border: `4px solid ${Colors.primary}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const ProductOnDeliveryContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})) as typeof Box;

// Delivery
export const DeliveryFormMainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '35%',
  maxWidth: '450px',
  minHeight: '150px',
  border: `3px solid ${Colors.secondaryWhite}`,
  margin: '15px',
  padding: '20px',
  [theme.breakpoints.down('md')]: {
    width: '70%',
    marginTop: '40px',
  },
})) as typeof Box;

export const FormOrderBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '25px',
  width: '100%',
})) as typeof Box;

export const InputOrderBox = styled(Box)(() => ({
  display: 'flex',
  margin: '10px',
  position: 'relative',
  width: '90%',
})) as typeof Box;

export const InputOrderErrorMessage = styled(ErrorMessage)(() => ({
  position: 'absolute',
  top: '-20px',
  color: '#e64848',
})) as typeof ErrorMessage;

export const InputOrder = styled(Field)(() => ({
  width: '100%',
  padding: '10px',
  fontSize: '18px',
})) as typeof Field;

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';
import { Field } from 'formik';

export const ProductOnDeliveryContainer = styled(Box)(() => ({
  width: '100%',
  minHeight: '150px',
  borderBottom: `2px solid ${Colors.secondaryWhite}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  padding: '20px 15px 20px 0px',
})) as typeof Box;

export const ProductOnDeliveryPhotoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
})) as typeof Box;

export const ProductOnDeliveryInfo = styled(Box)(() => ({
  width: '100%',
  minHeight: '130px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '0px 10px 0px 20px',
})) as typeof Box;

export const ProductOnDeliveryPrice = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'start',
  marginTop: '30px',
  minWidth: '160px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    marginTop: '15px',
  },
})) as typeof Box;

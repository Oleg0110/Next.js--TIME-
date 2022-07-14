import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';
import { Field } from 'formik';

export const ProductOnBagContainer = styled(Box)(() => ({
  width: '80%',
  minHeight: '70px',
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  padding: '20px 15px',
  [theme.breakpoints.down('lg')]: {
    width: '90%',
  },
  [theme.breakpoints.down('md')]: {
    width: '95%',
  },
})) as typeof Box;

export const ProductOnBagPhotoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '50%',
})) as typeof Box;

export const ProductOnBagInfo = styled(Box)(() => ({
  width: '50%',
  minHeight: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '0px 10px 0px 20px',
})) as typeof Box;

export const InputProductAmount = styled(Field)(() => ({
  width: '30px',
  fontSize: '20px',
}));

export const ProductOnBagCount = styled(Box)(() => ({
  display: 'flex',
  width: '20%',
})) as typeof Box;

export const ProductAmountBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
})) as typeof Box;

export const ProductOnBagPrice = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '25%',
  justifyContent: 'center',
})) as typeof Box;

export const ProductOnBagRemove = styled(Box)(() => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    top: '0px',
    right: '-5px',
  },
})) as typeof Box;

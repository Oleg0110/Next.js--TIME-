import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme from '../theme';

export const ProductOnPageBox = styled(Box)(() => ({
  width: '370px',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '20px',
  [theme.breakpoints.down('md')]: {
    margin: '10px',
    width: '300px',
  },
})) as typeof Box;

export const ProductOnPagePhoto = styled(Box)(() => ({
  position: 'relative',
})) as typeof Box;

export const IconPosition = styled(Box)(() => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  cursor: 'pointer',
})) as typeof Box;

export const BagIconPosition = styled(Box)(() => ({
  position: 'absolute',
  top: '25px',
  right: '15px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    top: '10px',
  },
})) as typeof Box;

export const ProductOnPageInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100px',
  justifyContent: 'center',
})) as typeof Box;

export const PriceProductBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
})) as typeof Box;

export const ProductMainBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof Box;

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const ProductOnPageBox = styled(Box)(() => ({
  width: '370px',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '20px',
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
  top: '0px',
  right: '15px',
  cursor: 'pointer',
})) as typeof Box;

export const ProductOnPageInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
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

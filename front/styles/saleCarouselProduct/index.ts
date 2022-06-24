import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const SaleCarouselProductBox = styled(Box)(() => ({
  width: '400px',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '20px',
})) as typeof Box;

export const SaleCarouselProductPhoto = styled(Box)(() => ({
  position: 'relative',
  margin: '5px',
})) as typeof Box;

export const IconPosition = styled(Box)(() => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  cursor: 'pointer',
})) as typeof Box;

export const CartIconPosition = styled(Box)(() => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  cursor: 'pointer',
})) as typeof Box;

export const SaleCarouselProductInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
})) as typeof Box;

export const PriceCarouselProductBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
})) as typeof Box;

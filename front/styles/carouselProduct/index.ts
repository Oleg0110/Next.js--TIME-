import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CarouselProductBox = styled(Box)(() => ({
  width: '400px',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '20px',
})) as typeof Box;

export const CarouselProductPhoto = styled(Box)(() => ({
  position: 'relative',
  margin: '5px',
})) as typeof Box;

export const IconPosition = styled(Box)(() => ({
  position: 'absolute',
  top: '10px',
  right: '15px',
  cursor: 'pointer',
})) as typeof Box;

export const BagIconPosition = styled(Box)(() => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  cursor: 'pointer',
})) as typeof Box;

export const CarouselProductInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginLeft: '10px',
})) as typeof Box;

export const PriceCarouselProductBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
})) as typeof Box;

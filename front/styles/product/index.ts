import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const MainProductContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
})) as typeof Box;

export const ProductContentBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '30px 20px',
  flexWrap: 'wrap',
})) as typeof Box;

export const InfoProductBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 20px 30px',
  width: '100%',
})) as typeof Box;

export const CategoryBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexWrap: 'wrap',
})) as typeof Box;

export const SortingFilterBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '165px',
})) as typeof Box;

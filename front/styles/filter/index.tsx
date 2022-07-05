import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme, { Colors } from '../theme';

export const FilterFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '5px',
})) as typeof Box;

export const InfoFilterBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-betweens',
})) as typeof Box;

export const FilterOptionsBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0 15px',
  justifyContent: 'center',
})) as typeof Box;

export const FilterClickPosition = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})) as typeof Box;

import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import theme, { Colors } from '../theme';

export const FilterOpenBox = styled(Box)(() => ({
  width: '390px',
  height: '800px',
  background: Colors.secondaryWhite,
  position: 'sticky',
  top: '74px',
  padding: '5px',
})) as typeof Box;

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

export const InputPriceBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
})) as typeof Box;

export const CustomInput = styled(Input)(() => ({
  fontSize: '18px',
  width: '40%',
  border: `1px solid ${Colors.primary}`,
  '.scss-1x51dt5-MuiInputBase-input-MuiInput-input': {
    padding: '0px',
    textAlign: 'center',
  },

  '&&&:before': {
    borderBottom: '0px',
  },
  '::after': {
    borderBottom: '0px',
  },
  '::hover': {
    borderBottom: '0px',
  },
}));

export const SliderBox = styled(Box)(() => ({
  width: '245px',
  margin: 'auto',
})) as typeof Box;

export const Line = styled(Box)(() => ({
  width: '25px',
  border: `1px solid ${Colors.primary}`,
  alignSelf: 'center',
  backgroundColor: Colors.primary,
  height: '0px',
})) as typeof Box;

export const FilterOptionsBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '5px 0px',
  justifyContent: 'center',
})) as typeof Box;

export const FilterClickPosition = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: '25px',
})) as typeof Box;

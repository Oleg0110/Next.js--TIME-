import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme, { Colors } from '../theme';

export const SortingMainBox = styled(Box)(() => ({
  width: '220px',
  height: '220px',
  background: Colors.secondaryWhite,
  border: `1px solid ${Colors.primary}`,
  position: 'absolute',
  top: '150px',
  right: '20px',
  padding: '5px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: '10',
})) as typeof Box;

export const CloseBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  top: '0',
  background: Colors.lightGray,
  position: 'fixed',
  opacity: '0',
  zIndex: '10',
})) as typeof Box;

export const SortButton = styled(Button)(() => ({
  width: '90%',
  height: '40px',
  background: Colors.secondaryWhite,
  border: `1px solid ${Colors.primary}`,
  padding: '5px',
  borderRadius: '0px',
  margin: '5px 0px',
  color: Colors.black,
  fontSize: '14px',
  fontWeight: '200',
  ':hover': {
    background: Colors.primary,
    color: Colors.secondaryWhite,
  },
}));

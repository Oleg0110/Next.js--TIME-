import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import theme, { Colors } from '../theme';

export const CartDrawer = styled(Box)(() => ({
  width: '20px',
  height: '50px',
  backgroundColor: Colors.secondaryWhite,
})) as typeof Box;

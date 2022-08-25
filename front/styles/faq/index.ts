import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../theme';

export const MainFAQBox = styled(Box)(() => ({
  backgroundColor: Colors.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '30px 20px 0px 20px',
})) as typeof Box;

export const ContentFAQBox = styled(Box)(() => ({
  display: 'flex',
  width: '1200px',
  flexDirection: 'column',
  alignItems: 'center',
})) as typeof Box;

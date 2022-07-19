import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const BagPageContainer = styled(Box)(() => ({
  backgroundColor: Colors.primary,
  width: '100%',
  minHeight: '600px',
  margin: 0,
  padding: '0px 10px',
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
})) as typeof Box;

export const BagPageContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  marginBottom: '30px',
})) as typeof Box;

export const ProductOnBagBox = styled(Box)(() => ({
  width: '100%',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${Colors.secondaryWhite}`,
})) as typeof Box;

export const ProductOnBagContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})) as typeof Box;

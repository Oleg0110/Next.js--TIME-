import theme, { Colors } from '../theme';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ErrorContainer = styled(Box)(() => ({
  backgroundColor: Colors.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '0px 10px',
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
})) as typeof Box;

export const ErrorContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    marginTop: '-10px',
  },
})) as typeof Box;

export const WarningBox = styled(Box)(() => ({
  marginTop: '-95px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    marginTop: '-50px',
  },
})) as typeof Box;

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { Colors } from '../theme';

export const MainContainer = styled(Box)(() => ({
  maxWidth: '647px',
  height: '224px',
  borderBottom: `1px solid ${Colors.primary}`,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
})) as typeof Box;

export const PhotoContainer = styled(Box)(() => ({
  width: '265px',
  height: '184px',
  border: `1px solid ${Colors.primary}`,
})) as typeof Box;

export const InfoContainer = styled(Box)(() => ({
  width: '265px',
  height: '184px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
})) as typeof Box;

export const RemoveBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
})) as typeof Box;

export const RemoveButton = styled(Button)(() => ({
  color: Colors.darkGray,
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: 200,
  width: '95px',
  textTransform: 'none',
  paddingRight: '0px',
  ':hover': {
    backgroundColor: Colors.secondaryWhite,
    fontWeight: 300,
  },
}));

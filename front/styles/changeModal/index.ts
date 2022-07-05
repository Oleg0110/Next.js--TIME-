import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const MainChangeModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '550px',
  maxHeight: '500px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '4px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.lightGray,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.darkGray,
    border: `4px solid ${Colors.lightGray}`,
    borderRadius: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '370px',
  },
})) as typeof Box;

export const ChangeProductStateBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0 15px',
})) as typeof Box;

export const InfoChangeBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-betweens',
})) as typeof Box;

export const DescriptionChangeBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0 15px',
  justifyContent: 'center',
})) as typeof Box;

export const ChangeClickPosition = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  margin: '30px 0px',
})) as typeof Box;

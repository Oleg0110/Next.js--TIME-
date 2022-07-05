import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const MainAdminBox = styled(Box)(() => ({
  backgroundColor: Colors.secondaryWhite,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  width: '100%',
  minHeight: '456px',
  margin: 0,
  padding: '30px 20px 0px 20px',
  [theme.breakpoints.down('md')]: {
    padding: '10px 5px 0px 5px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0px 5px',
  },
})) as typeof Box;

export const AdminContent = styled(Box)(() => ({
  display: 'flex',
  width: '1120px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})) as typeof Box;

export const ButtonAdminBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '15px',
})) as typeof Box;

export const ButtonAdminStyle = styled(Button)(() => ({
  fontWeight: 400,
  width: '250px',
  fontSize: '20px',
  color: Colors.darkGray,
  backgroundColor: Colors.secondaryWhite,
  border: 'none',
  borderRadius: '0px',
  borderBottom: `3px solid ${Colors.darkGray}`,
  textTransform: 'none',
  margin: '10px',
  ':hover': {
    border: 'none',
    backgroundColor: Colors.secondaryWhite,
    color: Colors.primary,
    borderBottom: `3px solid ${Colors.primary}`,
  },
  [theme.breakpoints.down('lg')]: {
    width: '190px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100px',
    fontSize: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '75px',
    fontSize: '9px',
  },
}));

//Add Product

export const AddProductBox = styled(Box)(() => ({
  display: 'flex',
  // maxWidth: '1000px',
  width: '1000px',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '15px',
})) as typeof Box;

export const AddMainFormBox = styled(Box)(() => ({
  display: 'flex',
  width: '400px',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '5px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  [theme.breakpoints.down('sm')]: {
    width: '350px',
  },
})) as typeof Box;

export const AddFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '5px',
})) as typeof Box;

export const ProductStateBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0 15px',
})) as typeof Box;

export const InfoAddBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-betweens',
})) as typeof Box;

export const DescriptionOptionsBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0 15px',
  justifyContent: 'center',
})) as typeof Box;

export const ColorRadioBox = styled(Box)(() => ({
  width: '20px',
  height: '20px',
  padding: '3px',
  backgroundColor: Colors.secondaryWhite,
  border: `1px solid ${Colors.primary}`,
})) as typeof Box;

export const ColorBox = styled(Box)(() => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: Colors.black,
})) as typeof Box;

export const ButtonClickPosition = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})) as typeof Box;

// Change or Delete

export const ChangeDeleteBox = styled(Box)(() => ({
  display: 'flex',
  maxWidth: '1000px',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '15px',
  [theme.breakpoints.down('sm')]: {
    padding: '0px',
    marginBottom: '15px',
  },
})) as typeof Box;

export const ChangeDeleteMainFormBox = styled(Box)(() => ({
  display: 'flex',
  width: '550px',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '5px',
  backgroundColor: Colors.secondaryWhite,
  border: `2px solid ${Colors.primary}`,
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    width: '350px',
  },
})) as typeof Box;

export const ChangeDeleteFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '5px',
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    width: '85%',
  },
})) as typeof Box;

export const ChangeDeleteStateBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0 15px',
})) as typeof Box;

export const InfoChangeDeleteBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-betweens',
})) as typeof Box;

export const Davay = styled(Box)(() => ({
  width: '100%',
  maxHeight: '150px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.secondaryWhite,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.darkGray,
    border: `4px solid ${Colors.lightGray}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const FoundProductBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderTop: `1px solid ${Colors.primary}`,
})) as typeof Box;

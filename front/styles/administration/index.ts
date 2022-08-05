import { Badge, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorMessage, Field } from 'formik';
import theme, { Colors } from '../theme';

export const MainAdminBox = styled(Box)(() => ({
  backgroundColor: Colors.secondaryWhite,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  width: '100%',
  minHeight: '456px',
  margin: 0,
  padding: '30px 20px 50px 20px',
  [theme.breakpoints.down('md')]: {
    padding: '10px 5px 20px 5px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0px 5px 5px 5px',
  },
})) as typeof Box;

export const AdminPageBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})) as typeof Box;

export const AdminContent = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'start',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
})) as typeof Box;

export const ButtonAdminBox = styled(Box)(() => ({
  display: 'flex',
  width: '200px',
  alignItem: 'start',
  justifyContent: 'center',
  flexDirection: 'column-reverse',
  padding: '15px',
  [theme.breakpoints.down('md')]: {
    width: '70%',
    flexDirection: 'row-reverse',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
})) as typeof Box;

export const StyledOrdersBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    background: 'transparent',
    color: Colors.saleColor,
    right: '-24px',
    top: '10px',
    fontSize: '17px',
    fontWeight: '600',
    [theme.breakpoints.down('md')]: {
      right: '-13px',
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      right: '-8px',
      top: '7px',
      fontSize: '10px',
    },
  },
}));

export const ButtonAdminStyle = styled(Button)(() => ({
  fontWeight: 400,
  width: '160px',
  fontSize: '15px',
  color: Colors.darkGray,
  backgroundColor: Colors.secondaryWhite,
  border: 'none',
  borderRadius: '0px',
  borderBottom: `2px solid ${Colors.darkGray}`,
  textTransform: 'none',
  margin: '5px 5px 0px 5px',
  padding: '0px',
  height: '25px',
  ':hover': {
    fontWeight: 500,
    border: 'none',
    backgroundColor: Colors.secondaryWhite,
    color: Colors.primary,
    borderBottom: `2px solid ${Colors.primary}`,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '5px',
  },
}));

//Add Product

export const AddProductBox = styled(Box)(() => ({
  display: 'flex',
  width: '80%',
  alignItem: 'center',
  justifyContent: 'center',
  padding: '15px',
})) as typeof Box;

export const AddMainFormBox = styled(Box)(() => ({
  display: 'flex',
  width: '400px',
  alignItems: 'center',
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
  alignItems: 'center',
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

export const AddMainPhotoBox = styled(Box)(() => ({
  width: '125px',
  height: '125px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: Colors.secondaryDarkWhite,
  margin: '5px',
  cursor: 'pointer',
  border: `1px dashed`,
  ':hover': {
    background: Colors.lightGray,
  },
})) as typeof Box;

export const MainPhotoBox = styled(Box)(() => ({
  margin: '5px',
  width: '125px',
  height: '125px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    opacity: '0.8',
  },
})) as typeof Box;

export const AddPhotoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
})) as typeof Box;

export const PhotosBox = styled(Box)(() => ({
  display: 'flex',
  overflowX: 'auto',
  margin: '0 auto',
  maxWidth: '350px',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.secondaryWhite,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.primary,
    border: `4px solid ${Colors.secondaryWhite}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const PhotoBox = styled(Box)(() => ({
  ':hover': {
    opacity: '0.8',
  },
})) as typeof Box;

export const ButtonAddPhotos = styled(Button)(() => ({
  fontSize: '12px',
  width: '100px',
  height: '22px',
  color: '#000',
  border: '1px solid',
  background: Colors.secondaryDarkWhite,
  ':hover': {
    color: '#000',
    background: Colors.lightGray,
  },
}));

export const DescriptionOptionsBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0 15px',
  justifyContent: 'center',
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
  width: '80%',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '15px',
  [theme.breakpoints.down('sm')]: {
    padding: '0px',
    marginBottom: '15px',
    justifyContent: 'center',
  },
})) as typeof Box;

export const ChangeDeleteMainFormBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'start',
  justifyContent: 'center',
  padding: '5px',
  backgroundColor: Colors.secondaryWhite,
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    width: '350px',
  },
})) as typeof Box;

export const ChangeDeleteFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '5px 5px 5px 20px',
  width: '45%',
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

export const AdminLoadingBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
})) as typeof Box;

export const UserSearchBox = styled(Box)(() => ({
  width: '100%',
  maxHeight: '265px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.secondaryWhite,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.primary,
    border: `4px solid ${Colors.secondaryWhite}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const FoundProductBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  padding: '5px 5px 5px 15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderTop: `1px solid ${Colors.primary}`,
})) as typeof Box;

export const ProductSearchScroll = styled(Box)(() => ({
  width: '100%',
  maxHeight: '320px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.secondaryWhite,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.primary,
    border: `4px solid ${Colors.secondaryWhite}`,
    borderRadius: '10px',
  },
})) as typeof Box;

// User Management

export const UserManagementBox = styled(Box)(() => ({
  display: 'flex',
  width: '80%',
  alignItems: 'start',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: '15px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    padding: '0px',
    marginBottom: '15px',
  },
})) as typeof Box;

export const UserManagementMainFormBox = styled(Box)(() => ({
  display: 'flex',
  width: '45%',
  minWidth: '430px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  backgroundColor: Colors.secondaryWhite,
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    alignItems: 'start',
    minWidth: '360px',
    width: '100%',
    margin: '20px 0px',
  },
})) as typeof Box;

export const UserManagementTeamBox = styled(Box)(() => ({
  display: 'flex',
  width: '45%',
  minWidth: '430px',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '5px',
  backgroundColor: Colors.secondaryWhite,
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    minWidth: '360px',
    alignItems: 'start',
    width: '100%',
    marginBottom: '20px',
  },
})) as typeof Box;

export const UserManagementInputBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
})) as typeof Box;

export const UserManagementFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    width: '85%',
  },
})) as typeof Box;

// Order

export const OrderBox = styled(Box)(() => ({
  display: 'flex',
  width: '80%',
  alignItems: 'center',
  justifyContent: 'start',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    marginBottom: '15px',
  },
})) as typeof Box;

export const OrderMainBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  backgroundColor: Colors.secondaryWhite,
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    width: '350px',
  },
})) as typeof Box;

export const UnConfirmedOrdersBox = styled(Box)(() => ({
  padding: '5px',
  width: '100%',
  maxHeight: '540px',
  borderBottom: `1px solid ${Colors.primary}`,
})) as typeof Box;

export const OrdersScrollBox = styled(Box)(() => ({
  width: '100%',
  maxHeight: '420px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.secondaryWhite,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.primary,
    border: `4px solid ${Colors.secondaryWhite}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const ConfirmedOrdersBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '27px 5px',
  width: '100%',
  flexDirection: 'column',
})) as typeof Box;

export const OrdersProductsBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  width: '100%',
  flexDirection: 'column',
  marginTop: '20px',
})) as typeof Box;

export const AdminFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '5px',
  marginBottom: '10px',
  width: '100%',
})) as typeof Box;

export const SearchAdminFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-betweens',
  marginLeft: '20px',
  position: 'relative',
})) as typeof Box;

export const SearchAdminFormError = styled(ErrorMessage)(() => ({
  position: 'absolute',
  top: '32px',
  left: '135px',
  color: Colors.saleColor,
}));

export const SearchAdminFormInput = styled(Field)(() => ({
  fontFamily: 'Roboto',
  fontWeight: '400',
  fontSize: '20px',
  width: '100%',
  height: '30px',
  padding: '5px',
  border: `1px solid ${Colors.primary}`,
})) as typeof Field;

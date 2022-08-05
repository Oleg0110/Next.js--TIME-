import theme, { Colors } from '../theme';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorMessage, Field } from 'formik';

//Change Modal

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

//Choose Size Modal
export const ChooseSizeModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '550px',
  height: '125px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof Box;

export const ChooseSizeBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0 15px',
  justifyContent: 'center',
})) as typeof Box;

//Check Password  Modal
export const CheckPasswordModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '170px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
})) as typeof Box;

export const CheckPasswordBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
})) as typeof Box;

export const ModalInputBox = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
})) as typeof Box;

export const ModalErrorMessage = styled(ErrorMessage)(() => ({
  position: 'absolute',
  top: '40px',
  color: '#e64848',
})) as typeof ErrorMessage;

export const InputModal = styled(Field)(() => ({
  width: '100%',
  fontFamily: 'Roboto',
  fontSize: '24px',
  fontWeight: 200,
  color: Colors.primary,
  lineHeight: '28.13px',
  background: Colors.secondaryWhite,
  border: `1px solid ${Colors.primary}`,
  padding: '0px 45px 0px 10px',
  margin: '10px 0px 25px',
})) as typeof Field;

//Check Password  Modal
export const ChangePasswordModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  minHeight: '150px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
})) as typeof Box;

export const ChangePasswordBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
})) as typeof Box;

export const ContinueBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
})) as typeof Box;

export const FormChangePasswordBox = styled(Box)(() => ({
  width: '240px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})) as typeof Box;

export const ChangePasswordErrorMessage = styled(ErrorMessage)(() => ({
  position: 'absolute',
  top: '40px',
  left: '20px',
  color: '#e64848',
})) as typeof ErrorMessage;

export const InputChangePasswordModal = styled(Field)(() => ({
  width: '100%',
  fontFamily: 'Roboto',
  fontSize: '24px',
  fontWeight: 200,
  color: Colors.primary,
  lineHeight: '28.13px',
  background: Colors.secondaryWhite,
  border: `1px solid ${Colors.primary}`,
  padding: '0px 0px 0px 10px',
  margin: '10px',
})) as typeof Field;

//Appoint  Modal
export const AppointModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '170px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
})) as typeof Box;

export const OptionsAppointBox = styled(Box)(() => ({
  display: 'flex',
  width: '40%',
  alignItems: 'center',
  justifyContent: 'space-around',
})) as typeof Box;

//Shopping and Favorite Bag  Modal
export const BagMainModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '370px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '20px 4px 4px 4px',
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
  [theme.breakpoints.down('sm')]: {
    width: '370px',
  },
})) as typeof Box;

//Global Product Search Modal
export const GlobalSearchMainModalBox = styled(Box)(() => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '370px',
  backgroundColor: Colors.secondaryWhite,
  border: `6px solid ${Colors.primary}`,
  padding: '4px',
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
  [theme.breakpoints.down('sm')]: {
    width: '370px',
  },
})) as typeof Box;

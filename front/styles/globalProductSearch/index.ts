import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorMessage, Field } from 'formik';
import { Colors } from '../theme';

export const SearchGlobalFormBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-betweens',
  margin: '0px 10px 0px 20px',
  position: 'relative',
})) as typeof Box;

export const SearchIconBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
})) as typeof Box;

export const SearchGlobalFormError = styled(ErrorMessage)(() => ({
  position: 'absolute',
  top: '5px',
  right: '10px',
  color: Colors.saleColor,
})) as typeof ErrorMessage;

export const SearchGlobalFormInput = styled(Field)(() => ({
  fontFamily: 'Roboto',
  fontWeight: '400',
  fontSize: '20px',
  width: '100%',
  height: '30px',
  padding: '5px 100px 5px 5px',
  border: `1px solid ${Colors.primary}`,
})) as typeof Field;

export const SearchGlobalLoadingBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
})) as typeof Box;

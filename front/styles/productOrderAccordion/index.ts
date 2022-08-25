import theme, { Colors } from '../theme';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProductOrderAccordionBox = styled(Accordion)(() => ({
  position: 'unset',
  boxShadow: 'none',
  margin: '0px',
  background: Colors.secondaryWhite,
  width: '100%',
  borderRadius: '0px',
  border: '0px',
  borderTop: `1px solid ${Colors.primary}`,
  '.scss-o4b71y-MuiAccordionSummary-content.Mui-expanded ': {
    margin: '0px',
  },
  '.scss-15v22id-MuiAccordionDetails-root': {
    padding: '0px 30px 16px',
  },
})) as typeof Accordion;

export const SummaryOrderAccordion = styled(AccordionSummary)(() => ({
  ':hover': {
    opacity: '0.5',
  },
}));

export const DetailsOrderAccordion = styled(AccordionDetails)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px',
}));

export const ProductsOrderAccordion = styled(Box)(() => ({
  width: '100%',
  maxHeight: '250px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.secondaryWhite,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.lightGray,
    border: `6px solid ${Colors.secondaryWhite}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const CustomerInfoBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  paddingLeft: '2%',
  marginBottom: '20px',
})) as typeof Box;

export const OrderInformationBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10% 0 2%',
  margin: '20px 0px',
  [theme.breakpoints.down('sm')]: {
    margin: '5px 0px 20px',
    padding: '0px',
    flexDirection: 'column',
  },
})) as typeof Box;

export const ProductTotalPriceBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: '10px',
  },
})) as typeof Box;

export const ConfirmButtonPosition = styled(Box)(() => ({
  minWidth: '180px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})) as typeof Box;

// Order Product

export const ProductAccordionBox = styled(Box)(() => ({
  width: '100%',
  minHeight: '70px',
  borderBottom: `1px solid ${Colors.secondaryWhite}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  padding: '8px 15px',
  margin: '10px 0px',
  border: '1px dotted',
  [theme.breakpoints.down('sm')]: {
    width: '98%',
    margin: '10px 0px 10px 2px',
    padding: '8px 0px',
  },
})) as typeof Box;

export const ProductOrderPhotoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '50%',
  marginLeft: '5px',
  [theme.breakpoints.down('sm')]: {
    width: '60%',
  },
})) as typeof Box;

export const ProductOrderInfo = styled(Box)(() => ({
  width: '50%',
  minHeight: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '0px 10px 0px 20px',
  [theme.breakpoints.down('sm')]: {
    margin: '0px 0px 0px 5px',
  },
})) as typeof Box;

export const ProductOrderAcountPrice = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '45%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
})) as typeof Box;

export const ProductOrderCount = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '50%',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '75%',
    marginBottom: '5px',
  },
})) as typeof Box;

export const ProductOrderPrice = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '50%',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '75%',
  },
})) as typeof Box;

export const ProductOnBagRemove = styled(Box)(() => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    top: '0px',
    right: '-5px',
  },
})) as typeof Box;

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const UserOrderAccordionBox = styled(Accordion)(() => ({
  position: 'unset',
  boxShadow: 'none',
  background: Colors.primary,
  width: '100%',
  borderRadius: '3px',
  border: `1px solid ${Colors.secondaryWhite}`,
  padding: '10px',
  margin: '15px 0px',
  '.scss-o4b71y-MuiAccordionSummary-content.Mui-expanded ': {
    margin: '0px',
  },
  '.scss-15v22id-MuiAccordionDetails-root': {
    padding: '0px 30px 16px',
  },
})) as typeof Accordion;

export const SummaryUserOrderAccordion = styled(AccordionSummary)(() => ({
  ':hover': {
    opacity: '0.5',
  },
}));

export const DetailsUserOrderAccordion = styled(AccordionDetails)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px',
}));

export const UserAccordionScroll = styled(Box)(() => ({
  width: '100%',
  maxHeight: '250px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-track': {
    background: Colors.primary,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: Colors.lightGray,
    border: `6px solid ${Colors.secondaryWhite}`,
    borderRadius: '10px',
  },
})) as typeof Box;

export const UserOrderInfoBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  paddingLeft: '2%',
  marginBottom: '20px',
})) as typeof Box;

export const UserOrderInformationBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10% 0 2%',
  margin: '20px 0px',
})) as typeof Box;

export const UserOrderPriceBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
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
})) as typeof Box;

export const ProductOrderPhotoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '50%',
})) as typeof Box;

export const ProductOrderInfo = styled(Box)(() => ({
  width: '50%',
  minHeight: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '0px 10px 0px 20px',
})) as typeof Box;

export const ProductOrderCount = styled(Box)(() => ({
  display: 'flex',
  width: '20%',
})) as typeof Box;

export const ProductOrderPrice = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '25%',
  justifyContent: 'space-between',
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

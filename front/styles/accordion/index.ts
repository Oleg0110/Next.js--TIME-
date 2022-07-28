import { AccordionSummary, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../theme';

export const SummaryAccordion = styled(AccordionSummary)(() => ({
  ':hover': {
    opacity: '0.5',
  },
}));

export const ReviewBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
})) as typeof Box;

export const ReviewField = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof Box;

export const OpenComment = styled(Button)(() => ({
  background: Colors.secondaryWhite,
  marginLeft: '20px',
  border: '0px',
  fontSize: '20px',
  padding: '0px',
  ':hover': {
    background: Colors.secondaryWhite,
    border: '0px',
    color: Colors.darkGray,
  },
}));

// Review Form

export const RatingBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
})) as typeof Box;

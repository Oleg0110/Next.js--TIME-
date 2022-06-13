import { AccordionSummary } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme, { Colors } from '../theme';

export const SummaryAccordion = styled(AccordionSummary)(() => ({
  ':hover': {
    opacity: '0.5',
  },
}));

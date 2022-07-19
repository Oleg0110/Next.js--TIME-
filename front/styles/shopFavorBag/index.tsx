import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';
import { Colors } from '../theme';

export const ResultBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
})) as typeof Box;

export const TotalBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '30px',
})) as typeof Box;

export const ButtonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '30px',
})) as typeof Box;

export const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    background: Colors.darkGray,
    color: Colors.secondaryWhite,
    right: 3,
    top: 6,
    // padding: '0px',
    // fontSize: '13px',
  },
}));

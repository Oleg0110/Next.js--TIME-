import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { Colors } from '../theme';

export const UserReviewManiContainer = styled(Box)(() => ({
  width: '95%',
  minHeight: '100px',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  margin: '10px',
  padding: '10px',
  borderBottom: `1px solid ${Colors.primary}`,
  position: 'relative',
})) as typeof Box;

export const ReviewUser = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
})) as typeof Box;

export const CommentField = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',
  padding: ' 0px 0px 20px 20px',
  minHeight: '75px',
  borderLeft: `1px solid ${Colors.lightGray}`,
  wordBreak: 'break-word',
})) as typeof Box;

export const CommentDate = styled(Box)(() => ({
  position: 'absolute',
  bottom: '5%',
  right: '3%',
})) as typeof Box;

export const TextButtonPosition = styled(Box)(() => ({
  position: 'absolute',
  bottom: '2%',
  left: '26%',
})) as typeof Box;

export const TextButton = styled(Button)(() => ({
  background: 'Transparent',
  border: '0px',
  fontSize: '15px',
  padding: '0px',
  ':hover': {
    background: 'Transparent',
    border: '0px',
    color: Colors.darkGray,
  },
}));

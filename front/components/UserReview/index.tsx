import React, { useState } from 'react';
import { Rating, Typography } from '@mui/material';
import {
  CommentDate,
  CommentField,
  UserReviewManiContainer,
  ReviewUser,
  TextButton,
  TextButtonPosition,
} from '../../styles/userReview';
import theme, { Colors } from '../../styles/theme';
import { NextPage } from 'next';

interface IUserReview {
  userName: string;
  rating: number | null;
  comment: string;
  date: number;
}

const commentStyle = {
  color: Colors.black,
  textAlign: 'start',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
  },
};

const UserReview: NextPage<IUserReview> = ({
  userName,
  rating,
  comment,
  date,
}) => {
  const [isMore, setIsMore] = useState(false);

  const lettersCount = comment.split('');
  const lessText = comment.split('').slice(0, 150);

  return (
    <UserReviewManiContainer>
      <ReviewUser>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          sx={{
            color: Colors.primary,
            [theme.breakpoints.down('sm')]: {
              fontSize: '15px',
            },
          }}
        />
        <Typography
          variant="roboto20400"
          sx={{
            color: Colors.black,
            [theme.breakpoints.down('sm')]: {
              fontSize: '10px',
            },
          }}
        >
          {userName}
        </Typography>
      </ReviewUser>
      <CommentField>
        {lettersCount.length > 150 && !isMore ? (
          <Typography variant="roboto16200" sx={commentStyle}>
            {lessText}...
          </Typography>
        ) : (
          !isMore && (
            <Typography variant="roboto16200" sx={commentStyle}>
              {comment}
            </Typography>
          )
        )}
        {isMore && (
          <Typography variant="roboto16200" sx={commentStyle}>
            {comment}
          </Typography>
        )}
        {lettersCount.length > 150 && (
          <TextButtonPosition>
            <TextButton onClick={() => setIsMore(!isMore)}>
              {isMore === false ? 'More' : 'Less'}
            </TextButton>
          </TextButtonPosition>
        )}
        <CommentDate>
          <Typography
            variant="roboto24500"
            sx={{ color: Colors.darkGray, fontSize: '10px' }}
          >
            {date === 0 ? 'today' : `${date} days ago`}
          </Typography>
        </CommentDate>
      </CommentField>
    </UserReviewManiContainer>
  );
};

export default UserReview;

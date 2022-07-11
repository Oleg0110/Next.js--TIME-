import React, { useState } from 'react';
import { Button, Rating, Typography } from '@mui/material';
import {
  CommentDate,
  CommentField,
  CustomerReviewManiContainer,
  ReviewCustomer,
  TextButton,
  TextButtonPosition,
} from '../../styles/customerReview';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';

interface ICustomerReview {
  userName: string;
  rating: number | null;
  comment: string;
  date: number;
}

const CustomerReview: NextPage<ICustomerReview> = ({
  userName,
  rating,
  comment,
  date,
}) => {
  const [isMore, setIsMore] = useState(false);

  const lettersCount = comment.split('');
  const lessText = comment.split('').slice(0, 150);

  const commentStyle = {
    color: Colors.black,
    textAlign: 'start',
  };

  return (
    <CustomerReviewManiContainer>
      <ReviewCustomer>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          sx={{ color: Colors.primary }}
        />
        <Typography variant="roboto20400" sx={{ color: Colors.black }}>
          {userName}
        </Typography>
      </ReviewCustomer>
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
    </CustomerReviewManiContainer>
  );
};

export default CustomerReview;

import { Rating, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { number, object, string } from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { addReview } from '../../store/services/ProductService';
import { RatingBox } from '../../styles/accordion';
import styles from '../../styles/AdminPage.module.scss';
import { Colors } from '../../styles/theme';
import CustomButton from '../CustomButton';

interface IReviewForm {
  setIsOpen: (boolean: boolean) => void;
}

const ReviewForm: NextPage<IReviewForm> = ({ setIsOpen }) => {
  const [value, setValue] = useState<number | null>(2);
  const router = useRouter();
  const productId = `${router.query.id}`;

  const dispatch = useAppDispatch();

  const validationSchema = object().shape({
    comment: string()
      .min(20, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required Comment'),
    rating: number().min(1, 'Min 1 star').max(5, 'Max 5 Stars').required(),
  });

  const userId = '6290e06eafaf40d5247f3818';

  return (
    <Formik
      initialValues={{ comment: '', rating: 0 }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const data = await dispatch(
          addReview({
            comment: values.comment,
            productId,
            userId,
            rating: values.rating,
          })
        );
        console.log(data);
        setIsOpen(false);
      }}
    >
      {({ setFieldValue, handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <RatingBox>
              <Typography
                variant="roboto16400"
                sx={{ color: Colors.black, marginRight: '10px' }}
              >
                Rating
              </Typography>

              <Rating
                name="rating"
                value={value}
                size="large"
                // precision={0.5}
                sx={{ color: Colors.primary, marginRight: '20px' }}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setFieldValue('rating', newValue);
                }}
              />
              <ErrorMessage
                name="rating"
                component="span"
                className={styles.errorStyle}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={styles.errorStyle}
              />
            </RatingBox>
            <Field
              as="textarea"
              name="comment"
              id="comment"
              placeholder="Comment"
              className={styles.textArea}
            />
            <CustomButton size="SM" type="submit">
              Add Review
            </CustomButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReviewForm;

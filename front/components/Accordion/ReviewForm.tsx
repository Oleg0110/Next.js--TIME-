import React, { useState } from 'react';
import { CircularProgress, Rating, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { number, object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addReview } from '../../store/services/ProductService';
import { RatingBox } from '../../styles/accordion';
import { Colors } from '../../styles/theme';
import { useTranslation } from 'next-i18next';
import CustomButton from '../CustomButton';
import styles from '../../styles/AdminPage.module.scss';

interface IReviewForm {
  setIsOpen: (boolean: boolean) => void;
}

const ReviewForm: NextPage<IReviewForm> = ({ setIsOpen }) => {
  const { t } = useTranslation('accordion');

  const [value, setValue] = useState<number | null>(2);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const productId = `${router.query.id}`;

  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.product);

  const validationSchema = object().shape({
    comment: string()
      .min(10, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required Comment'),
    rating: number().min(1, 'Min 1 star').max(5, 'Max 5 Stars').required(),
  });

  return (
    <Formik
      initialValues={{ comment: '', rating: 0 }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await dispatch(
          addReview({
            comment: values.comment,
            productId,
            userId: user.id,
            rating: values.rating,
          })
        );
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
                {t('rating')}
              </Typography>
              <Rating
                name="rating"
                value={value}
                size="large"
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
            {isLoading ? (
              <CircularProgress
                sx={{ color: Colors.primary, margin: '25px 0px' }}
                disableShrink
                size="25px"
              />
            ) : (
              <CustomButton size="SM" type="submit">
                {t('add-review')}
              </CustomButton>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReviewForm;

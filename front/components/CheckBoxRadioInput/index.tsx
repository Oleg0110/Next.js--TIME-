import React from 'react';
import { Field } from 'formik';
import { NextPage } from 'next';
import styles from '../../styles/radioInput.module.scss';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';

interface IRadioInput {
  type: 'color' | 'size' | 'material' | 'style';
  value: string;
  htmlFor: string;
  fieldName: string;
  valueName?: string;
}

const RadioInput: NextPage<IRadioInput> = ({
  type,
  value,
  htmlFor,
  fieldName,
  valueName,
}) => {
  return (
    <>
      {type === 'color' && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="radio"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.colorRadioBox}>
            <div
              className={`${styles[`color-${value}`]} ${styles.colorProperty}`}
            />
          </label>
        </>
      )}
      {type === 'size' && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="checkbox"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.sizeCheckbox}>
            <Typography variant="roboto24200" color={Colors.black}>
              {value}
            </Typography>
          </label>
        </>
      )}
      {type === 'style' && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="radio"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.styleMaterialButton}>
            {valueName}
          </label>
        </>
      )}
      {type === 'material' && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="radio"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.styleMaterialButton}>
            <div className={styles[`color-${value}`]}>{valueName}</div>
          </label>
        </>
      )}
    </>
  );
};

export default RadioInput;

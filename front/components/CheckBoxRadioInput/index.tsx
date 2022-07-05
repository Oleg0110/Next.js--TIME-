import React from 'react';
import { Field } from 'formik';
import { NextPage } from 'next';
import styles from '../../styles/radioInput.module.scss';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';

interface IRadioInput {
  type: 'color' | 'size' | 'material' | 'style';
  inputType?: 'radio';
  value: string;
  htmlFor: string;
  fieldName: string;
  valueName?: string;
  filter?: boolean;
  isSize?: boolean;
}

const CheckBoxRadioInput: NextPage<IRadioInput> = ({
  type,
  value,
  htmlFor,
  fieldName,
  valueName,
  filter,
  inputType,
  isSize,
}) => {
  return (
    <>
      {type === 'color' && !filter && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="radio"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.colorBox}>
            <div
              className={`${styles[`color-${value}`]} ${styles.colorProperty}`}
            />
          </label>
        </>
      )}
      {type === 'color' && filter && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="checkbox"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.colorBox}>
            <div
              className={`${styles[`color-${value}`]} ${styles.colorProperty}`}
            />
          </label>
        </>
      )}
      {type === 'size' && !inputType && (
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
      {type === 'size' && inputType === 'radio' && (
        <>
          {!isSize ? (
            <div className={styles.sizeCheckboxDisable}>
              <Typography variant="roboto24200" color={Colors.lightGray}>
                {value}
              </Typography>
            </div>
          ) : (
            <>
              <Field
                className={`${styles.radioInput}`}
                type="radio"
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
        </>
      )}
      {type === 'style' && !filter && (
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
      {type === 'style' && filter && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="checkbox"
            name={fieldName}
            value={value}
            id={htmlFor}
          />
          <label htmlFor={htmlFor} className={styles.styleMaterialButton}>
            {valueName}
          </label>
        </>
      )}
      {type === 'material' && !filter && (
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
      {type === 'material' && filter && (
        <>
          <Field
            className={`${styles.radioInput}`}
            type="checkbox"
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

export default CheckBoxRadioInput;

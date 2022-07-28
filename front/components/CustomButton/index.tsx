import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { NextPage } from 'next';
import styles from '../../styles/button.module.scss';

type SizeType = 'XL' | 'LG' | 'MD' | 'SM';
type VariantType = 'primary' | 'secondary';
type ButtonType = 'button' | 'submit' | 'reset';

interface ICustomButtonProps {
  size: SizeType;
  isIcon?: boolean;
  style?: object;
  children: ReactNode;
  variant?: VariantType;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: () => void;
  type?: ButtonType;
}

const CustomButton: NextPage<ICustomButtonProps> = ({
  size = 'XL',
  style,
  isIcon = false,
  children,
  variant = 'primary',
  onClick,
  onSubmit,
  type,
}) => {
  return (
    (!isIcon && (
      <Button
        color={variant}
        size={`${size}`}
        sx={style}
        onClick={onClick}
        onSubmit={onSubmit}
        type={type}
      >
        {children}
      </Button>
    )) || (
      <Button
        color={variant}
        size={size}
        sx={style}
        onClick={onClick}
        onSubmit={onSubmit}
        type={type}
      >
        {children}
        <div className={styles.arrow} />
      </Button>
    )
  );
};

export default CustomButton;

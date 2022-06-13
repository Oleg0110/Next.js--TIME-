import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import styles from '../../styles/button.module.scss';

type SizeType = 'XL' | 'LG' | 'MD' | 'SM';
type VariantType = 'primary' | 'secondary';

interface ICustomButtonProps {
  size: SizeType;
  isIcon?: boolean;
  style?: object;
  children: ReactNode;
  variant?: VariantType;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: () => void;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  size = 'XL',
  style,
  isIcon = false,
  children,
  variant = 'primary',
  onClick,
  onSubmit,
}) => {
  return (
    (!isIcon && (
      <Button
        color={variant}
        size={`${size}`}
        style={style}
        onClick={onClick}
        onSubmit={onSubmit}
      >
        {children}
      </Button>
    )) || (
      <Button
        color={variant}
        size={size}
        style={style}
        onClick={onClick}
        onSubmit={onSubmit}
      >
        {children}
        <div className={styles.arrow} />
      </Button>
    )
  );
};

export default CustomButton;

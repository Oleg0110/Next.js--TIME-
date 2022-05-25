import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { TooltipPositionTypes } from '../utils/types';

interface TooltipIconProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: () => void;
  children: any;
  title: string;
  placement?: TooltipPositionTypes;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({
  children,
  title,
  placement = 'top',
  onClick,
}) => {
  return (
    <Tooltip title={title} placement={placement}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};

export default TooltipIcon;

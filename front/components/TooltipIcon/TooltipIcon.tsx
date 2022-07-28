import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  TooltipPositionTypes,
  TooltipTitleTypes,
} from '../../utils/types/types';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';

interface TooltipIconProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: () => void;
  children: any;
  title: TooltipTitleTypes;
  placement?: TooltipPositionTypes;
  style?: object;
}

const TooltipIcon: NextPage<TooltipIconProps> = ({
  children,
  title,
  placement = 'top',
  onClick,
  style,
}) => {
  const { t } = useTranslation('common');

  return (
    <Tooltip title={t(title)} placement={placement} sx={style}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};

export default TooltipIcon;

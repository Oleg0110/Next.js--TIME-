import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { Slide, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { CloseBox, SortButton, SortingMainBox } from '../../styles/sorting';
import { sortingDataName } from '../../utils/constants';

type ActiveType =
  | 'cheap to expensive'
  | 'expensive to cheap'
  | 'novelty'
  | 'maximum discount'
  | 'empty';

interface ISortingMenuProps {
  category: string;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  setIsActive: (string: ActiveType) => void;
  isActive: ActiveType;
}

const SortingMenu: NextPage<ISortingMenuProps> = ({
  isOpen,
  setIsOpen,
  category,
  setIsActive,
  isActive,
}) => {
  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');

  const setFunc = (sort) => {
    setIsActive(sort);
    localStorage.setItem(sortingDataName, sort);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <CloseBox onClick={() => setIsOpen(false)} />
          <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
            <SortingMainBox>
              <SortButton
                onClick={() => setFunc('cheap to expensive')}
                sx={
                  isActive === 'cheap to expensive' && {
                    background: Colors.primary,
                    color: Colors.secondaryWhite,
                  }
                }
              >
                from cheap to expensive
              </SortButton>
              <SortButton
                onClick={() => setFunc('expensive to cheap')}
                sx={
                  isActive === 'expensive to cheap' && {
                    background: Colors.primary,
                    color: Colors.secondaryWhite,
                  }
                }
              >
                from expensive to cheap
              </SortButton>
              <SortButton
                onClick={() => setFunc('novelty')}
                sx={
                  isActive === 'novelty' && {
                    background: Colors.primary,
                    color: Colors.secondaryWhite,
                  }
                }
              >
                for novelty
              </SortButton>
              <SortButton
                onClick={() => setFunc('maximum discount')}
                sx={
                  isActive === 'maximum discount' && {
                    background: Colors.primary,
                    color: Colors.secondaryWhite,
                  }
                }
              >
                maximum discount
              </SortButton>
            </SortingMainBox>
          </Slide>
        </>
      )}
    </>
  );
};

export default SortingMenu;

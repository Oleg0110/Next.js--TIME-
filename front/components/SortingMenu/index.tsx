import React from 'react';
import theme, { Colors } from '../../styles/theme';
import { Slide, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { CloseBox, SortButton, SortingMainBox } from '../../styles/sorting';
import { sortingDataName } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/redux';
import { getProducts } from '../../store/services/ProductService';
import { IProductFilter } from '../../utils/interface/productInterface';

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
  filters: IProductFilter;
}

const SortingMenu: NextPage<ISortingMenuProps> = ({
  isOpen,
  setIsOpen,
  category,
  setIsActive,
  isActive,
  filters,
}) => {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();

  const mediaSM = useMediaQuery(theme.breakpoints.down('sm'));

  const setFunc = async (sorting) => {
    setIsActive(sorting);
    localStorage.setItem(sortingDataName, sorting);
    if (category === 'women' || category === 'men') {
      await dispatch(getProducts({ category, filters, sorting }));
    } else {
      const categoryName = category.split('-')[1];
      const page = category.split('-')[0];
      await dispatch(
        getProducts({
          filters,
          category: categoryName,
          page,
          sorting,
        })
      );
    }
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <CloseBox onClick={() => setIsOpen(false)} />
          <Slide
            direction={mediaSM ? 'right' : 'left'}
            in={isOpen}
            mountOnEnter
            unmountOnExit
          >
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
                {t('cheap-to-expensive')}
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
                {t('expensive-to-cheap')}
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
                {t('novelty')}
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
                {t('maximum-discount')}
              </SortButton>
              {isActive !== 'empty' && (
                <SortButton onClick={() => setFunc('empty')}>
                  {t('without-sort')}
                </SortButton>
              )}
            </SortingMainBox>
          </Slide>
        </>
      )}
    </>
  );
};

export default SortingMenu;

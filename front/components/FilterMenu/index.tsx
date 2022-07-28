import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { Slide, Slider, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  FilterClickPosition,
  FilterOpenBox,
  FilterOptionsBox,
  InfoFilterBox,
  InputPriceBox,
  Line,
  SliderBox,
} from '../../styles/filter';
import {
  colorArray,
  filterDataName,
  materialArray,
  sizeArray,
  styleArray,
} from '../../utils/constants';
import { useAppDispatch } from '../../hooks/redux';
import { getProducts } from '../../store/services/ProductService';
import { IProductFilter } from '../../utils/interface/productInterface';
import { SortType } from '../../utils/types/product';
import styles from '../../styles/icons.module.scss';
import CustomButton from '../CustomButton';
import CheckBoxRadioInput from '../../components/CheckBoxRadioInput';

interface IFilterMenuProps {
  category: string;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  sorting: SortType;
}

const styleSpan = { width: '45%', color: Colors.primary };

const FilterMenu: NextPage<IFilterMenuProps> = ({
  category,
  isOpen,
  setIsOpen,
  sorting,
}) => {
  let filters: IProductFilter;
  let productPriceTo;
  let productPriceFrom;

  const { t } = useTranslation('filters');

  const dispatch = useAppDispatch();

  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    filters = JSON.parse(localStorage.getItem(filterDataName));
    productPriceFrom = filters.productPriceFrom;
    productPriceTo = filters.productPriceTo;
  }

  const [min, setMin] = useState(productPriceFrom);
  const [max, setMax] = useState(productPriceTo);

  const handleChange = (event, setFieldValue) => {
    setFieldValue('productPriceFrom', event.target.value[0]) &&
      setMin(event.target.value[0]);

    setFieldValue('productPriceTo', event.target.value[1]) &&
      setMax(event.target.value[1]);
  };

  const handleTextChange = (event, setFieldValue, typeValue: 'from' | 'to') => {
    typeValue === 'from' &&
      setFieldValue('productPriceFrom', event.target.value) &&
      setMin(event.target.value);

    typeValue === 'to' &&
      setFieldValue('productPriceTo', event.target.value) &&
      setMax(event.target.value);
  };

  const initialValues = filters && {
    productColor: filters.productColor,
    productStyleName: filters.productStyleName,
    productStyleMaterial: filters.productStyleMaterial,
    productPriceFrom: filters.productPriceFrom,
    productPriceTo: filters.productPriceTo,
    productSize: filters.productSize,
  };

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <FilterOpenBox>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values) => {
            await localStorage.setItem(filterDataName, JSON.stringify(values));

            if (category === 'women' || category === 'men') {
              await dispatch(
                getProducts({ category, filters: values, sorting })
              );
            } else {
              const categoryName = category.split('-')[1];
              const page = category.split('-')[0];
              await dispatch(
                getProducts({
                  filters: values,
                  category: categoryName,
                  page,
                  sorting,
                })
              );
            }

            setIsOpen(false);
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <InfoFilterBox>
                  <Typography variant="roboto24200" sx={styleSpan}>
                    {t('style')}
                  </Typography>
                </InfoFilterBox>
                <FilterOptionsBox>
                  {styleArray.map((data) => (
                    <div key={data.id}>
                      <CheckBoxRadioInput
                        type="style"
                        fieldName="productStyleName"
                        htmlFor={data.id}
                        key={data.id}
                        value={data.style}
                        valueName={data.styleName}
                        filter={true}
                      />
                    </div>
                  ))}
                </FilterOptionsBox>
                <InfoFilterBox>
                  <Typography variant="roboto24200" sx={styleSpan}>
                    {t('size')}
                  </Typography>
                </InfoFilterBox>
                <FilterOptionsBox>
                  {sizeArray.map((data) => (
                    <div key={data.id}>
                      <CheckBoxRadioInput
                        type="size"
                        fieldName="productSize"
                        htmlFor={data.id}
                        value={data.size}
                      />
                    </div>
                  ))}
                </FilterOptionsBox>
                <InfoFilterBox>
                  <Typography variant="roboto24200" sx={styleSpan}>
                    {t('color')}
                  </Typography>
                </InfoFilterBox>
                <FilterOptionsBox>
                  {colorArray.map((data) => (
                    <div key={data.id}>
                      <CheckBoxRadioInput
                        type="color"
                        fieldName="productColor"
                        htmlFor={data.id}
                        value={data.color}
                        filter={true}
                      />
                    </div>
                  ))}
                </FilterOptionsBox>
                <InfoFilterBox>
                  <Typography variant="roboto24200" sx={styleSpan}>
                    {t('price')}
                  </Typography>
                </InfoFilterBox>
                <InputPriceBox>
                  <CustomInput
                    type="number"
                    id="productPriceFrom"
                    name="productPriceFrom"
                    value={min}
                    onChange={(event) =>
                      handleTextChange(event, setFieldValue, 'from')
                    }
                    className={styles.inputPrice}
                  />
                  <Line />
                  <CustomInput
                    type="number"
                    id="productPriceTo"
                    name="productPriceTo"
                    value={max}
                    onChange={(event) =>
                      handleTextChange(event, setFieldValue, 'to')
                    }
                  />
                </InputPriceBox>
                <SliderBox>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={[min, max]}
                    onChange={(event) => handleChange(event, setFieldValue)}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                    max={15000}
                    min={0}
                    sx={{
                      height: '0px',
                      '.scss-1sj75n8-MuiSlider-thumb': {
                        width: '10px',
                        height: '10px',
                      },
                      '.scss-14pt78w-MuiSlider-rail': {
                        height: '1px',
                      },
                    }}
                  />
                </SliderBox>
                <InfoFilterBox>
                  <Typography variant="roboto24200" sx={styleSpan}>
                    {t('material')}
                  </Typography>
                </InfoFilterBox>
                <FilterOptionsBox>
                  {materialArray.map((data) => (
                    <div key={data.id}>
                      <CheckBoxRadioInput
                        type="material"
                        fieldName="productStyleMaterial"
                        htmlFor={data.id}
                        key={data.id}
                        value={data.material}
                        valueName={data.materialName}
                        filter={true}
                      />
                    </div>
                  ))}
                </FilterOptionsBox>
                <FilterClickPosition>
                  <CustomButton size="LG" type="submit">
                    {t('apply-filters')}
                  </CustomButton>
                </FilterClickPosition>
              </Form>
            );
          }}
        </Formik>
      </FilterOpenBox>
    </Slide>
  );
};

export default FilterMenu;

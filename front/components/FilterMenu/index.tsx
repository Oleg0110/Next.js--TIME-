import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import theme, { Colors } from '../../styles/theme';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import styles from '../../styles/icons.module.scss';
import { Slide, Slider, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ProductInCart from '../ProductInCart';
import { ButtonBox, ResultBox, TotalBox } from '../../styles/shopFavorCart';
import CustomButton from '../CustomButton';
import ShopFavorCartModal from '../ShopFavorCartModal';
import { NextPage } from 'next';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  FilterClickPosition,
  FilterOptionsBox,
  InfoFilterBox,
} from '../../styles/filter';
import {
  colorArray,
  filterDataName,
  materialArray,
  sizeArray,
  styleArray,
} from '../../utils/constants';
import CheckBoxRadioInput from '../../components/CheckBoxRadioInput';
import { useAppDispatch } from '../../hooks/redux';
import { filterProducts } from '../../store/services/ProductService';
import { IProductFilter } from '../../utils/interface/productInterface';

const paperStyle = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'none',
    mt: 2.5,
    width: '370px',
    minHeight: '100px',
    borderRadius: '0px',
    boxShadow: 'none',
    '&:before': {
      content: '""',
      display: 'block',
      width: 0,
      bgcolor: Colors.secondaryWhite,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

function valuetext(value: number) {
  return `${value}°C`;
}

interface IFilterMenuProps {
  category: string;
}

const FilterMenu: NextPage<IFilterMenuProps> = ({ category }) => {
  let filters: IProductFilter;
  let productPriceFrom;
  let productPriceTo;
  const ISSERVER = typeof window === 'undefined';

  if (!ISSERVER) {
    filters = JSON.parse(localStorage.getItem(filterDataName));
    productPriceFrom = filters.productPriceFrom;
    productPriceTo = filters.productPriceTo;
  }

  const [min, setMin] = useState(productPriceFrom);
  const [max, setMax] = useState(productPriceTo);

  // console.log(value);

  const media = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('filters');
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const styleSpan = { width: '45%', color: Colors.primary };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography
          variant="roboto24200"
          onClick={handleClick}
          sx={open ? { color: Colors.darkGray } : { color: Colors.black }}
          style={{ cursor: 'pointer' }}
        >
          {t('filters')}
        </Typography>
      </Box>
      {/* {media ? (
        <>
          <ShopFavorCartModal
            isModalOpened={open}
            handleClose={handleClose}
            who={who}
          />
        </>
      ) : (
        <> */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        sx={{
          filter: 'none',
          left: -150,
        }}
        PaperProps={paperStyle}
      >
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values) => {
            // handleClose();
            localStorage.setItem(filterDataName, JSON.stringify(values));
            await dispatch(filterProducts({ filter: values, category }));
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
                <Field
                  type="number"
                  id="productPriceFrom"
                  name="productPriceFrom"
                  value={min}
                  onChange={(event) =>
                    // console.log(event);

                    handleTextChange(event, setFieldValue, 'from')
                  }
                />

                <Field
                  type="number"
                  id="productPriceTo"
                  name="productPriceTo"
                  value={max}
                  onChange={(event) =>
                    handleTextChange(event, setFieldValue, 'to')
                  }
                />
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={[min, max]}
                    onChange={(event) => handleChange(event, setFieldValue)}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                    max={15000}
                    min={0}
                  />
                </Box>
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
      </Menu>
      {/* </>
      )} */}
    </>
  );
};

export default FilterMenu;

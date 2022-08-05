import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { CircularProgress, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { globalProductSearch } from '../../store/services/ProductService';
import {
  SearchGlobalFormBox,
  SearchGlobalFormError,
  SearchGlobalFormInput,
  SearchGlobalLoadingBox,
  SearchIconBox,
} from '../../styles/globalProductSearch';
import GlobalProductSearchModal from '../GlobalProductSearchModal';
import Menu from '@mui/material/Menu';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import ProductInBag from '../ProductInBag';
import styles from '../../styles/icons.module.scss';

const GlobalProductSearch = () => {
  const media = useMediaQuery(theme.breakpoints.down('md'));

  const { globalSearchProduct, isGlobalSearchLoading } = useAppSelector(
    (state) => state.product
  );

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validationSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
  });

  return (
    <>
      <SearchIconBox>
        <TooltipIcon title="search" onClick={handleClick}>
          <div className={styles.search} />
        </TooltipIcon>
      </SearchIconBox>
      {media ? (
        <>
          <GlobalProductSearchModal
            isModalOpened={open}
            handleClose={handleClose}
          />
        </>
      ) : (
        <Menu
          variant="selectedMenu"
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          sx={{
            '& .scss-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper ':
              {
                marginTop: '20px',
                minHeight: '20px',
                width: '430px',
                maxWidth: '450px',
                borderRadius: '0px',
                boxShadow: 'none',
              },
          }}
        >
          <div>
            <Formik
              initialValues={{ searchValue: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await dispatch(globalProductSearch(values.searchValue));
              }}
            >
              {({ submitForm }) => {
                return (
                  <Form onChange={() => submitForm()}>
                    <SearchGlobalFormBox>
                      <SearchGlobalFormError
                        name="searchValue"
                        component="span"
                      />
                      <SearchGlobalFormInput
                        name="searchValue"
                        id="searchValue"
                        placeholder="Search"
                      />
                    </SearchGlobalFormBox>
                  </Form>
                );
              }}
            </Formik>
            {isGlobalSearchLoading ? (
              <SearchGlobalLoadingBox>
                <CircularProgress
                  sx={{
                    color: Colors.primary,
                    margin: '40px 0px',
                  }}
                  disableShrink
                  size="35px"
                />
              </SearchGlobalLoadingBox>
            ) : (
              globalSearchProduct &&
              globalSearchProduct.map((data) => (
                <div key={data.id}>
                  <ProductInBag
                    price={data.productPrice}
                    productId={data.id}
                    productName={data.productName}
                    productPhoto={data.productMainPictures}
                    salePrice={data.productDiscountPrice}
                    productFor={data.productFor}
                  />
                </div>
              ))
            )}
          </div>
        </Menu>
      )}
    </>
  );
};

export default GlobalProductSearch;

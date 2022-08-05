import React from 'react';
import { CircularProgress, Modal } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Form, Formik } from 'formik';
import { globalProductSearch } from '../../store/services/ProductService';
import { object, string } from 'yup';
import {
  SearchGlobalFormBox,
  SearchGlobalFormError,
  SearchGlobalFormInput,
  SearchGlobalLoadingBox,
} from '../../styles/globalProductSearch';
import { GlobalSearchMainModalBox } from '../../styles/modal';
import ProductInBag from '../ProductInBag';

interface IGlobalProductSearchModal {
  isModalOpened: boolean;
  handleClose: () => void;
}

const GlobalProductSearchModal: NextPage<IGlobalProductSearchModal> = ({
  isModalOpened,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const { globalSearchProduct, isGlobalSearchLoading } = useAppSelector(
    (state) => state.product
  );

  const validationSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
  });

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <GlobalSearchMainModalBox>
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
        </GlobalSearchMainModalBox>
      </Modal>
    </>
  );
};

export default GlobalProductSearchModal;

import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { ChooseSizeBox, ChooseSizeModalBox } from '../../styles/modal';
import { shoppingBagDataName, sizesArray } from '../../utils/constants';
import { SizeType } from '../../utils/types/form';
import { includesSizeFunc } from '../../utils/function';
import { Field, Form, Formik } from 'formik';
import { setProductInShoppingBag } from '../../store/reducers/ProductSlice';
import { useAppDispatch } from '../../hooks/redux';
import CheckBoxRadioInput from '../CheckBoxRadioInput';
import { IProductInBag } from '../../utils/interface/productInterface';
import { toast } from 'react-toastify';

interface IChooseSizeModal {
  isModalOpened: boolean;
  handleClose: () => void;
  productSize: number[];
  productName: string;
  productId: string;
  productPhoto: string;
  salePrice: number;
  price: number;
}

const ChooseSizeModal: NextPage<IChooseSizeModal> = ({
  isModalOpened,
  handleClose,
  productSize,
  productName,
  productId,
  productPhoto,
  salePrice,
  price,
}) => {
  const sizesArr: SizeType[] = includesSizeFunc(sizesArray, productSize);

  const dispatch = useAppDispatch();

  const ISSERVER = typeof window === 'undefined';

  const setInShoppingBag = async (sizeProduct) => {
    if (!ISSERVER) {
      const arr: IProductInBag[] =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];

      arr.push({
        productId,
        productName,
        sizeProduct,
        productPhoto,
        salePrice,
        price,
        productAmount: 1,
      });

      localStorage.setItem(shoppingBagDataName, JSON.stringify(arr));

      const newArr =
        JSON.parse(localStorage.getItem(shoppingBagDataName)) || [];
      await dispatch(setProductInShoppingBag(newArr));
      toast.success('Add to Shopping Bag');
    }
  };

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ChooseSizeModalBox>
          <Typography
            variant="roboto30300"
            sx={{
              textAlign: 'center',
              color: Colors.primary,
            }}
          >
            Select an available size
          </Typography>
          <Formik
            initialValues={{ size: '' }}
            onSubmit={async (values) => {
              setInShoppingBag(+values.size);
              handleClose();
            }}
          >
            {({ submitForm }) => {
              return (
                <Form>
                  <ChooseSizeBox>
                    {sizesArr.map((data) => (
                      <div key={data.size} onChange={() => submitForm()}>
                        <CheckBoxRadioInput
                          inputType="radio"
                          type="size"
                          fieldName="size"
                          htmlFor={String(data.size)}
                          value={String(data.size)}
                          isSize={data.is}
                        />
                      </div>
                    ))}
                  </ChooseSizeBox>
                </Form>
              );
            }}
          </Formik>
        </ChooseSizeModalBox>
      </Modal>
    </>
  );
};

export default ChooseSizeModal;

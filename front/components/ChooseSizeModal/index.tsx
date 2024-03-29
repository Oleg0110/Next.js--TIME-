import React from 'react';
import { Modal, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { ChooseSizeBox, ChooseSizeModalBox } from '../../styles/modal';
import { sizesArray } from '../../utils/constants';
import { SizeType } from '../../utils/types/form';
import { includesSizeFunc, setInShoppingBag } from '../../utils/function';
import { Form, Formik } from 'formik';
import { useAppDispatch } from '../../hooks/redux';
import { useTranslation } from 'next-i18next';
import CheckBoxRadioInput from '../CheckBoxRadioInput';

interface IChooseSizeModal {
  isModalOpened: boolean;
  handleClose: () => void;
  productSize: number[];
  productName: string;
  productId: string;
  productPhoto: string;
  productFor: string;
  salePrice: number;
  price: number;
}

const ChooseSizeModal: NextPage<IChooseSizeModal> = ({
  isModalOpened,
  handleClose,
  productSize,
  productFor,
  productName,
  productId,
  productPhoto,
  salePrice,
  price,
}) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const sizesArr: SizeType[] = includesSizeFunc(sizesArray, productSize);

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
            {t('select-size')}
          </Typography>
          <Formik
            initialValues={{ size: '' }}
            onSubmit={async (values) => {
              setInShoppingBag(
                dispatch,
                +values.size,
                productId,
                productName,
                productPhoto,
                salePrice,
                price,
                productFor
              );
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

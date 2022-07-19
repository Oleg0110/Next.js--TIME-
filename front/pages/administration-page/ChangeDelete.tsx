import React, { useState } from 'react';
import { object, string } from 'yup';
import {
  ChangeDeleteBox,
  ChangeDeleteFormBox,
  ChangeDeleteMainFormBox,
  FoundProductBox,
  InfoChangeDeleteBox,
  ProductSearchScroll,
  UserSearchBox,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSearchProduct } from '../../store/services/ProductService';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import ProductSearch from '../../components/ProductSearch';
import styles from '../../styles/AdminPage.module.scss';
import AdminSearchForm from '../../components/AdminSearchForm';

const ChangeDelete: NextPage = () => {
  const { t } = useTranslation('admin');

  const [isValue, setIsValue] = useState('');

  const { productSearch } = useAppSelector((state) => state.product);

  const validationNumberSchema = object().shape({
    searchValue: string()
      .min(1, 'Too Short!')
      .max(11, 'Too Long!')
      .required('Required')
      .matches(/^[0-9\b]+$/, 'Only Numbers'),
  });

  return (
    <ChangeDeleteBox>
      <ChangeDeleteMainFormBox>
        <Typography
          variant="roboto24500"
          sx={{
            textAlign: 'start',
            margin: '10px',
            width: '100%',
            color: Colors.primary,
          }}
        >
          {t('find-product')}
        </Typography>
        <AdminSearchForm
          placeholder={t('placeholderNumber')}
          serviceFunc={getSearchProduct}
          validationSchema={validationNumberSchema}
          formName={t('product-number')}
          setProductSearchValue={setIsValue}
        />
        {productSearch[0] !== undefined && (
          <FoundProductBox>
            <ProductSearchScroll>
              {productSearch.map((data) => (
                <div key={data.id}>
                  <ProductSearch product={data} searchValue={isValue} />
                </div>
              ))}
            </ProductSearchScroll>
          </FoundProductBox>
        )}
      </ChangeDeleteMainFormBox>
    </ChangeDeleteBox>
  );
};

export default ChangeDelete;

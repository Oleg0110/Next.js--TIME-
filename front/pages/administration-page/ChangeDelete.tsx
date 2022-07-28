import React, { useState } from 'react';
import { object, string } from 'yup';
import {
  AdminLoadingBox,
  ChangeDeleteBox,
  ChangeDeleteMainFormBox,
  FoundProductBox,
  ProductSearchScroll,
} from '../../styles/administration';
import { Colors } from '../../styles/theme';
import { CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { getSearchProduct } from '../../store/services/ProductService';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import ProductSearch from '../../components/ProductSearch';
import AdminSearchForm from '../../components/AdminSearchForm';

const ChangeDelete: NextPage = () => {
  const { t } = useTranslation('admin');

  const [isValue, setIsValue] = useState('');

  const { productSearch, isLoading } = useAppSelector((state) => state.product);

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
          formName="product-number"
          setProductSearchValue={setIsValue}
        />
        <FoundProductBox>
          {isLoading ? (
            <AdminLoadingBox>
              <CircularProgress
                sx={{
                  color: Colors.primary,
                  margin: '20px 0px',
                }}
                disableShrink
                size="35px"
              />
            </AdminLoadingBox>
          ) : (
            productSearch[0] !== undefined && (
              <ProductSearchScroll>
                {productSearch.map((data) => (
                  <div key={data.id}>
                    <ProductSearch product={data} searchValue={isValue} />
                  </div>
                ))}
              </ProductSearchScroll>
            )
          )}
        </FoundProductBox>
      </ChangeDeleteMainFormBox>
    </ChangeDeleteBox>
  );
};

export default ChangeDelete;

import { Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../styles/icons.module.scss';
import theme, { Colors } from '../../styles/theme';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import SaleProductTest from '../../assets/saleProductTest.png';
import {
  ChangeButton,
  DeleteButton,
  InfoSearchContainer,
  MainProductSearchContainer,
  PhotoProductSearch,
  ProductSearchButtonBox,
} from '../../styles/productSearch';
import { NextPage } from 'next';
import { useAppDispatch } from '../../hooks/redux';
import { deleteProduct } from '../../store/services/ProductService';
import ChangeModal from '../ChangeModal';
import { IProduct } from '../../utils/interface/productInterface';
import { toast } from 'react-toastify';

interface IProductSearch {
  product: IProduct;
  searchValue: string;
}

const ProductSearch: NextPage<IProductSearch> = ({ product, searchValue }) => {
  const { t } = useTranslation(['admin', 'toast']);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const spanStyle = {
    width: '260px',
    color: Colors.black,
    [theme.breakpoints.down('md')]: {
      width: '175px',
      fontSize: '15px',
      marginBottom: '0px',
    },
  };

  return (
    <MainProductSearchContainer>
      <ChangeModal
        isModalOpened={open}
        handleClose={handleClose}
        product={product}
        searchValue={searchValue}
      />
      <PhotoProductSearch>
        <Image src={SaleProductTest} width="80px" height="80px" />
      </PhotoProductSearch>
      <InfoSearchContainer>
        <Typography variant="roboto20200" sx={spanStyle}>
          {t('product-number')}
          <Typography
            variant="roboto20400"
            sx={{ ...spanStyle, marginLeft: '5px' }}
          >
            {product.productNumber}
          </Typography>
        </Typography>
        <Typography
          variant="roboto20400"
          marginBottom="8px"
          color={Colors.primary}
          sx={spanStyle}
        >
          {product.productName}
        </Typography>
        <ProductSearchButtonBox>
          <ChangeButton onClick={handleClick}>{t('change')}</ChangeButton>
          <DeleteButton
            onClick={async () => {
              const data = await dispatch(
                deleteProduct({ productId: product.id, searchValue })
              );
              if (data !== undefined || null)
                return toast.success(t('product-was-deleted', { ns: 'toast' }));
            }}
          >
            {t('delete')}
          </DeleteButton>
        </ProductSearchButtonBox>
      </InfoSearchContainer>
    </MainProductSearchContainer>
  );
};

export default ProductSearch;

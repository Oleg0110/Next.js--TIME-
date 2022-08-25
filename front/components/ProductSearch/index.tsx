import React, { useState } from 'react';
import theme, { Colors } from '../../styles/theme';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
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
import { IProduct } from '../../utils/interface/productInterface';
import { toast } from 'react-toastify';
import { BASIC_URL } from '../../utils/httpLinks';
import ChangeModal from '../ChangeModal';
import Link from 'next/link';

interface IProductSearch {
  product: IProduct;
  searchValue: string;
}

const spanStyle = {
  width: '260px',
  color: Colors.black,
  [theme.breakpoints.down('md')]: {
    width: '175px',
    fontSize: '15px',
    marginBottom: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '140px',
    fontSize: '10px',
    marginBottom: '0px',
  },
};

const ProductSearch: NextPage<IProductSearch> = ({ product, searchValue }) => {
  const { t } = useTranslation(['admin', 'toast']);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <img
          src={`${BASIC_URL}/${product.productMainPictures}`}
          width="80px"
          height="80px"
          onClick={() =>
            router.push(
              `/product/${product.productFor}/${product.productName}/${product.id}`
            )
          }
          style={{ cursor: 'pointer' }}
        />
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
        <Link
          href={`/product/${product.productFor}/${product.productName}/${product.id}`}
        >
          <Typography
            variant="roboto20400"
            color={Colors.primary}
            sx={{ ...spanStyle, cursor: 'pointer' }}
          >
            {product.productName}
          </Typography>
        </Link>
      </InfoSearchContainer>
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
    </MainProductSearchContainer>
  );
};

export default ProductSearch;

import React, { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import theme, { Colors } from '../../styles/theme';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { useAppDispatch } from '../../hooks/redux';
import {
  ChangeButton,
  CustomerSearchButtonBox,
  CustomerSearchContainer,
  InfoCustomerContainer,
} from '../../styles/customerSearch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangeModal from '../ChangeModal';
import styles from '../../styles/icons.module.scss';

interface ICustomerSearch {
  customerName: string;
  customerSurname: string;
  customerEmail: string;
}

const CustomerSearch: NextPage<ICustomerSearch> = ({
  customerName,
  customerSurname,
  customerEmail,
}) => {
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
    },
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    let color = '#';

    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        marginRight: '15px',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  const copyEmail = async () => {
    if (customerEmail === undefined) {
      toast.error(t('failed-copy', { ns: 'toast' }));
    } else {
      await navigator.clipboard.writeText(customerEmail);
      toast.success(
        `${t('successful-copy', { ns: 'toast' })} ${customerEmail}`
      );
    }
  };

  return (
    <CustomerSearchContainer onClick={copyEmail}>
      {/* <ChangeModal
        isModalOpened={open}
        handleClose={handleClose}
        product={product}
        searchValue={searchValue}
      /> */}
      <Avatar {...stringAvatar(`${customerName} ${customerSurname}`)} />
      <InfoCustomerContainer>
        <Typography variant="roboto20200" sx={spanStyle}>
          {`${customerName} ${customerSurname}`}
        </Typography>
        <Typography variant="roboto16400" color={Colors.primary} sx={spanStyle}>
          {customerEmail}
        </Typography>
        {/* <CustomerSearchButtonBox> */}
        {/* <DeleteButton
            onClick={async () => {
              await dispatch(
                deleteProduct({ productId: product.id, searchValue })
                );
              }}
              >
              {t('remove')}
              Delete
              </DeleteButton>
            </CustomerSearchButtonBox> */}
      </InfoCustomerContainer>
      <Typography
        variant="roboto16400"
        sx={{ ...spanStyle, color: Colors.darkGray }}
      >
        {t('click-to-copy')}
      </Typography>
    </CustomerSearchContainer>
  );
};

export default CustomerSearch;

import { Drawer } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CartDrawer } from '../../styles/shoppingCart';
import styled from 'styled-components';
import { Colors } from '../../styles/theme';

interface IShoppingCart {
  isCartOpened: boolean;
  setIsCartOpened: (boolean: boolean) => void;
}

const drawerWidth = 240;

// const useStyles = makeStyles({
//   page: {},
//   drawer: {
//     width: drawerWidth,
//   },
// });
const ShoppingCart: React.FC<IShoppingCart> = ({
  isCartOpened,
  setIsCartOpened,
}) => {
  // const classes = useStyles<any>();
  return (
    <>
      {/* <Drawer
        // className={classes.drawer}
        variant="permanent"
        anchor="right"
        open={isCartOpened}
        onClose={() => setIsCartOpened(false)}
      >
        <Box role="presentation">da</Box>
      </Drawer> */}
    </>
  );
};

export default ShoppingCart;

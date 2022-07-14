import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    headerButton: true;
    roboto36400: true;
    roboto30300: true;
    roboto30200: true;
    roboto24200: true;
    roboto24200hover: true;
    roboto24500: true;
    roboto24500hover: true;
    roboto20400: true;
    roboto20200: true;
    roboto16400: true;
    roboto16200: true;
    translation: true;
    footerMail: true;
    error: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    XL: true;
    LG: true;
    MD: true;
    SM: true;
    XS: true;
  }
}

export const Colors = {
  //Main colors
  primary: '#685248',
  secondaryWhite: '#fff',
  secondaryDarkWhite: '#f1f1f1',
  mainBackground: '#e5e5e5',
  black: '#000',

  //Product colors
  pinkProduct: '#E8CEE7',
  greenProduct: '#0E4206',
  purpleProduct: '#B1A5C5',
  blueProduct: '#0c0b5f',

  //Sale and Discount colors
  darkGray: '#848484',
  saleColor: '#ff3a3a',

  // Another Color
  lightGray: '#c4c4c4',
};

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondaryWhite,
      dark: Colors.secondaryDarkWhite,
    },
    action: {
      active: Colors.lightGray,
      focus: Colors.darkGray,
    },
  },
  breakpoints: {
    values: {
      // extra-small
      xs: 420,
      // small
      sm: 600,
      // medium
      md: 900,
      // large
      lg: 1200,
      // extra-large
      xl: 1920,
    },
  },
});

const { breakpoints } = defaultTheme;

const theme = createTheme({
  ...defaultTheme,
  components: {
    MuiMenu: {
      variants: [
        {
          props: { variant: 'menu' },
          style: {
            overflow: 'visible',
            mt: 500,
            top: 0,
            left: 1,
            filter: `drop-shadow(0px 2px 8px ${Colors.primary})`,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '& .scss-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper ':
              {
                marginTop: 24,
                minWidth: '200px',
                minHeight: '100px',
                borderRadius: '0px',
                boxShadow: 'none',
              },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              zIndex: 0,
            },
          },
        },
        {
          props: { variant: 'selectedMenu' },
          style: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 500,
            top: 0,
            left: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '& .scss-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper ':
              {
                marginTop: 24,
                border: '1px solid',
                minWidth: '490px',
                minHeight: '300px',
                borderRadius: '0px',
                boxShadow: 'none',
                maxHeight: '500px',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '15px',
                },
                '&::-webkit-scrollbar-track': {
                  background: Colors.secondaryWhite,
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: Colors.darkGray,
                  border: `4px solid ${Colors.lightGray}`,
                  borderRadius: '10px',
                },
              },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 500,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              zIndex: 0,
            },
          },
        },
      ],
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
        maxWidth: false,
      },
    },
    MuiAccordion: {
      variants: [
        {
          props: { variant: 'elevation' },
          style: {
            position: 'unset',
            boxShadow: 'none',
            margin: '0px',
            background: Colors.primary,
            borderBottom: `1px solid ${Colors.secondaryWhite}`,
            // width: '100%',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            position: 'unset',
            boxShadow: 'none',
            margin: '0px',
            background: Colors.secondaryWhite,
            width: '100%',
            borderRadius: '0px',
            border: '0px',
            borderTop: `1px solid ${Colors.primary}`,
            '.scss-o4b71y-MuiAccordionSummary-content.Mui-expanded ': {
              margin: '0px',
            },
            '.scss-15v22id-MuiAccordionDetails-root': {
              padding: '0px 30px 16px',
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { color: 'primary' },
          style: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '30px',
            color: Colors.primary,
            backgroundColor: Colors.secondaryWhite,
            border: `1px solid ${Colors.primary}`,
            borderRadius: '20px',
            textTransform: 'none',
            ':hover': {
              color: Colors.secondaryWhite,
              backgroundColor: Colors.primary,
              border: `1px solid ${Colors.black}`,
            },
          },
        },
        {
          props: { color: 'secondary' },
          style: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '30px',
            color: Colors.secondaryWhite,
            backgroundColor: Colors.primary,
            border: `1px solid ${Colors.secondaryWhite}`,
            borderRadius: '20px',
            textTransform: 'none',
            ':hover': {
              color: Colors.primary,
              backgroundColor: Colors.secondaryWhite,
              border: `1px solid ${Colors.black}`,
            },
          },
        },
        {
          props: { size: 'XL' },
          style: {
            minWidth: '345px',
            maxWidth: '370px',
            height: '50px',
          },
        },
        {
          props: { size: 'LG' },
          style: {
            minWidth: '285px',
            maxWidth: '360px',
            height: '50px',
          },
        },
        {
          props: { size: 'MD' },
          style: {
            minWidth: '225px',
            maxWidth: '260px',
            height: '50px',
          },
        },
        {
          props: { size: 'SM' },
          style: {
            minWidth: '180px',
            maxWidth: '220px',
            height: '35px',
          },
        },
      ],
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          fontFamily: 'Trirong',
          fontWeight: 300,
          fontSize: '25px',
        },
        paper: {
          backgroundColor: Colors.primary,
          color: Colors.secondaryWhite,
          maxWidth: '400px',
          minWidth: '200px',
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'title' },
          style: {
            fontFamily: 'Trirong',
            fontWeight: 400,
            fontSize: '48px',
            color: Colors.secondaryWhite,
            cursor: 'pointer',
          },
        },
        {
          props: { variant: 'headerButton' },
          style: {
            fontFamily: 'Trirong',
            fontWeight: 300,
            fontSize: '20px',
            color: Colors.secondaryWhite,
            marginLeft: '75px',
            marginRight: '75px',
            cursor: 'pointer',
            width: '100%',
            ':hover': {
              color: Colors.lightGray,
            },
          },
        },
        {
          props: { variant: 'roboto36400' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '36px',
            fontWeight: 400,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto30300' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '30px',
            fontWeight: 300,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto30200' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: 200,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto24200' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 200,
            color: Colors.secondaryWhite,
            lineHeight: '28.13px',
          },
        },
        {
          props: { variant: 'roboto24200hover' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 200,
            cursor: 'pointer',
            color: Colors.secondaryWhite,
            ':hover': {
              color: Colors.darkGray,
            },
          },
        },
        {
          props: { variant: 'roboto24500' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 500,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto24500hover' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 500,
            color: Colors.secondaryWhite,
            cursor: 'pointer',
            width: '100%',
            ':hover': {
              color: Colors.darkGray,
            },
          },
        },
        {
          props: { variant: 'roboto20400' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: 400,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto20200' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: 200,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto16400' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'roboto16200' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 200,
            color: Colors.secondaryWhite,
          },
        },
        {
          props: { variant: 'translation' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400,
            color: Colors.secondaryWhite,
            cursor: 'pointer',
            padding: '0px 3px',
            ':hover': {
              color: Colors.darkGray,
            },
          },
        },
        {
          props: { variant: 'footerMail' },
          style: {
            fontFamily: 'Roboto',
            fontWeight: 500,
            color: Colors.secondaryWhite,
            cursor: 'pointer',
            width: '100%',
            ':hover': {
              color: Colors.darkGray,
            },
          },
        },
        {
          props: { variant: 'error' },
          style: {
            fontFamily: 'Noto Serif',
            fontSize: '350px',
            fontWeight: 300,
            fontStyle: 'normal',
            color: Colors.lightGray,
            textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white',
            [breakpoints.down('md')]: {
              fontSize: '250px',
            },
            [breakpoints.down('sm')]: {
              fontSize: '200px',
            },
          },
        },
      ],
    },
  },
  typography: {
    h1: {
      fontFamily: 'Noto Serif',
      fontSize: '50px',
      fontWeight: 300,
      lineHeight: '75px',
      fontStyle: 'normal',
    },
    h2: {
      fontFamily: 'Trirong',
      fontWeight: 300,
      fontSize: '20px',
      color: Colors.secondaryWhite,
      marginLeft: '75px',
      marginRight: '75px',
      cursor: 'pointer',
      width: '100%',
      ':hover': {
        color: Colors.darkGray,
      },
    },
  },
});

export default theme;

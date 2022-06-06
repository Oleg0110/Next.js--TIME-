import { TryRounded } from '@mui/icons-material';
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
    translation: true;
    footerMail: true;
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
  saleColor: '#c63d3d',

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
      lg: 1201,
      // extra-large
      xl: 1920,
    },
  },
});

const { breakpoints } = defaultTheme;

const theme = createTheme({
  ...defaultTheme,
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
        maxWidth: false,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
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

// export const TranslationHeader = styled(Typography)(() => ({
//   fontFamily: 'Roboto',
//   fontWeight: 300,
//   fontSize: '16px',
//   color: Colors.secondaryWhite,
//   marginLeft: '2px',
//   marginRight: '2px',
//   cursor: 'pointer',
//   ':hover': {
//     fontWeight: 400,
//     color: Colors.lightGray,
//   },
// })) as typeof Typography;

import { createMuiTheme } from '@material-ui/core/styles';
import variables from './variables';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box',
          wordBreak: 'break-word',
          margin: 0,
          padding: 0,
          border: 0,
          outline: 'none',
          background: 'transparent',
          touchAction: 'manipulation',
          '&:before, &:after': {
            boxSizing: 'border-box',
            wordBreak: 'break-word',
          },
          '&:focus': {
            outline: 'none',
          },
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        html: {
          scrollBehavior: 'smooth',
          height: '100%',
          position: 'relative',
        },
        body: {
          color: variables.black,
          fontFamily: variables.fontFamily,
          height: '100%',
          position: 'relative',
          backgroundColor: variables.white,
        },
        root: {
          height: '100%',
          position: 'relative',
        },
      },
    },
  },
  typography: {
    fontFamily: variables.fontFamily,
    button: {
      textTransform: 'initial',
    },
  },
  palette: {
    primary: {
      main: variables.black,
    },
    secondary: {
      main: variables.black2,
    },
  },
});

export default theme;

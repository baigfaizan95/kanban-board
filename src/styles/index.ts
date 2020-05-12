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
          fontSize: '10px',
          scrollBehavior: 'smooth',
          height: '100%',
          position: 'relative',
        },
        body: {
          color: variables.black,
          fontFamily: variables.fontFamily,
          height: '100%',
          position: 'relative',
        },
        root: {
          height: '100%',
          position: 'relative',
        },
      },
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 17,
    fontFamily: variables.fontFamily,
    button: {
      fontSize: '1.6rem',
      textTransform: 'initial',
    },
  },
});

export default theme;

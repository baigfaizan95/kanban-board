import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'styles';
import WebFont from 'webfontloader';
import { DataProvider } from 'hooks/withData';

WebFont.load({
  google: {
    families: ['Pangolin:300,400,700,900&display=swap'],
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <DataProvider>
        <App />
      </DataProvider>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

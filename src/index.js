import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import { Router } from '@reach/router';
import IndexPage from './pages/IndexPage';
import UnfallPage from './pages/UnfallPage';

import { KintoProvider } from './contexts/kinto-context';

import Footer from '../src/components/Footer';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstarts an elegant,
     consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <KintoProvider>
      <Router>
        <IndexPage path="/" tt="yp" />
        <UnfallPage path="/unfall" tt="was" />
      </Router>
    </KintoProvider>
    <Footer />
  </ThemeProvider>,
  document.querySelector('#root'),
);

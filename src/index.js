import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import { Router } from '@reach/router';

import IndexPage from './pages/IndexPage';
const UnfallPage = React.lazy(() => import('./pages/UnfallPage'));
const RawDataPage = React.lazy(() => import('./pages/RawDataPage'));
const FaqPage = React.lazy(() => import('./pages/FaqPage'));

import { KintoProvider } from './contexts/kinto-context';
import { AuthorizationProvider } from './contexts/authorization-context';

import Footer from './components/Footer';
import Topbar from './components/Topbar';
import LoadingBox from './components/LoadingBox';

import './styles/general.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstarts an elegant,
     consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <KintoProvider>
      <AuthorizationProvider>
        <Topbar />
        <Suspense fallback={<LoadingBox />}>
          <Router>
            <IndexPage path="/" />
            <UnfallPage path="/unfall" />
            <RawDataPage path="/rohdaten" />
            <FaqPage path="/faq" />
          </Router>
        </Suspense>
      </AuthorizationProvider>
    </KintoProvider>
    <Footer />
  </ThemeProvider>,
  document.querySelector('#root'),
);

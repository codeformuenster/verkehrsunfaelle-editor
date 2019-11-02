import React, { Suspense } from 'react';
import * as Sentry from '@sentry/browser';

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN; //eslint-disable-line no-undef, max-len

if (SENTRY_DSN) {
  Sentry.init({ dsn: SENTRY_DSN });
}

import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import { Router, LocationProvider } from '@reach/router';

import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
const UnfallPage = React.lazy(() => import('./pages/UnfallPage'));
const RandomUnfallPage = React.lazy(() => import('./pages/RandomUnfallPage'));
const DataPage = React.lazy(() => import('./pages/DataPage'));
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
    <div className="page">
      <KintoProvider>
        <AuthorizationProvider>
          <Topbar />
          <Suspense fallback={<LoadingBox />}>
            <Router className="page-main">
              <IndexPage path="/" />
              <RandomUnfallPage path="/korrektur" />
              <UnfallPage path="/korrektur/:accidentId" />
              <DataPage path="/daten" />
              <FaqPage path="/faq" />
              <NotFoundPage default />
            </Router>
          </Suspense>
        </AuthorizationProvider>
      </KintoProvider>
      <Footer />
    </div>
    <LocationProvider>
      {() => {
        if (window.fathom) {
          window.fathom('trackPageview');
        }
      }}
    </LocationProvider>
  </ThemeProvider>,
  document.querySelector('#root'),
);

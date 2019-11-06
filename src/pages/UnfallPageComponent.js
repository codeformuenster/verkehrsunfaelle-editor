import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Map from '../components/map/Map';
import UnfallBox from '../components/correction/UnfallBox';
import InfoButton from '../components/InfoButton';
import Link from '../components/Link';
import ErrorBoundary from 'react-error-boundary';
import * as Sentry from '@sentry/browser';

import PlaceName from '../components/correction/PlaceName';

import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

const onError = error => {
  if (Sentry) {
    Sentry.captureException(error);
  }
};

const useStyles = makeStyles(theme => ({
  errorBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '50vh',
    textAlign: 'center',
  },
  crashMap: {
    height: '40vh',
    [theme.breakpoints.up('lg')]: {
      height: '70vh',
    },
  },
  mainGrid: {
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'unset',
    },
  },
  infoButton: {
    marginLeft: 'auto',
    padding: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  infoBox: {
    display: 'none',
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  savedModal: {
    position: 'absolute',
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  headline: {
    fontSize: theme.typography.h6.fontSize,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h5.fontSize,
      marginBottom: theme.spacing(0),
    },
  },
}));

const ErroredMap = ({
  reloadAccident,
  message,
  headline = (
    <>
      <WarningIcon /> Verkehrsunfall konnte nicht geladen werden
    </>
  ),
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.errorBox}>
      <Typography variant="h5" component="h5" gutterBottom>
        {headline}
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        onClick={reloadAccident}
      >
        <RefreshIcon />
        Erneut versuchen.
      </Button>
      <Typography variant="subtitle1" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

ErroredMap.propTypes = {
  message: PropTypes.string.isRequired,
  reloadAccident: PropTypes.func.isRequired,
  headline: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

const UnfallPageComponent = ({
  accident,
  saveAccident,
  reloadAccident,
  saveError,
  accidentPosition,
  setAccidentPosition,
  isLoading,
  hideNext,
  isSaved = false,
}) => {
  const classes = useStyles();

  const handleSaveClick = (bogus = false) => {
    saveAccident(bogus);
  };

  const information = (
    <>
      <Typography variant="body1" gutterBottom>
        Für jeden Unfall wird von der Polizei auch der Unfallort erhoben. Die
        Angaben umfassen einen &quot;Unfallort&quot; und eine
        &quot;Unfallhöhe&quot;. Aus den Angaben der Polizei haben wir
        automatisiert versucht, den Ort herauszufinden.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Du kannst eine Korrektur vorschlagen, in dem du in der Karte den Marker
        verschiebst und rechts auf &quot;Speichern&quot; klickst.
      </Typography>
    </>
  );

  return (
    <>
      <Container>
        <Box my={{ xs: 1, sm: 2 }}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h5"
              component="h5"
              className={classes.headline}
            >
              Unfallort korrigieren
            </Typography>
            <InfoButton
              icon="help"
              information={information}
              className={classes.infoButton}
              dialog
              dialogTitle="Unfallort korrigieren"
            />
          </Box>
          <Grid container spacing={1} className={classes.mainGrid}>
            <Grid item lg={8} xs={12}>
              {accident.error ? (
                <ErroredMap
                  reloadAccident={reloadAccident}
                  message={accident.error.message}
                />
              ) : (
                <ErrorBoundary
                  onError={onError}
                  FallbackComponent={({ error }) => (
                    <ErroredMap
                      headline={
                        <>
                          <ErrorIcon /> Hier ist ein Fehler aufgetreten :(
                        </>
                      }
                      reloadAccident={() => {
                        if (window && window.location) {
                          window.location.reload();
                        }
                      }}
                      message={error.message}
                    />
                  )}
                >
                  <Map
                    className={classes.crashMap}
                    mapLat={accident.lat ? accident.lat : 51.96}
                    mapLon={accident.lon ? accident.lon : 7.62}
                    mapZoom={accident.lat ? 17 : 11}
                    popupContent={
                      <>
                        Unfall bei
                        <br />
                        <PlaceName
                          place={accident.place}
                          quotes={true}
                        /> Höhe{' '}
                        <PlaceName place={accident.place_near} quotes={true} />
                      </>
                    }
                    searchString={
                      accident.place && accident.place_near
                        ? // eslint-disable-next-line
                          `${accident.place.trim()} ${accident.place_near.trim()}`
                        : ''
                    }
                    markerLat={accidentPosition.lat}
                    markerLon={accidentPosition.lng}
                    onMarkerDragEnd={setAccidentPosition}
                    loading={isLoading}
                  />
                </ErrorBoundary>
              )}
            </Grid>
            <Grid item lg={4} xs={12}>
              <UnfallBox
                accident={accident}
                loading={isLoading}
                onSaveClick={
                  accidentPosition.lat === null
                    ? undefined
                    : () => handleSaveClick(false)
                }
                onNextClick={reloadAccident}
                saveError={saveError}
                hideNext={hideNext}
              />
              <Box className={classes.infoBox} mt={2}>
                {information}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Modal open={isSaved}>
        <Paper elevation={3} className={classes.savedModal}>
          <Typography variant="h5" component="h5" gutterBottom>
            Korrektur erfolgreich gespeichert!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Danke für deine Korrektur!
          </Typography>
          <Link
            color="inherit"
            to="/korrektur"
            style={{ display: 'block', textAlign: 'center' }}
          >
            <Button variant="contained" color="primary">
              Mehr Unfallorte korrigieren
            </Button>
          </Link>
        </Paper>
      </Modal>
    </>
  );
};

UnfallPageComponent.propTypes = {
  saveAccident: PropTypes.func,
  reloadAccident: PropTypes.func,
  hideNext: PropTypes.bool,
  isSaved: PropTypes.bool,
  isLoading: PropTypes.bool,
  setAccidentPosition: PropTypes.func,
  saveError: PropTypes.object,
  accidentPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  accident: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        message: PropTypes.string,
      }),
    ]),
    lat: PropTypes.number,
    lon: PropTypes.number,
    place: PropTypes.string,
    place_near: PropTypes.string,
  }),
};

export default UnfallPageComponent;

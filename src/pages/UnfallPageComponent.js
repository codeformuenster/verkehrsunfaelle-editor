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
import Map from '../components/Map';
import UnfallBox from '../components/correction/UnfallBox';
import InfoButton from '../components/InfoButton';
import Link from '../components/Link';

import PlaceName from '../components/correction/PlaceName';

import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';

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
}));

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
      <Typography variant="h6" component="h6">
        Unfallort korrigieren
      </Typography>
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
            <Typography variant="h5" component="h5" display="inline">
              Unfallort korrigieren
            </Typography>
            <InfoButton
              icon="help"
              information={information}
              className={classes.infoButton}
              dialog
            />
          </Box>
          <Grid container spacing={1} className={classes.mainGrid}>
            <Grid item lg={8} xs={12}>
              {accident.error ? (
                <Box className={classes.errorBox}>
                  <Typography variant="h5" component="h5" gutterBottom>
                    <WarningIcon /> Verkehrsunfall konnte nicht geladen werden
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
                    {accident.error.message}
                  </Typography>
                </Box>
              ) : (
                <Map
                  className={classes.crashMap}
                  mapLat={accident.lat}
                  mapLon={accident.lon}
                  mapZoom={accident.lat ? 17 : 10}
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
                  markerLat={accidentPosition.lat}
                  markerLon={accidentPosition.lon}
                  onMarkerDragEnd={setAccidentPosition}
                  loading={isLoading}
                />
              )}
            </Grid>
            <Grid item lg={4} xs={12}>
              <UnfallBox
                accident={accident}
                loading={isLoading}
                onSaveClick={() => handleSaveClick(false)}
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
    lon: PropTypes.number,
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
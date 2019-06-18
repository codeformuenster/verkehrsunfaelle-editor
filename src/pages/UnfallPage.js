import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Map from '../components/Map';
import UnfallBox from '../components/correction/UnfallBox';
import LoadingBox from '../components/LoadingBox';
import InfoButton from '../components/InfoButton';

import PlaceName from '../components/correction/PlaceName';

import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';

import useRandomAccident from '../hooks/use-random-accident';
import useAccident from '../hooks/use-accident';

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
  helpButton: {
    marginLeft: 'auto',
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(3),
    },
  },
}));

export default function UnfallPage() {
  const classes = useStyles();

  const { isLoading, accident, reload } = useRandomAccident();
  const {
    saveAccident,
    markerPosition,
    setMarkerPosition,
    working,
    error: saveAccidentError,
  } = useAccident(accident);

  const shouldSpin = React.useMemo(() => isLoading || working, [
    isLoading,
    working,
  ]);

  const handleSaveClick = (bogus = false) => {
    saveAccident(bogus).then(() => {
      reload();
    });
  };

  return (
    <Container>
      <Box my={{ xs: 1, sm: 2 }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="h5" display="inline">
            Unfallort korrigieren
          </Typography>
          <InfoButton
            icon="help"
            information={
              <>
                <Typography variant="h6" component="h6">
                  Unfallort korrigieren
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Aus den Angaben der Polizei haben wir automatisiert versucht,
                  den Ort herauszufinden.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Du kannst eine Korrektur vorschlagen, in dem du in der Karte
                  den Marker verschiebst und rechts auf &quot;Speichern&quot;
                  klickst.
                </Typography>
              </>
            }
            className={classes.helpButton}
            dialog
          />
        </Box>
        <Grid container spacing={1} className={classes.mainGrid}>
          <Grid item lg={8} xs={12}>
            {shouldSpin === true ? (
              <LoadingBox className={classes.crashMap} />
            ) : accident.error ? (
              <Box className={classes.errorBox}>
                <Typography variant="h5" component="h5" gutterBottom>
                  <WarningIcon /> Verkehrsunfall konnte nicht geladen werden
                </Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={reload}
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
                mapZoom={accident.lat ? 18 : 10}
                popupContent={
                  <>
                    Unfall bei
                    <br />
                    <PlaceName place={accident.place} quotes={true} /> Höhe{' '}
                    <PlaceName place={accident.place_near} quotes={true} />
                  </>
                }
                markerLat={markerPosition.lat}
                markerLon={markerPosition.lon}
                onMarkerDragEnd={setMarkerPosition}
              />
            )}
          </Grid>
          <Grid item lg={4} xs={12}>
            <UnfallBox
              accident={accident}
              loading={shouldSpin}
              onSaveClick={() => handleSaveClick(false)}
              onNextClick={reload}
              saveError={saveAccidentError}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

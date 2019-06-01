import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paperHeader: {
    fontWeight: 400,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

import SaveIcon from '@material-ui/icons/Done';
import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';

const Map = React.lazy(() => import('../components/Map'));

import '../styles/unfall.css';
import useRandomAccident from '../hooks/use-random-accident';
import useAccident from '../hooks/use-accident';
import { useAuthorization } from '../contexts/authorization-context';

const LoadingBox = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="50vh"
  >
    <CircularProgress />
  </Box>
);

export default function UnfallPage() {
  const classes = useStyles();

  const { isLoading, accident, reload } = useRandomAccident();
  const { saveAccident, markerPosition, setMarkerPosition } = useAccident(
    accident,
  );
  const { authorized, engageAuthModal } = useAuthorization();

  const reallySaveAccident = () => {
    saveAccident();
    reload();
  };

  const handleSaveClick = () => {
    if (!authorized) {
      engageAuthModal();
    } else {
      reallySaveAccident();
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          {isLoading === true ? (
            <>Verkehrsunfall wird geladen&hellip;</>
          ) : (
            <>
              &ldquo;{accident.place}&rdquo; Höhe &ldquo;{accident.place_near}
              &rdquo;
            </>
          )}
        </Typography>
        {isLoading === true ? (
          <LoadingBox />
        ) : (
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <React.Suspense fallback={<LoadingBox />}>
                <Map
                  mapLat={accident.lat}
                  mapLon={accident.lon}
                  mapZoom={accident.lat ? 18 : 10}
                  popupContent={
                    <>
                      Unfall bei
                      <br />
                      &ldquo;{accident.place}&rdquo; Höhe &ldquo;
                      {accident.place_near}&rdquo;
                    </>
                  }
                  markerLat={markerPosition.lat}
                  markerLon={markerPosition.lon}
                  onMarkerDragEnd={setMarkerPosition}
                />
              </React.Suspense>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                Unfallort korrigieren
              </Typography>
              <Typography variant="body2" gutterBottom>
                Aus den Angaben der Polizei haben wir automatisiert versucht,
                den Ort herauszufinden.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Du kannst eine Korrektur vorschlagen, in dem du in der Karte den
                Marker verschiebst und rechts auf &quot;Speichern&quot; klickst.
              </Typography>

              <Paper>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.paperHeader}
                >
                  Polizeiangaben:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={accident.place}
                      secondary="Unfallort"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={accident.place_near}
                      secondary="Unfallhöhe"
                    />
                  </ListItem>
                </List>
                <Box display="flex" justifyContent="center" pb={2}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={reload}
                  >
                    <RefreshIcon />
                    Nächster Unfall
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    disabled={markerPosition.initial}
                    onClick={handleSaveClick}
                  >
                    <SaveIcon />
                    Speichern
                  </Button>
                </Box>
                <Box display="flex" justifyContent="center" pb={2}>
                  <Button variant="contained" className={classes.button}>
                    <WarningIcon />
                    Melden
                  </Button>
                  <Button variant="contained" className={classes.button}>
                    <CheckIcon />
                    Ort in Ordnung
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

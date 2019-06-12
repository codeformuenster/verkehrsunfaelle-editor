import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../components/Link';
import Map from '../components/Map';
import LoadingBox from '../components/LoadingBox';

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
  box: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  },
  disabledBox: {
    opacity: 0.6,
  },
  notSignedInBox: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  saveErrorBox: {
    backgroundColor: '#ce5a4e',
    textAlign: 'center',
  },
  errorBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '50vh',
  },
  placeName: {
    '& q': {
      fontFamily: 'monospace',
      fontSize: '80%',
      '&:before': { content: '"\\201E"' },
      '&:after': { content: '"\\201C"' },
    },
    '& .missingValueTooltip': {
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    },
  },
  listItemCentered: {
    textAlign: 'center',
  },
}));

import SaveIcon from '@material-ui/icons/Done';
import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';

import '../styles/unfall.css';
import useRandomAccident from '../hooks/use-random-accident';
import useAccident from '../hooks/use-accident';
import { useAuthorization } from '../contexts/authorization-context';

const PlaceName = ({ place, quotes = false, className }) => {
  const classes = useStyles();

  if (place === '') {
    return (
      <span className={clsx(classes.placeName, className)}>
        <Tooltip title="Fehlende Angabe" placement="right">
          <span className="missingValueTooltip">
            {quotes === true ? <q>&#8213;</q> : <span>&#8213;</span>}{' '}
            <InfoIcon />
          </span>
        </Tooltip>
      </span>
    );
  }

  if (quotes === true) {
    return (
      <span className={clsx(classes.placeName, className)}>
        <q>{place}</q>
      </span>
    );
  }

  return <span className={clsx(classes.placeName, className)}>{place}</span>;
};

PlaceName.propTypes = {
  className: PropTypes.string,
  quotes: PropTypes.boolean,
  place: PropTypes.string,
};

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

  const { authorized, engageAuthModal } = useAuthorization();

  const handleSaveClick = (bogus = false) => {
    saveAccident(bogus).then(() => {
      reload();
    });
  };

  let headingText = '';

  if (isLoading === true) {
    headingText = 'Verkehrsunfall wird geladen';
  } else if (accident && accident.error) {
    headingText = (
      <>
        <WarningIcon /> Verkehrsunfall konnte nicht geladen werden
      </>
    );
  } else {
    headingText = (
      <>
        Unfall <PlaceName place={accident.place} quotes={true} /> Höhe{' '}
        <PlaceName place={accident.place_near} quotes={true} />
      </>
    );
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          {headingText}
        </Typography>
        {isLoading === true ? (
          <LoadingBox />
        ) : accident.error ? (
          <Box className={classes.errorBox}>
            <Typography variant="body2">{accident.error.message}</Typography>
            <Button
              variant="contained"
              className={classes.button}
              onClick={reload}
            >
              <RefreshIcon />
              Erneut versuchen.
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item md={8} sm={7} xs={12}>
              <Map
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
            </Grid>
            <Grid item md={4} sm={5} xs={12}>
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
                  Angaben laut Polizei:
                </Typography>
                <List>
                  <ListItem className={classes.listItemCentered}>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: 'h6',
                      }}
                      primary={
                        <PlaceName place={accident.place} quotes={true} />
                      }
                      secondary="Unfallort"
                    />
                  </ListItem>
                  <ListItem className={classes.listItemCentered}>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: 'h6',
                      }}
                      primary={
                        <PlaceName place={accident.place_near} quotes={true} />
                      }
                      secondary="Unfallhöhe"
                    />
                  </ListItem>
                  <ListSubheader>
                    Quelle: {accident.source_file}, Zeile{' '}
                    {accident.source_row_number}
                  </ListSubheader>
                </List>
                {!authorized && (
                  <Box className={classes.notSignedInBox}>
                    <Button onClick={engageAuthModal}>
                      Bitte Einloggen oder anonym weitermachen
                    </Button>
                    <Link
                      naked
                      to="/faq#wieso-einloggen"
                      style={{ display: 'block', textAlign: 'center' }}
                    >
                      Wieso?
                    </Link>
                  </Box>
                )}
                {working === true ? (
                  <LoadingBox minHeight="140px" />
                ) : (
                  <>
                    {saveAccidentError && (
                      <Box
                        className={clsx(
                          classes.box,
                          classes.notSignedInBox,
                          classes.saveErrorBox,
                        )}
                      >
                        <Typography variant="body2">
                          <WarningIcon /> Korrektur konnte nicht gespeichert
                          werden. Bitte probieren Sie es später noch ein mal.
                        </Typography>
                      </Box>
                    )}
                    <Box
                      className={clsx(
                        classes.box,
                        !authorized && classes.disabledBox,
                      )}
                    >
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={reload}
                        disabled={!authorized}
                      >
                        <RefreshIcon />
                        Nächster Unfall
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        disabled={!authorized || markerPosition.initial}
                        onClick={() => handleSaveClick(false)}
                      >
                        <SaveIcon />
                        Speichern
                      </Button>
                    </Box>
                    <Box
                      className={clsx(
                        classes.box,
                        !authorized && classes.disabledBox,
                      )}
                    >
                      <Button
                        variant="contained"
                        className={classes.button}
                        disabled={!authorized}
                        onClick={() => handleSaveClick(true)}
                      >
                        <WarningIcon />
                        Melden
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.button}
                        disabled={!authorized || !markerPosition.initial}
                        onClick={() => handleSaveClick(false)}
                      >
                        <CheckIcon />
                        Ort in Ordnung
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InfoButton from '../InfoButton';
import LoadingBox from '../LoadingBox';
import Link from '../Link';
import PlaceName from './PlaceName';
import SaveIcon from '@material-ui/icons/Done';
import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';

import { useAuthorization } from '../../contexts/authorization-context';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paperHeader: {
    fontWeight: theme.typography.fontWeightRegular,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 0`,
    fontSize: '1rem',
  },
  saveErrorBox: {
    backgroundColor: theme.palette.error.main,
    textAlign: 'center',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  actionBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
    maxWidth: 600,
    margin: '0 auto',
  },
  actionButton: {
    borderRadius: 0,
  },
  infoButton: {
    marginLeft: theme.spacing(1),
  },
}));

const UnfallBox = ({
  onSaveClick,
  onNextClick,
  accident,
  loading,
  saveError,
}) => {
  const classes = useStyles();
  const { authorized, engageAuthModal } = useAuthorization();

  let actionBox = null;

  if (authorized) {
    if (loading) {
      actionBox = <LoadingBox minHeight="60px" />;
    } else {
      actionBox = (
        <>
          <Button
            variant="outlined"
            className={classes.actionButton}
            onClick={onNextClick}
            disabled={!authorized}
          >
            <RefreshIcon /> Nächster Unfall
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.actionButton}
            disabled={!authorized}
            onClick={onSaveClick}
          >
            <SaveIcon /> Unfall speichern
          </Button>
        </>
      );
    }
  } else {
    actionBox = (
      <Box flexDirection="column" border={1} m={1} pb={1}>
        <Button onClick={engageAuthModal}>
          Bitte Einloggen oder anonym weitermachen
        </Button>
        <Link
          color="inherit"
          to="/faq#wieso-einloggen"
          style={{ display: 'block', textAlign: 'center' }}
        >
          Wieso?
        </Link>
      </Box>
    );
  }

  return (
    <Paper elevation={2}>
      <Typography variant="h6" component="h6" className={classes.paperHeader}>
        Angaben laut Polizei:
        <InfoButton
          icon="info"
          size="small"
          className={classes.infoButton}
          // eslint-disable-next-line max-len
          information={`Quelle: ${accident.source_file}, Zeile ${accident.source_row_number}`}
        />
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Box textAlign="center">
            <Typography variant="h5">
              <PlaceName place={accident.place} quotes={true} />
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Unfallort
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box textAlign="center">
            <Typography variant="h5">
              <PlaceName place={accident.place_near} quotes={true} />
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Unfallhöhe
            </Typography>
          </Box>
        </Grid>
        {saveError && (
          <Grid item xs={12}>
            <Box className={classes.saveErrorBox}>
              <Typography variant="body2">
                <WarningIcon /> Korrektur konnte nicht gespeichert werden. Bitte
                probieren Sie es später noch ein mal.
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box className={classes.actionBox}>{actionBox}</Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

UnfallBox.propTypes = {
  loading: PropTypes.bool,
  saveError: PropTypes.bool,
  onSaveClick: PropTypes.func,
  onNextClick: PropTypes.func,
  accident: PropTypes.object,
};

UnfallBox.defaultProps = {
  accident: {},
};

export default UnfallBox;

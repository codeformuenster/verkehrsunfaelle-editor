import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoButton from '../InfoButton';
import LoadingBox from '../LoadingBox';
import Link from '../Link';
import { Link as ReachLink } from '@reach/router';
import PlaceName from './PlaceName';
import SaveIcon from '@material-ui/icons/Done';
import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';
import LinkIcon from '@material-ui/icons/Link';
import MetaDisplay from './MetaDisplay';
import Participants from './Participants';
import TimeOfAccident from './TimeOfAccident';

import { useAuthorization } from '../../contexts/authorization-context';

import useMetadata from '../../hooks/use-metadata';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paperHeader: {
    fontWeight: theme.typography.fontWeightRegular,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0 ${theme.spacing(
      2,
    )}px`,
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 ${theme.spacing(
        2,
      )}px`,
    },
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
    fontSize: theme.typography.fontSize * 0.8,
    padding: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.fontSize,
      padding: theme.spacing(1),
    },
  },
  infoDefinitionTitle: {
    fontWeight: 500,
  },
  infoDefinition: {
    marginLeft: '10%',
  },
  accidentProperty: {
    fontSize: theme.typography.h6.fontSize,
    lineHeight: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h5.fontSize,
      lineHeight: 1.6,
    },
  },
  accidentPropertySmaller: {
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h6.fontSize,
      lineHeight: 1.6,
    },
  },
  miniButtons: {
    float: 'right',
    display: 'inline',
  },
  miniButton: {
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  actionIcon: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const UnfallBox = ({
  onSaveClick,
  onNextClick,
  accident,
  loading,
  saveError,
  hideNext,
  positionChanged,
}) => {
  const classes = useStyles();
  const { authorized, username, engageAuthModal } = useAuthorization();
  const { getMetadata } = useMetadata();

  let actionBox = null;

  if (authorized) {
    actionBox = (
      <>
        <Button
          variant="outlined"
          className={classes.actionButton}
          disabled={loading}
          onClick={() => onSaveClick(true)}
        >
          <WarningIcon className={classes.actionIcon} />
          Ort unbestimmbar
        </Button>
        <Button
          color="primary"
          variant="outlined"
          className={classes.actionButton}
          disabled={loading || typeof onSaveClick === 'undefined'}
          onClick={() => onSaveClick(false)}
        >
          <SaveIcon className={classes.actionIcon} />
          {positionChanged === true ? 'Position' : 'Änderung'}{' '}
          {username === 'Anonym' ? 'Anonym ' : null}speichern
        </Button>
      </>
    );
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

  const information = (
    <>
      <dl>
        <dt className={classes.infoDefinitionTitle}>Kategorie</dt>
        <dd className={classes.infoDefinition}>
          <MetaDisplay
            {...getMetadata('accident_category', accident.accident_category)}
          />{' '}
          {accident.accident_type}
        </dd>
        {/* <dt className={classes.infoDefinitionTitle}>Typ</dt>
        <dd className={classes.infoDefinition}>
          <MetaDisplay
            {...getMetadata('accident_type', accident.accident_type)}
          />
        </dd> */}
        <dt className={classes.infoDefinitionTitle}>Ursache(n)</dt>
        <dd className={classes.infoDefinition}>
          <MetaDisplay
            {...getMetadata('accident_cause', [
              accident.cause_1_4,
              accident.cause_2,
              accident.cause_3,
              accident.cause_other,
              accident.cause_02,
            ])}
          />
        </dd>
        <dt className={classes.infoDefinitionTitle}>Beteiligte</dt>
        <dd className={classes.infoDefinition}>
          <MetaDisplay
            {...getMetadata('traffic_involvement', [
              accident.participants_01,
              accident.participants_02,
            ])}
          />
        </dd>
      </dl>
    </>
  );

  const categoryText = getMetadata(
    'accident_category',
    accident.accident_category,
  );

  return (
    <Paper elevation={2}>
      <Typography variant="h6" component="h6" className={classes.paperHeader}>
        Angaben laut Polizei:
        <Box className={classes.miniButtons}>
          <InfoButton
            icon="info"
            size="small"
            className={classes.miniButton}
            information={information}
            dialogTitle="Unfalldetails"
            dialog
          />
          {!hideNext && (
            <Tooltip title="Nächster Unfall" arrow>
              <IconButton
                size="small"
                className={classes.miniButton}
                onClick={onNextClick}
                aria-label="Nächster Unfall"
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Direktlink zu diesem Unfall" arrow>
            <IconButton
              component={ReachLink}
              size="small"
              className={classes.miniButton}
              to={`/korrektur/${accident.accident_id}`}
              aria-label="Direktlink zu diesem Unfall"
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Typography>
      <Grid container spacing={0}>
        {loading === true ? (
          <Grid item xs={12}>
            <LoadingBox minHeight="170px" />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                className={classes.accidentProperty}
              >
                <PlaceName place={accident.place} quotes={true} /> /{' '}
                <PlaceName place={accident.place_near} quotes={true} />
              </Typography>
              <Typography
                variant="caption"
                component="h6"
                color="textSecondary"
                align="center"
              >
                Unfallort / Unfallhöhe
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.accidentPropertySmaller}
              >
                <PlaceName
                  place={categoryText ? categoryText.title : ''}
                  quotes={true}
                />
              </Typography>
              <Typography
                variant="caption"
                component="h6"
                color="textSecondary"
                align="center"
              >
                Kategorie
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Participants {...accident} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.accidentPropertySmaller}
              >
                <TimeOfAccident date={accident.date} />
              </Typography>
              <Typography
                variant="caption"
                component="h6"
                color="textSecondary"
                align="center"
              >
                Zeitpunkt
              </Typography>
            </Grid>
            {saveError && (
              <Grid item xs={12}>
                <Box className={classes.saveErrorBox}>
                  <Typography variant="body2">
                    <WarningIcon /> Korrektur konnte nicht gespeichert werden.
                    Bitte probieren Sie es später noch ein mal.
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box className={classes.actionBox}>{actionBox}</Box>
            </Grid>
          </>
        )}
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
  hideNext: PropTypes.bool,
  positionChanged: PropTypes.bool,
};

UnfallBox.defaultProps = {
  accident: {},
};

export default UnfallBox;

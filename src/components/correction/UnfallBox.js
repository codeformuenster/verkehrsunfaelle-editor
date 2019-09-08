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
import MetaDisplay from './MetaDisplay';

import { useAuthorization } from '../../contexts/authorization-context';

import useMetadata from '../../hooks/use-metadata';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paperHeader: {
    fontWeight: theme.typography.fontWeightRegular,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px 0`,
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 0`,
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
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.fontSize,
    },
  },
  infoButton: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  infoHeader: {
    color: theme.palette.text.primary,
  },
  infoDefinitionList: {
    color: theme.palette.text.primary,
  },
  infoDefinitionTitle: {
    fontWeight: 500,
  },
  infoDefinition: {
    marginLeft: '10%',
  },
  accidentProperty: {
    fontSize: theme.typography.h6.fontSize,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  accidentPropertySmaller: {
    fontSize: theme.typography.subtitle1.fontSize,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h6.fontSize,
    },
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
  const { authorized, username, engageAuthModal } = useAuthorization();
  const { getMetadata } = useMetadata();

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
            <SaveIcon /> {username === 'Anonym' ? 'Anonym' : 'Unfall'} speichern
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

  const information = (
    <>
      <Typography variant="h6" component="h6" className={classes.infoHeader}>
        Unfalldetails
      </Typography>
      <dl className={classes.infoDefinitionList}>
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
        <InfoButton
          icon="info"
          size="small"
          className={classes.infoButton}
          information={information}
          dialog
        />
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            align="center"
            className={classes.accidentProperty}
          >
            <PlaceName place={accident.place} quotes={true} />
          </Typography>
          <Typography
            variant="caption"
            component="h6"
            color="textSecondary"
            align="center"
          >
            Unfallort
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            align="center"
            className={classes.accidentProperty}
          >
            <PlaceName place={accident.place_near} quotes={true} />
          </Typography>
          <Typography
            variant="caption"
            component="h6"
            color="textSecondary"
            align="center"
          >
            Unfallhöhe
          </Typography>
        </Grid>
        <Grid item xs={12}>
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

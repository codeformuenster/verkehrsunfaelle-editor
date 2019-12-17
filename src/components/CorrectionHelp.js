import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { makeStyles } from '@material-ui/core/styles';

import HelpIcon from '@material-ui/icons/Help';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  dialogText: {
    color: theme.palette.text.primary,
  },
  helpLink: {
    cursor: 'pointer',
  },
  video: {
    maxWidth: 540,
    width: '100%',
  },
}));

const Video = ({ src, title, description }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
          <video
            controls
            className={classes.video}
            autoPlay={false}
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/webm" />
            Dein Browser scheint unsere Videos leider nicht zu unterstützen :(
            Mit einer aktuellen Version von Firefox sollte es klappen.
          </video>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  description: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

const correctionHelpOpener = (
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

const correctionHelpInformation = (
  <>
    <Box display={{ xs: 'block', lg: 'none' }}>{correctionHelpOpener}</Box>
    <Box>
      <Video
        src="unfall_ok.webm"
        title="Der auf der Karte markierte Ort ist korrekt"
        description="Die Ortsangaben passen zum auf der Karte markierten Ort."
      />
      <Video
        src="unfall_verschiebe.webm"
        title={
          <>
            Der auf der Karte markierte Ort ist <strong>nicht</strong> korrekt
          </>
        }
        // eslint-disable-next-line max-len
        description="Die Ortsangaben passen nicht zu dem auf der Karte markierten Ort."
      />
      <Video
        src="unfall_nicht_ok.webm"
        title="Die Ortsangaben sind unvollständig / existieren nicht"
        // eslint-disable-next-line max-len
        description="Bei den Ortsangaben fehlt etwas oder beschreiben einen nicht existierenden Ort."
      />
      <Video
        src="unfall_kein_ort.webm"
        title="Die Karte enhält keinen Ort"
        // eslint-disable-next-line max-len
        description="Für diesen Unfall existiert kein Vorschlag for einen passenden Ort."
      />
    </Box>
  </>
);

const CorrectionHelp = ({ buttonOnly }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="help-dialog-description"
        aria-labelledby="help-dialog-title"
      >
        <DialogTitle id="help-dialog-title">Hilfe zur Korrektur</DialogTitle>
        <DialogContent>
          <DialogContentText
            component="div"
            id="help-dialog-description"
            className={classes.dialogText}
          >
            {correctionHelpInformation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      {buttonOnly ? (
        <Box display={{ xs: 'block', lg: 'none' }}>
          <Tooltip title="Direktlink zu diesem Unfall" arrow>
            <IconButton
              color="inherit"
              aria-label="Hilfe zur Korrektur"
              onClick={() => setOpen(true)}
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box display={{ xs: 'none', lg: 'block' }}>
          {correctionHelpOpener}
          <MuiLink
            component="span"
            onClick={() => setOpen(true)}
            className={classes.helpLink}
          >
            Hilfe anzeigen
          </MuiLink>
        </Box>
      )}
    </>
  );
};

CorrectionHelp.propTypes = {
  buttonOnly: PropTypes.bool,
};

export default CorrectionHelp;

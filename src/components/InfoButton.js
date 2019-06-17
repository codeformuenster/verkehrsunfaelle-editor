import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';

const InfoButton = ({ icon, information, className, dialog, size }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  if (dialog === true) {
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {information}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Alles klar
            </Button>
          </DialogActions>
        </Dialog>
        <IconButton
          color="inherit"
          aria-label={icon === 'help' ? 'Hilfe' : 'Info'}
          className={className}
          onClick={handleOpen}
        >
          {icon === 'help' ? (
            <HelpIcon fontSize={size} />
          ) : (
            <InfoIcon fontSize={size} />
          )}
        </IconButton>
      </>
    );
  } else {
    return (
      <Tooltip title={information}>
        {icon === 'help' ? (
          <HelpIcon fontSize={size} />
        ) : (
          <InfoIcon fontSize={size} />
        )}
      </Tooltip>
    );
  }
};

InfoButton.propTypes = {
  icon: PropTypes.oneOf(['help', 'info']),
  information: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  dialog: PropTypes.bool,
  size: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
};

InfoButton.defaultProps = {
  icon: 'info',
};

export default InfoButton;

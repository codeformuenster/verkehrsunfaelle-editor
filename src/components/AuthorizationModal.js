import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
  },
  closeButton: {
    float: 'right',
  },
  textField: {
    flexBasis: 200,
    marginBottom: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const AuthorizationForm = ({ onClose, isOpen }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
    >
      <div
        style={{
          top: `50%`,
          left: `50%`,
          transform: `translate(-50%, -50%)`,
        }}
        className={classes.paper}
      >
        <Button
          className={classes.closeButton}
          onClick={() => onClose({ save: false })}
        >
          <CloseIcon />
        </Button>
        <Typography variant="h6">Anmelden</Typography>
        <Typography variant="subtitle1">
          Anonym speichern? Total in Ordnung!
        </Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          type="text"
          label="Name"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          label="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="center" pt={2}>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            onClick={() => onClose({ save: true })}
          >
            Speichern ohne Anmeldung
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={`${username}${password}` === ''}
            onClick={() => onClose({ username, password, save: true })}
          >
            Anmelden &amp; Speichern
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

AuthorizationForm.propTypes = {
  isOpen: PropTypes.boolean,
  onClose: PropTypes.func,
};

export default AuthorizationForm;

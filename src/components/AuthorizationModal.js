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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import useUserCredentials from '../hooks/use-user-credentials';

const useStyles = makeStyles(theme => ({
  tabs: {
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textField: {
    flexBasis: 200,
    marginBottom: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loadingWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
  },
  alert: {
    color: theme.palette.error.main,
    margin: theme.spacing(1),
    textAlign: 'center',
  },
  or: {
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.text.hint}`,
    lineHeight: '0.1em',
    margin: `10px 0 ${theme.spacing(3)}px`,
    '& span': {
      background: theme.palette.background.paper,
      padding: '0 10px',
    },
  },
}));

const AuthorizationForm = ({ onClose, isOpen, showLoading, error }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    username,
    password,
    setUsername,
    setPassword,
    usernameValid,
    credentialsValid,
    resetCredentials,
  } = useUserCredentials();
  const [mode, setMode] = React.useState(0);

  const onTabChange = (_, tab) => {
    setMode(tab);
    resetCredentials();
  };

  const submit = () => {
    if (credentialsValid) {
      onClose({
        username,
        password,
        action: mode === 0 ? 'signin' : 'register',
      });
      resetCredentials();
    }
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
      onBackdropClick={() => onClose()}
    >
      <div className={classes.paper}>
        {showLoading === true ? (
          <div className={classes.loadingWrap}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Button className={classes.closeButton} onClick={() => onClose()}>
              <CloseIcon />
            </Button>
            <Tabs
              value={mode}
              onChange={onTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
            >
              <Tab icon={<PersonIcon />} label="Einloggen" />
              <Tab icon={<PersonAddIcon />} label="Registrieren" />
            </Tabs>
            {error && (
              <Typography variant="h6" className={classes.alert}>
                {error}
              </Typography>
            )}
            {mode === 0 && (
              <>
                <Box display="flex" justifyContent="center" pt={1} pb={1}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      onClose({
                        username: 'Anonym',
                        password: 'anon',
                        action: 'signin',
                      })
                    }
                  >
                    Anonym einloggen
                  </Button>
                </Box>
                <Typography
                  variant="body2"
                  component="div"
                  className={classes.or}
                >
                  <span>oder</span>
                </Typography>
              </>
            )}
            <TextField
              className={classes.textField}
              variant="outlined"
              type="text"
              label="Name"
              error={!usernameValid}
              helperText={'Erlaubte Zeichen sind a-zA-Z0-9@_-.'}
              fullWidth
              value={username}
              autoFocus
              required
              disabled={showLoading}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              label="Passwort"
              value={password}
              required
              disabled={showLoading}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      tabIndex="-1"
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
                color="primary"
                disabled={showLoading || !credentialsValid}
                onClick={submit}
              >
                {mode === 0 ? 'Einloggen' : 'Registrieren'}
              </Button>
            </Box>
          </>
        )}
      </div>
    </Modal>
  );
};

AuthorizationForm.propTypes = {
  isOpen: PropTypes.bool,
  showLoading: PropTypes.bool,
  onClose: PropTypes.func,
  error: PropTypes.string,
};

export default AuthorizationForm;

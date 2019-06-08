import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from './Link';

import { useAuthorization } from '../contexts/authorization-context';

import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  linksBox: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  separator: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  betaBadge: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    backgroundColor: '#ee1020',
    textTransform: 'uppercase',
    transform: 'rotate(25grad)',
    display: 'inline-block',
    fontSize: '70%',
    position: 'relative',
    right: 20,
    top: -18,
  },
}));

const Topbar = () => {
  const classes = useStyles();
  const { authorized, username, engageAuthModal, signout } = useAuthorization();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onProfileMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          signout();
          handleMenuClose();
        }}
      >
        Ausloggen
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Verkehrsunfälle in Münster{' '}
            <span className={classes.betaBadge}>Beta</span>
          </Typography>
          <Box className={classes.linksBox}>
            <Link to="/faq" color="inherit">
              <Button color="inherit">FAQ</Button>
            </Link>
            <span className={classes.separator}>|</span>
            <Link to="/rohdaten" color="inherit">
              <Button color="inherit">Rohdaten</Button>
            </Link>
            <span className={classes.separator}>|</span>
            <Link to="/unfall" color="inherit">
              <Button color="inherit">Korrektur</Button>
            </Link>
            <span className={classes.separator}>|</span>
            <Button
              color="inherit"
              onClick={authorized ? onProfileMenuClick : engageAuthModal}
            >
              {authorized === true ? (
                <>
                  {username}&nbsp;
                  <AccountCircleIcon />
                </>
              ) : (
                <>
                  Einloggen&nbsp;
                  <CircleIcon />
                </>
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Topbar;

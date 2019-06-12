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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useAuthorization } from '../contexts/authorization-context';

import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  linksBox: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
    },
  },
  mobileLinks: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      display: 'flex',
    },
  },
  mobileTitle: {
    [theme.breakpoints.down('md')]: {
      flexGrow: 1,
      display: 'flex',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    transform: 'rotate(-40grad)',
    display: 'inline-block',
    fontSize: '0.9rem',
    fontWeight: '700',
    position: 'absolute',
    left: 0,
    top: 6,
  },
}));

const links = [
  {
    label: 'FAQ',
    to: '/faq',
  },
  {
    label: 'Rohdaten',
    to: '/rohdaten',
  },
  {
    label: 'Korrektur',
    to: '/korrektur',
  },
];

const Topbar = () => {
  const classes = useStyles();
  const { authorized, username, engageAuthModal, signout } = useAuthorization();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onProfileMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const onMobileMenuClick = event => {
    setMobileAnchorEl(event.currentTarget);
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

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {links.map(l => (
        <MenuItem key={`${l.to}-mobile`}>
          <Link to={l.to} color="inherit" onClick={handleMobileMenuClose}>
            {l.label}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to="/" color="inherit">
              Verkehrsunfälle in Münster
            </Link>
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.mobileTitle}
          >
            Verkehrsunfälle
            <br />
            in Münster
          </Typography>
          <span className={classes.betaBadge}>Beta</span>
          <Box className={classes.mobileLinks}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={onMobileMenuClick}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className={classes.linksBox}>
            {links.map((l, index) => (
              <React.Fragment key={l.to}>
                <Link to={l.to} color="inherit">
                  <Button color="inherit">{l.label}</Button>
                </Link>
                {index !== links.length - 1 && (
                  <span className={classes.separator}>|</span>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Box>
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
      {renderMobileMenu}
    </div>
  );
};

export default Topbar;

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
  toolbar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.fontSize.h6,
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
    left: -6,
    top: 3,
    [theme.breakpoints.up('md')]: {
      top: 6,
    },
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
  const [userMenuIsOpen, setUserMenuOpen] = React.useState(false);
  const [mobileMenuIsOpen, setMobileMenuOpen] = React.useState(false);

  const userMenuAnchorEl = React.useRef(null);
  const mobileMenuAnchorEl = React.useRef(null);

  const onUserMenuClose = React.useCallback(() => {
    setUserMenuOpen(false);
  }, [setUserMenuOpen]);

  const onMobileMenuClose = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  const onUserMenuOpen = React.useCallback(() => {
    if (authorized) {
      setUserMenuOpen(true);
    } else {
      engageAuthModal();
    }
  }, [authorized, setUserMenuOpen, engageAuthModal]);

  const onMobileMenuOpen = React.useCallback(() => {
    setMobileMenuOpen(true);
  }, [setMobileMenuOpen]);

  React.useLayoutEffect(() => {
    onUserMenuClose();
  }, [authorized, onUserMenuClose]);

  const renderUserMenu = (
    <Menu
      anchorEl={userMenuAnchorEl.current}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={userMenuIsOpen}
      onClose={onUserMenuClose}
    >
      <MenuItem onClick={signout}>Ausloggen</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl.current}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={mobileMenuIsOpen}
      onClose={onMobileMenuClose}
    >
      {links.map(l => (
        <MenuItem key={`${l.to}-mobile`}>
          <Link to={l.to} color="inherit" onClick={onMobileMenuClose}>
            {l.label}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
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
            <Link to="/" color="inherit">
              Verkehrsunfälle
              <br />
              in Münster
            </Link>
          </Typography>
          <span className={classes.betaBadge}>Beta</span>
          <Box className={classes.mobileLinks}>
            <IconButton
              ref={mobileMenuAnchorEl}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={onMobileMenuOpen}
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
              ref={userMenuAnchorEl}
              color="inherit"
              onClick={onUserMenuOpen}
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
      {renderUserMenu}
      {renderMobileMenu}
    </>
  );
};

export default Topbar;

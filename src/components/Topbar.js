import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from './Link';

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
}));

const Topbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Verkehrsunfälle in Münster
          </Typography>
          <Box className={classes.linksBox}>
            <Link to="/rohdaten" color="inherit">
              <Button color="inherit">Rohdaten</Button>
            </Link>
            <Link to="/unfall" color="inherit">
              <Button color="inherit">Korrektur</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;

import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

import Link from '../components/Link';
import Stats from '../components/Stats';
import Toplist from '../components/Toplist';

const useStyles = makeStyles(theme => ({
  toplist: {
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      right: 0,
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(4),
      width: 300,
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
    },
  },
  wrapper: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}));

export default function IndexPage() {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h4" gutterBottom>
            Verkehrsunfälle in Münster
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Wir wollen Verkehrsunfälle in Münster besser verstehen. Dafür
            brauchen wir eine Datengrundlage, mit der auch Computer problemlos
            arbeiten können. Die Daten lassen sich auf{' '}
            <MuiLink
              href="https://crashes.codeformuenster.org/"
              rel="noopener"
              target="_blank"
            >
              crashes.codeformuenster.org
            </MuiLink>{' '}
            erkunden.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Diese Seite soll dabei helfen, den Datensatz zu verbessern. Jeder
            kann dabei mithelfen, Fehler des Computers bei der Erkennung des
            Unfallortes zu korrigieren. Es ist ganz einfach und macht sogar
            Spaß!
          </Typography>
        </Box>
        <Box my={4}>
          <Typography align="center">
            <Link to="/korrektur">
              <Button variant="contained" color="primary">
                Loslegen!
              </Button>
            </Link>
          </Typography>
        </Box>
        <Box my={4}>
          <Typography variant="body1" align="justify">
            <Stats />
            &nbsp;<Link to="/rohdaten">Mehr Informationen&hellip;</Link>
          </Typography>
        </Box>
      </Container>
      <Box className={classes.toplist}>
        <Paper>
          <Box p={2}>
            <Toplist />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import Link from '../components/Link';
import Stats from '../components/Stats';
import Toplist from '../components/Toplist';

const useStyles = makeStyles(() => ({
  mainContainer: {
    marginRight: 0,
  },
}));

export default function IndexPage() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={7} md={9}>
        <Container maxWidth="sm" className={classes.mainContainer}>
          <Box my={4}>
            <Typography variant="h4" component="h4" gutterBottom>
              Verkehrsunfälle in Münster
            </Typography>
            <Typography variant="body1" align="justify" gutterBottom>
              Wir wollen Verkehrsunfälle in Münster besser verstehen. Dafür
              brauchen wir eine Datengrundlage, mit der auch Computer problemlos
              arbeiten können.
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
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
        <Box my={4} mr={2}>
          <Paper>
            <Box py={2}>
              <Toplist />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

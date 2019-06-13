import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Link from '../components/Link';

export default function IndexPage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          Verkehrsunfälle in Münster
        </Typography>
        <Typography variant="body1" gutterBottom>
          Wir wollen Verkehrsunfälle in Münster besser verstehen, dafür brauchen
          wir eine maschinenlesbare Datengrundlage.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Diese Seite soll dabei helfen, den Datensatz zu verbessern. Jeder kann
          dabei mithelfen, Fehler des Computers bei der Erkennung des
          Unfallortes zu verbessern.
        </Typography>
        <Typography align="center">
          <Link to="/korrektur">
            <Button variant="contained" color="primary">
              Loslegen!
            </Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

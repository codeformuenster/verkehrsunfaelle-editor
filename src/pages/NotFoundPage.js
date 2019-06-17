import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typo from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Link from '../components/Link';

export default function IndexPage({ uri }) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typo variant="h4" component="h4" gutterBottom>
          Seite nicht gefunden
        </Typo>
        <Typo variant="body1" gutterBottom>
          Unter der Adresse <Typo variant="caption">{uri}</Typo> existiert
          leider keine Seite. :(
        </Typo>
        <Typo variant="body1">Am besten, du gehst zurück zur Hauptseite.</Typo>
      </Box>
      <Box mb={4}>
        <Typo align="center">
          <Link color="inherit" to="/">
            <Button variant="contained" color="primary">
              Zurück zur Hauptseite
            </Button>
          </Link>
        </Typo>
      </Box>
    </Container>
  );
}

IndexPage.propTypes = {
  uri: PropTypes.string,
};

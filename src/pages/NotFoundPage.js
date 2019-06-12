import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Link from '../components/Link';

export default function IndexPage({ uri }) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          Seite nicht gefunden
        </Typography>
        <Typography variant="body1" gutterBottom>
          Unter der Adresse <Typography variant="caption">{uri}</Typography>{' '}
          existiert leider keine Seite. :(
        </Typography>
        <Typography variant="body1">
          Am besten, du gehst zurück zur Hauptseite.
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography align="center">
          <Link naked to="/">
            <Button variant="contained" color="primary">
              Zurück zur Hauptseite
            </Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

IndexPage.propTypes = {
  uri: PropTypes.string,
};

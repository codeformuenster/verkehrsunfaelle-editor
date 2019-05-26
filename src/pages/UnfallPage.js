import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Map from '../components/Map';

import '../styles/unfall.css';

export default function UnfallPage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          Verkehrsunfall wird geladen&hellip;
        </Typography>
        <Map />
      </Box>
    </Container>
  );
}

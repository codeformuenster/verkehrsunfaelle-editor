import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';

const Footer = () => (
  <Box mt={3}>
    <Grid container direction="row" justify="center" alignItems="center">
      Ein Projekt von{' '}
      <MuiLink href="https://codeformuenster.org/">
        <img
          alt="Code for Münster"
          src="https://codeformuenster.org/img/cfm_logo.png"
        />
      </MuiLink>
    </Grid>
  </Box>
);

export default Footer;

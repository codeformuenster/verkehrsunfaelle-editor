import React from 'react';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';

const Footer = () => (
  <Grid container direction="row" justify="center" alignItems="center">
    Ein Projekt von{' '}
    <MuiLink href="https://codeformuenster.org/">
      <img
        alt="Code for Münster"
        src="https://codeformuenster.org/img/cfm_logo.png"
      />
    </MuiLink>
  </Grid>
);

export default Footer;

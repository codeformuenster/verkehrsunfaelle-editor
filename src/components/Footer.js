import React from 'react';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';

const Footer = () => (
  <Box
    mt={3}
    justifyContent="center"
    alignItems="center"
    display="flex"
    flexDirection={{ xs: 'column', sm: 'row' }}
  >
    Ein Projekt von{' '}
    <MuiLink href="https://codeformuenster.org/">
      <img
        alt="Code for Münster"
        src="https://codeformuenster.org/img/cfm_logo.png"
      />
    </MuiLink>
  </Box>
);

export default Footer;

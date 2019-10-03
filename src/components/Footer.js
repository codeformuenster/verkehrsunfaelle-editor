import React from 'react';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';

const Footer = () => (
  <>
    <Box
      mt={3}
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
    >
      Ein Projekt von{' '}
      <MuiLink
        href="https://codeformuenster.org/"
        target="_blank"
        rel="noopener"
      >
        <img
          alt="Code for Münster"
          src="https://codeformuenster.org/img/cfm_logo.png"
        />
      </MuiLink>
    </Box>
    <Box justifyContent="center" display="flex">
      <Box display="flex" justifyContent="space-between" style={{ width: 300 }}>
        <MuiLink
          href="https://github.com/codeformuenster/verkehrsunfaelle-editor"
          target="_blank"
          rel="noopener"
        >
          Quellcode (Version{' '}
          {/* eslint-disable no-undef */ process.env.REACT_APP_VERSION})
        </MuiLink>
        <span>|</span>
        <MuiLink
          href="https://codeformuenster.org/impressum/"
          target="_blank"
          rel="noopener"
        >
          Impressum
        </MuiLink>
      </Box>
    </Box>
  </>
);

export default Footer;

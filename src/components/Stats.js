import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useStats from '../hooks/use-stats';

const useStyles = makeStyles(() => ({
  number: {
    fontFamily: [
      'Consolas',
      '"Andale Mono WT"',
      '"Andale Mono"',
      '"Lucida Console"',
      '"Lucida Sans Typewriter"',
      '"DejaVu Sans Mono"',
      '"Bitstream Vera Sans Mono"',
      '"Liberation Mono"',
      '"Nimbus Mono L"',
      'Monaco',
      '"Courier New"',
      'Courier',
      'monospace',
    ].join(','),
  },
}));

const Stats = () => {
  const classes = useStyles();

  const {
    isLoading,
    numAccidents,
    numGeometries,
    numCorrections,
    numAccounts,
  } = useStats();

  if (isLoading === true) {
    return null;
  }

  return (
    <>
      Diese Datenbank umfasst zur Zeit{' '}
      <Typography component="span" className={classes.number}>
        {numAccidents}
      </Typography>{' '}
      Unfälle, davon{' '}
      <Typography component="span" className={classes.number}>
        {numGeometries}
      </Typography>{' '}
      mit maschinenlesbarem Unfallort und{' '}
      <Typography component="span" className={classes.number}>
        {numCorrections}
      </Typography>{' '}
      Korrekturen von{' '}
      <Typography component="span" className={classes.number}>
        {numAccounts}
      </Typography>{' '}
      verschiedenen Helfern.
    </>
  );
};

export default Stats;

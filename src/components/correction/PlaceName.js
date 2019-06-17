import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  placeName: {
    '& q': {
      fontFamily: 'monospace',
      fontSize: '80%',
      '&:before': { content: '"\\201E"' },
      '&:after': { content: '"\\201C"' },
    },
    '& .missingValueTooltip': {
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    },
  },
}));

const PlaceName = ({ place, quotes = false, className }) => {
  const classes = useStyles();

  if (place === '') {
    return (
      <span className={clsx(classes.placeName, className)}>
        <Tooltip title="Fehlende Angabe" placement="right">
          <span className="missingValueTooltip">
            {quotes === true ? <q>&#8213;</q> : <span>&#8213;</span>}{' '}
            <InfoIcon />
          </span>
        </Tooltip>
      </span>
    );
  }

  if (quotes === true) {
    return (
      <span className={clsx(classes.placeName, className)}>
        <q>{place}</q>
      </span>
    );
  }

  return <span className={clsx(classes.placeName, className)}>{place}</span>;
};

PlaceName.propTypes = {
  className: PropTypes.string,
  quotes: PropTypes.bool,
  place: PropTypes.string,
};

export default PlaceName;

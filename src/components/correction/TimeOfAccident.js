import React from 'react';
import PropTypes from 'prop-types';

// We're skipping Javascript dates altogether here because:
// - We know the input format (YYYY-MM-DD)
// - We only want to display it as DD.MM.YYYY
// - No computations
const formatISODateStrToGermanDateStr = (datestr = '') => {
  const [year, month, day] = datestr.split('-');
  return `${day}.${month}.${year}`;
};

const TimeOfAccident = ({ date }) => {
  if (!date) {
    return <>&nbsp;</>;
  }
  return formatISODateStrToGermanDateStr(date);
};

TimeOfAccident.propTypes = {
  date: PropTypes.string,
};

export default TimeOfAccident;

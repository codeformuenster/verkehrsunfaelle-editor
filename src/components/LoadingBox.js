import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingBox = ({ minHeight, className }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight={minHeight ? minHeight : '50vh'}
    className={className}
  >
    <CircularProgress />
  </Box>
);

LoadingBox.propTypes = {
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default LoadingBox;

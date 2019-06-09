import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingBox = ({ minHeight }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight={minHeight ? minHeight : '50vh'}
  >
    <CircularProgress />
  </Box>
);

LoadingBox.propTypes = {
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LoadingBox;

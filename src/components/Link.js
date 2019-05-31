import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReachLink } from '@reach/router';
import MuiLink from '@material-ui/core/Link';

function LinkComposed(props) {
  return (
    <ReachLink
      getProps={({ isCurrent }) => {
        return isCurrent
          ? { className: `${props.className} current-path-link` }
          : null;
      }}
      {...props}
    />
  );
}

// eslint-disable react/require-default-props
LinkComposed.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
};
// eslint-enable react/require-default-props

function Link(props) {
  const { className, naked, ...other } = props;

  if (naked) {
    return <LinkComposed className={className} {...other} />;
  }

  return <MuiLink component={LinkComposed} className={className} {...other} />;
}

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  naked: PropTypes.bool,
};

export default Link;

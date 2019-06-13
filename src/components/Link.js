import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReachLink } from '@reach/router';
import MuiLink from '@material-ui/core/Link';

const LinkComposed = React.forwardRef((props, ref) => (
  <ReachLink
    ref={ref}
    getProps={({ isCurrent }) => {
      return isCurrent
        ? { className: `${props.className} current-path-link` }
        : null;
    }}
    {...props}
  />
));

LinkComposed.displayName = 'LinkComposed';

// eslint-disable react/require-default-props
LinkComposed.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
};
// eslint-enable react/require-default-props

function Link(props) {
  const { className, ...other } = props;

  return <MuiLink component={LinkComposed} className={className} {...other} />;
}

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
};

export default Link;

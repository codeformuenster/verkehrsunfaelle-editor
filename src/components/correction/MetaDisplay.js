import React from 'react';
import Button from '@material-ui/core/Button';

const MetaDisplayInner = ({ id, title, description, category }) => {
  const [showDescription, setShowDescription] = React.useState(false);
  return (
    <span>
      {title || category} ({id})
      {showDescription ? (
        <>
          :<br />
          {description}
        </>
      ) : (
        <Button
          small
          onClick={() => {
            setShowDescription(true);
          }}
        >
          mehr
        </Button>
      )}
    </span>
  );
};

const MetaDisplay = ({ results, ...props }) => {
  if ((props.id === null || typeof props.id === 'undefined') && !results) {
    return null;
  }

  if (results) {
    return (
      <>
        {results.map((props, index) => (
          <>
            <MetaDisplayInner key={props.id} {...props} />
            {index !== results.length - 1 && <br />}
          </>
        ))}
      </>
    );
  }

  return <MetaDisplayInner {...props} />;
};

export default MetaDisplay;

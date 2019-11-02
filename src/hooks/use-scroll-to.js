import React from 'react';

const useScrollTo = () => {
  React.useEffect(() => {
    let timeoutID;
    let iterationCount = 0;

    const checkAndScrollTo = () => {
      iterationCount += 1;
      if (iterationCount > 100) {
        return;
      }

      let element
      try {
        element = document.querySelector(window.location.hash);
      } catch (e) {} // eslint-disable-line no-empty

      if (!element) {
        timeoutID = window.setTimeout(checkAndScrollTo, 100);
      } else {
        element.scrollIntoView();
      }
    };

    timeoutID = window.setTimeout(checkAndScrollTo, 100);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
};

export default useScrollTo;

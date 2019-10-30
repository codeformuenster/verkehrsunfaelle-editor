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

      const element = document.querySelector(window.location.hash);

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

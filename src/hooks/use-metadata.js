import React from 'react';
import useDataHelper from './use-data-helper';

const toKV = arr => {
  const kvObj = {};
  for (const c of arr) {
    kvObj[c.key] = { ...c, id: c.key };
  }
  return kvObj;
};

const useMetadata = () => {
  const [{ isLoading, response: metadata }] = useDataHelper('metadata');

  const categoriesByKey = React.useMemo(() => {
    if (metadata.error) {
      return metadata;
    }

    const byKey = {};
    for (const category of Object.keys(metadata)) {
      if (category === 'error') {
        continue;
      }
      byKey[category] = toKV(metadata[category]);
    }

    return byKey;
  }, [metadata]);

  const getMetadata = React.useCallback(
    (type, keys) => {
      if (
        !Array.isArray(keys) &&
        categoriesByKey[type] &&
        categoriesByKey[type][keys]
      ) {
        return categoriesByKey[type][keys];
      }

      if (Array.isArray(keys) && categoriesByKey[type]) {
        const results = [];
        for (const key of keys) {
          if (categoriesByKey[type][key]) {
            results.push(categoriesByKey[type][key]);
          }
        }
        return { results };
      }

      return {};
    },
    [categoriesByKey],
  );

  return { isLoading, metadata, categoriesByKey, getMetadata };
};

export default useMetadata;

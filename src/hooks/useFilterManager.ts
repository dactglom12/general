import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { FilterStateEntry } from '../shared/interfaces';
import { appendSearchParamsToCurrent } from '../utils/urlUtils';

export const getOnlyNonNullFilters = (filters: FilterStateEntry) =>
  Object.entries(filters).reduce((obj, [key, value]) => {
    if (value) {
      obj[key] = value;
    }

    return obj;
  }, {});

export const useUrlParamsManager = () => {
  const history = useHistory();

  const handleApplyFilters = useCallback(
    (updatedFilters: FilterStateEntry) => {
      const newParams = appendSearchParamsToCurrent(updatedFilters);
      if (newParams) {
        history.push({ search: `?${newParams}` });
      }
    },
    [history],
  );

  return {
    handleApplyFilters,
  };
};

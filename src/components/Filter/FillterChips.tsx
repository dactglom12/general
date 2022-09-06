import { Chip } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { getOnlyNonNullFilters } from '../../hooks/useFilterManager';
import { IFilter } from './Filter';

interface IFilterChips
  extends Pick<IFilter, 'externalAppliedFilters' | 'filters'> {
  onChipClick: (field: string) => void;
}

const getChipLabel = (key: string, value: string) => `${key}: ${value}`;

export const FilterChips: React.FC<IFilterChips> = ({
  externalAppliedFilters,
  filters,
  onChipClick,
}) => {
  return (
    <Box>
      {Object.entries(getOnlyNonNullFilters(externalAppliedFilters)).map(
        ([key, value]) => {
          const filter = filters.find((f) => f.stateField === key);
          const stringRepresentationOfValue = filter.mapValueToString(value);

          return (
            <Chip
              label={getChipLabel(key, stringRepresentationOfValue)}
              onDelete={() => onChipClick(key)}
            />
          );
        },
      )}
    </Box>
  );
};

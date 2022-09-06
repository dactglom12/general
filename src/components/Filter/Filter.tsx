import React, { useCallback, useState } from 'react';
import {
  FilterInitialStates,
  getInitialStateFromFilters,
} from '../../utils/filteringUtils';
import {
  Filter,
  FilterStateEntry,
  WithOpenCloseState,
} from '../../shared/interfaces';
import { FilterChips } from './FillterChips';
import { FilterDrawer } from './FIlterDrawer';

export interface IFilter extends WithOpenCloseState {
  filters: Filter[];
  onApplyFilters: (appliedFilters: FilterStateEntry) => void;
  externalAppliedFilters: FilterStateEntry;
}

export const FilterComponent: React.FC<IFilter> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  externalAppliedFilters,
}) => {
  const [localFiltersState, setLocalFilterState] = useState(
    getInitialStateFromFilters(filters, FilterInitialStates.INTERNAL),
  );

  const handleChangeLocalFilter = useCallback(
    (field: string) => (newValue: any) => {
      const currentStateCopy = { ...localFiltersState };
      currentStateCopy[field] = newValue;
      setLocalFilterState(currentStateCopy);
    },
    [localFiltersState],
  );

  const handleChipClick = useCallback(
    (field: string) => {
      const currentStateCopy = { ...localFiltersState };
      const correspondingFilter = filters.find((f) => f.stateField === field);

      if (!correspondingFilter) {
        return;
      }

      currentStateCopy[field] = correspondingFilter.internalInitialState;
      onApplyFilters({
        ...externalAppliedFilters,
        [field]: correspondingFilter.externalInitialState,
      });
      setLocalFilterState(currentStateCopy);
    },
    [localFiltersState, filters, onApplyFilters, externalAppliedFilters],
  );

  return (
    <>
      <FilterChips
        externalAppliedFilters={externalAppliedFilters}
        filters={filters}
        onChipClick={handleChipClick}
      />
      <FilterDrawer
        filters={filters}
        onApplyFilters={onApplyFilters}
        isOpen={isOpen}
        onClose={onClose}
        handleChangeLocalFilter={handleChangeLocalFilter}
        localFiltersState={localFiltersState}
      />
    </>
  );
};

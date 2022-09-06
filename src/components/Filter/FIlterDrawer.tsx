import { Button, Drawer } from '@mui/material';
import React from 'react';
import { FilterStateEntry } from '../../shared/interfaces';
import { IFilter } from './Filter';

interface IFilterDrawer extends Omit<IFilter, 'externalAppliedFilters'> {
  localFiltersState: FilterStateEntry;
  handleChangeLocalFilter: (field: string) => (newValue: any) => void;
}

export const FilterDrawer: React.FC<IFilterDrawer> = ({
  filters,
  isOpen,
  onApplyFilters,
  onClose,
  localFiltersState,
  handleChangeLocalFilter,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      {filters.map((filter) =>
        filter.render(
          localFiltersState[filter.stateField],
          handleChangeLocalFilter(filter.stateField),
        ),
      )}
      <Button
        onClick={() => {
          onApplyFilters(localFiltersState);
          onClose();
        }}
      >
        Apply Filters
      </Button>
    </Drawer>
  );
};

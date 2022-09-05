import { Filter, FilterStateEntry } from "../shared/interfaces";

export enum FilterInitialStates {
  EXTERNAL = "externalInitialState",
  INTERNAL = "internalInitialState",
}

export const getInitialStateFromFilters = (
  filters: Filter[],
  state: FilterInitialStates
): FilterStateEntry => {
  return filters.reduce((defaultState, currentFilter) => {
    defaultState[currentFilter.stateField] = currentFilter[state];

    return defaultState;
  }, {});
};

import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { FilterComponent } from "../../components/Filter/Filter";
import { getArticles } from "../../store/articles/actions";
import {
  FilterInitialStates,
  getInitialStateFromFilters,
} from "../../utils/filteringUtils";
import { filters } from "./constants";
import { FilterStateEntry } from "../../shared/interfaces";
import { useUrlParamsManager } from "../../hooks/useFilterManager";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { handleApplyFilters } = useUrlParamsManager();
  const [queryString, setQueryString] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filtersState, setFiltersState] = useState(
    getInitialStateFromFilters(filters, FilterInitialStates.EXTERNAL)
  );

  const onApplyFilters = useCallback(
    (newFilters: FilterStateEntry) => {
      handleApplyFilters(newFilters);
      setFiltersState(newFilters);
    },
    [handleApplyFilters]
  );

  const onButtonClick = useCallback(() => {
    dispatch(getArticles({ queryString }));
  }, [dispatch, queryString]);

  return (
    <>
      <div>Home Page</div>
      <input
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      <button onClick={onButtonClick}>Send Request</button>

      <Button onClick={() => setIsDrawerOpen(true)}>Open Filter Drawer</Button>

      <FilterComponent
        onClose={() => setIsDrawerOpen(false)}
        isOpen={isDrawerOpen}
        onApplyFilters={onApplyFilters}
        filters={filters}
        externalAppliedFilters={filtersState}
      />
    </>
  );
};

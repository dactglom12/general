import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import moment from "moment";
import React from "react";
import { Filter } from "../../shared/interfaces";
import { generateRandomUUID } from "../../utils/stringUtils";
import { getSearchParam } from "../../utils/urlUtils";

export const filters: Filter[] = [
  {
    stateField: "text",
    externalInitialState: getSearchParam("text"),
    internalInitialState: getSearchParam("text"),
    render: (value, onChange) => (
      <TextField
        value={value}
        key={generateRandomUUID()}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
    mapValueToString: (value) => value,
  },
  {
    stateField: "date",
    internalInitialState: getSearchParam("date"),
    externalInitialState: getSearchParam("date"),
    render: (value, onChange) => {
      return (
        <DatePicker
          label="Basic example"
          value={value ?? new Date()}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          key={generateRandomUUID()}
        />
      );
    },
    mapValueToString: (value) => {
      if (value === null) return "";

      return moment(value).format("ddd, hA");
    },
  },
];

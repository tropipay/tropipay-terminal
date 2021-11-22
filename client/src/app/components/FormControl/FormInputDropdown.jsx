import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const options = [
  {
    label: "Dropdown Option 1",
    value: "1",
  },
  {
    label: "Dropdown Option 2",
    value: "2",
  },
];

export const FormInputDropdown= ({name,control, label}) => {

  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select onChange={onChange} value={value}>
          {generateSelectOptions()}
        </Select>
      )}
    />
};
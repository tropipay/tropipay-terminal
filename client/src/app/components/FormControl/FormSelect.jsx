import React from "react";
import { MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const FormSelect = ({ name, control, options, className, variant, size, placeholder, rules, type }) => {

  options = options || [];
  placeholder = placeholder || '';
  rules = rules || {};
  variant = variant || "outlined";
  type = type || "text";
  size = size || "small";
  className = className || "";

  const generateOptions = () => {
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
    rules={rules}
    render={({ field: { onChange, value } }) => (
      <Select
        onChange={onChange}
        value={value}
        className={className}
        variant={variant}
        size={size}
        fullWidth
      >
        {generateOptions()}
      </Select>
    )}
  />
};

export default FormSelect;
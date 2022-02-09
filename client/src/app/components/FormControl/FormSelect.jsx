import React from "react";
import { MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const FormSelect = ({ name, label, control, options, className, variant, size, placeholder, rules, type, keys }) => {

  options = options || [];
  keys = keys || {
    label: 'label',
    value: 'value'
  };
  label = label || '';
  placeholder = placeholder || '';
  rules = rules || {};
  variant = variant || "outlined";
  size = size || "large";
  className = className || "";

  const generateOptions = () => {
    return options.map((option, i) => {
      return (
        <MenuItem key={i} value={option[keys.value]}>
          {option[keys.label]}
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
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        variant={variant}
        size={size}
        label={label}
        fullWidth
      >
        {generateOptions()}
      </Select>
    )}
  />
};

export default FormSelect;
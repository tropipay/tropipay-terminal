import React from "react";
import {
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

export const FromCheckBox = ({ name, control, className, variant, size, placeholder, rules, type, label }) => {

  placeholder = placeholder || '';
  label = label || "";
  rules = rules || {};
  variant = variant || "outlined";
  type = type || "text";
  size = size || "small";
  className = className || "";

  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              className={className}
              variant={variant}
              onChange={onChange}
              checked={value}
            />
          )}
        />}
      label={label}
      key={label}
    />
  )
};

export default FromCheckBox;
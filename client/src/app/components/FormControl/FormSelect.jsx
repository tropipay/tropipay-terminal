import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";

const FormSelect = ({
  name,
  control,
  label,
  keys,
  options,
  rules,
  placeholder,
  variant,
  type,
  size,
  className,
  defaultValue
}) => {
  placeholder = placeholder || "";
  options = options || [];
  rules = rules || {};
  keys = keys || {
    label: "label",
    value: "value"
  };
  defaultValue = defaultValue || "outlined";
  variant = variant || "outlined";
  type = type || "text";
  size = size || "small";
  className = className || "";

  const generateOptions = options => {
    return options.map((option, i) => {
      return (
        <MenuItem key={i} value={option[keys.value]}>
          {option[keys.label]}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => (
        <TextField
          select
          helperText={error ? error.message : null}
          size={size}
          label={label}
          placeholder={placeholder}
          error={!!error}
          onChange={onChange}
          type={type}
          className={className}
          fullWidth
          defaultValue={defaultValue}
          variant={variant}
        >
          {generateOptions(options)}
        </TextField>
      )}
    />
  );
};

export default FormSelect;

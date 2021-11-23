import React from "react";
import { Controller } from "react-hook-form";
import { TextareaAutosize } from "@mui/core";

export const FormTextArea = ({ name, control, className, variant, size, placeholder, rules, type, label }) => {

  placeholder = placeholder || '';
  rules = rules || {};
  variant = variant || "outlined";
  type = type || "text";
  size = size || "small";
  className = className || "";

  return <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value } }) => (
        <TextareaAutosize             
            onChange={onChange}
            value={value}
            aria-label={label}
            placeholder={placeholder}
            className={className}
            variant={variant}
            minRows={3}
            />
    )}
  />
};

export default FormTextArea;
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import EyeIcon from 'mdi-react/EyeIcon';
import EyeOffIcon from 'mdi-react/EyeOffIcon';

const FormTextField = ({ name, control, label, rules, placeholder, variant, type, size, className, decorator, multiline, minRows }) => {
  placeholder = placeholder || '';
  rules = rules || {};
  variant = variant || "outlined";
  type = type || "text";
  size = size || "small";
  className = className || "";
  decorator = decorator || "";
  multiline = multiline || false;

  const [showpass, setShowpass] = useState(false);

  const handleClickShowPassword = () => {
    setShowpass(!showpass)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
      }) => decorator === "btnpass" ?
          <Input
            size={size}
            label={label}
            placeholder={placeholder}
            error={!!error} 
            onChange={onChange}
            value={value}
            className={className}
            fullWidth
            variant={variant}
            type={showpass ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showpass ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          :
          <TextField
            helperText={error ? error.message : null}
            size={size}
            label={label}
            placeholder={placeholder}
            error={!!error}
            onChange={onChange}
            value={value}
            type={type}
            className={className}
            multiline={multiline}
            fullWidth
            variant={variant}
          />
      }
    />
  );
};

export default FormTextField;
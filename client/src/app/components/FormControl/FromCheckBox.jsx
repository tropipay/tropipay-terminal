import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

const FromCheckBox = ({
  name,
  control,
  setValue,
  label,
  options,
  keys
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  options = options || [];
  keys = keys || {
    label: 'label',
    value: 'value'
  };

  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  /*useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);*/

  return (
    <FormControl size={"small"} variant={"outlined"}>

      {label!=="" ? <FormLabel component="legend">{label}</FormLabel> : null}

      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({ }) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option[keys.value])}
                        onChange={() => handleSelect(option[keys.value])}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option[keys.label]}
              key={option[keys.value]}
            />
          );
        })}
      </div>
    </FormControl>
  );
};

export default FromCheckBox;
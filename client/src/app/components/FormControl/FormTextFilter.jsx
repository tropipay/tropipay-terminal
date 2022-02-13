import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "mdi-react/SearchIcon";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { exec } from "../../services/util";
//import DownloadIcon from "mdi-react/DownloadIcon";
//import ClearIcon from "mdi-react/ClearIcon";
import "./FormTextFilter.scss";

function FormTextFilter(props) {
  const { placeholder, name, id, value } = props;
  const [text, setText] = useState(value || "");

  return (
    <FormControl fullWidth>
      <OutlinedInput
        className="pr-1 from-filter-input"
        style={{ height: "3.024rem" }}
        id={id || name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={event => {
          setText(event.currentTarget.value);
          exec(props.onChange, [event.currentTarget.value]);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => exec(props.onSearch, [text])}
              className="from-filter-btn-search"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={0}
      />
    </FormControl>
  );
}
export default FormTextFilter;

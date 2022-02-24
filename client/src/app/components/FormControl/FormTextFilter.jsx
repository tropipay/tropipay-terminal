import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "mdi-react/SearchIcon";
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { exec } from "../../services/util";
import "./FormTextFilter.scss";

const FormTextFilter = React.forwardRef((props, ref) => {
  const { placeholder, name, id, value, onKeyPress, autoFocus } = props;
  const [text, setText] = useState(value || "");

  return (
    <FormControl fullWidth>
      <Input
        className="pr-1 from-filter-input"
        style={{ height: "3.024rem" }}
        id={id || name}
        name={name}
        type="text"
        ref={ref}
        autoFocus={autoFocus} 
        placeholder={placeholder}
        value={text}
        onKeyPress={onKeyPress}
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
      />
    </FormControl>
  );
});
export default FormTextFilter;

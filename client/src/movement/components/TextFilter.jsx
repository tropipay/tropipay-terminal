import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "mdi-react/SearchIcon";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { exec } from "../../app/services/util";
//import DownloadIcon from "mdi-react/DownloadIcon";
//import ClearIcon from "mdi-react/ClearIcon";

function TextFilter(props) {
  const { t } = useTranslation();
  const [text, setText] = useState(props.value || "");

  return (
      <FormControl fullWidth>
        <OutlinedInput
          className="pr-1"
          style={{ height: "3.024rem" }}
          id="criteria"
          name="criteria"
          type="text"
          placeholder={t("movement.search")}
          value={text}
          onChange={event => {
            setText(event.currentTarget.value);
            exec(props.onChange, [event.currentTarget.value]);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => exec(props.onSearch, [text])}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={0}
        />
      </FormControl>
  );
}
export default TextFilter;


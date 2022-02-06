import { useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
//import DownloadIcon from "mdi-react/DownloadIcon";
import ClearIcon from "mdi-react/ClearIcon";
import SearchIcon from "mdi-react/SearchIcon";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { exec } from '../../app/services/util';

function TextFilter(props) {
  const { t } = useTranslation();
  const [text, setText] = useState(props.value || "");

  return (
    <div className="row mb-1">
      <div className="col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9 pr-0">
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
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setText("");
                    exec(props.onClean);
                  }}
                  style={{ padding: "8px", marginTop: "8px" }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />
        </FormControl>
      </div>
      <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right pl-0">
        <IconButton onClick={() => exec(props.onSearch, [text])}>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}
export default TextFilter;

// {this._renderSearchFilter()}

import React from "react";
import { exec } from "../../services/util";
import ListItem from "@material-ui/core/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

function MenuItem(props) {
  const nav = useHistory();
  const { t } = useTranslation();
  const { id, icon, label } = props.model;

  const isExternal = str => {
    const tmp = (str || "").match(/https{0,1}:\/\/.*/gm);
    return tmp ? true : false;
  };

  function handleClick(item) {
    if (item.to) {
      if (!isExternal(item.to) && nav && nav.push instanceof Function) {
        nav.push(item.to);
      } else {
        window.location.href = item.to;
      }
    }
    exec(item.onClick, [item]);
  }

  return (
    <ListItem
      disablePadding
      model={props.model}
      key={id}
      className={props.model.className || ""}
      onClick={event => handleClick(props.model, event)}
    >
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={t(label)} />
      </ListItemButton>
    </ListItem>
  );
}
export default MenuItem;

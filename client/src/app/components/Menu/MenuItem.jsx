import React from "react";
import { exec, hasHTTP } from "../../services/util";
import ListItem from "@material-ui/core/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import './MenuItem.scss';

function MenuItem(props) {
  const nav = useHistory();
  const { t } = useTranslation();
  const { id, icon, label, className } = props.model;

  function handleClick(item) {
    if (item.to) {
      if (!hasHTTP(item.to) && nav && nav.push instanceof Function) {
        nav.push(item.to);
      } else {
        window.location.href = item.to;
      }
    }
    exec(item.onClick, [item]);
  }

  return (
    <ListItem
      model={props.model}
      key={id}
      className={`menu-item ${className}`}
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

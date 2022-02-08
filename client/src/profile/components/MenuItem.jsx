import React from "react";
import { exec } from "../../app/services/util";
import ListItem from "@material-ui/core/ListItem";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; 

function MenuItem(props) {
  const { t } = useTranslation();
  const nav = useLocation();

  const isExternal = str => {
    const tmp = (str || "").match(/https{0,1}:\/\/.*/gm);
    return tmp ? true : false;
  };

  return (
    <ListItem
      key={props.model.id}
      className={props.model.className || ""}
      onClick={() => {

        if (props.to) {
          if (isExternal(props.model.to)) {
            window.location.href = props.model.to;
          } else {
            nav.push(props.model.to);
          }
        }
        exec(props.onClick, [props.model]);
      }}
    >
      {props.model.icon}
      <Typography>{t(props.model.label)}</Typography>
    </ListItem>
  );
}
export default MenuItem;

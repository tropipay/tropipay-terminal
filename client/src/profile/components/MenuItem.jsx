import React from "react";
import { exec } from "../../app/services/util";
import ListItem from "@material-ui/core/ListItem";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

function MenuItem(props) {
  const { t } = useTranslation();

  const isExternal = str => {
    const tmp = (str || "").match(/https{0,1}:\/\/.*/gm);
    return tmp ? true : false;
  };

  return (
    <ListItem
      key={props.data.id}
      className="history-list-item"
      onClick={() => exec(props.onClick, [props.data])}
    >
      {isExternal(props.data.type) ? (
        <a href={props.data.to} target="_blank">
          {props.data.icon}
          <Typography>{t(props.data.label)}</Typography>
        </a>
      ) : (
        <Link
          className={props.data.className}
          to={props.data.to ? props.data.to : ""}
        >
          {props.data.icon}
          <Typography>{t(props.data.label)}</Typography>
        </Link>
      )}
    </ListItem>
  );
}
export default MenuItem;

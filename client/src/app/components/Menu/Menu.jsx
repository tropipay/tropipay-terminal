import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useHistory } from "react-router-dom";
import MenuPage from "./MenuPage";
import { useTranslation } from "react-i18next";

import TpvFrontLogo from "../../images/terminal-logo-menu.png";
import './Menu.scss';

export default function Menu() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Box  id="main-menu">
      <AppBar position="static" color="default">
        <Toolbar className="menu-tool-bar box-align-between">
          <div
            className="box-label-bold menu-btn box box-align-center"
            onClick={() => history.push("/home")}
          >
            <img src={TpvFrontLogo} alt={t("home.name")} />
          </div>
          <MenuPage />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

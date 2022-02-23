import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import MenuPage from "./MenuPage";
import './Menu.scss';

import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "0.9rem" }} id="main-menu">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className="box-label-bold menu-btn"
            style={{cursor: 'pointer'}}
            sx={{ flexGrow: 1 }}
            onClick={() => history.push("/home")}
          >
            {t("home.name")}
          </Typography>
          <MenuPage />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

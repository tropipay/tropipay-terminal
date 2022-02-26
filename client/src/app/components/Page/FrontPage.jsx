import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';

import Login from "../../../security/components/login";
import links from "../../models/menu.link";
import MenuLink from "../Menu/MenuLink";
import SocialBtn from "../ShareThis/SocialBtn";
import CadsBtn from "../ShareThis/CardsBtn";

import TpvLogo from "../../images/terminal-logo.png";
import session from "../../../security/services/Session";
import "./FrontPage.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "0"
  },
  layoutLeft: {
    height: "100vh",
    margin: "0"
  },
  layoutRight: {
    backgroundColor: "#4B59D3",
    margin: "0"
  },
  layoutRightLG: {
    backgroundColor: "#4B59D3",
    height: "100vh",
    margin: "0"
  }
}));

function FrontPage() {
  const { t } = useTranslation();
  const cls = useStyles();
  const nav = useHistory();

  useEffect(() => {
    if (session.isValid()) {
      const from =
        session.get().from &&
          session.get().from.pathname &&
          session.get().from.pathname !== "/"
          ? session.get().from.pathname
          : "/home";
      nav.push(from);
    }
  });

  return (
    <div className="home page">
      <Grid container>
        <Grid container item xs={12} sm={12 * 2 / 3} className="page-container">
          <div xs={12} lg={12} className="page-front-logo">
            <img src={TpvLogo} alt="TpvLogo" />
          </div>

          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} className="page-front-content">
            <Typography className="page-front-title page-front-font page-front-label-sm" >
              {t("front.title")}
            </Typography>

            <Typography className="page-front-subtitle">
              {t("front.subtitle")}
            </Typography>
            <Login />
          </Box>


          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} className="page-front-content">

            <div className="page-front-title page-front-font">
              <Typography className="page-front-label-lg">
                {t("front.title1")}
              </Typography>
              <Typography>
                {t("front.title2")}
              </Typography>
            </div>

            <div className="page-front-subtitle">
              <Typography className="page-front-label-lg">
                {t("front.subtitle1")}
              </Typography>
              <Typography >
                {t("front.subtitle2")}
              </Typography>
            </div>

            <Login />
          </Box>

          <div className="page-front-btns">
            <CadsBtn className="front-card-btn-icon" />
            <MenuLink data={links} className="page-front-menu-link" />
            <SocialBtn className="front-social-btn-icon" />
          </div>
        </Grid>
        <Grid item sm={{ display: 'none' }} lg={12 * 1 / 3} className={cls.layoutRightLG}></Grid>
        <Grid item xs={{ display: 'none' }} sm={12 * 1 / 3} lg={{ display: 'none' }} className={cls.layoutRight}></Grid>
      </Grid>
    </div>
  );
}

export default FrontPage;

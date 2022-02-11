import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";

import Login from "../../../security/components/login";
import links from "../../models/menu.link";
import MenuLink from "../Menu/MenuLink";
import SocialBtn from "../ShareThis/SocialBtn";
import CadsBtn from "../ShareThis/CardsBtn";

import session from "../../../security/services/Session";
import "./FrontPage.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "98%",
    margin: "0"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  layoutLeft: {
    height: "100vh",
    margin: "0"
  },
  layoutRight: {
    backgroundColor: "#4B59D3",
    minHeight: "2rem",
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
        <Grid item xs={12} sm={8}>
          <div className="box box-vertical box-align-between page-container">
            <div className="front-top">
              <div className="front-company">
                <Typography variant="h6" component="h4" className="page-front-font page-front-app-name">
                  {t("front.name")}
                </Typography>
                <div className="box-horizontal" style={{ marginLeft: "3rem" }}>
                  <Typography className="page-front-text-srv page-front-app-by">
                    {t("front.by")}
                  </Typography>
                  <Typography className="page-front-font page-front-app-company">
                    {t("front.company")}
                  </Typography>
                </div>
              </div>

              <Typography mt="2rem" className="page-front-title page-front-font">
                {t("front.title")}
              </Typography>

              <Typography variant="subtitle1" mt="1rem" mb="1rem">
                {t("front.subtitle")}
              </Typography>

              <Login />
            </div>

            <div className="bottom">
              <MenuLink data={links} />
              <CadsBtn />
              <SocialBtn />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className={cls.layoutRight}></Grid>
      </Grid>
    </div>
  );
}

export default FrontPage;

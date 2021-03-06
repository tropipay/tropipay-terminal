import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';

import Login from "../../../security/components/login";
import links from "../../models/menu.link";
import MenuLink from "../Menu/MenuLink";
import SocialBtn from "../ShareThis/SocialBtn";
import CadsBtn from "../ShareThis/CardsBtn";

import TpvLogo from "../../images/terminal-logo.png";
import TpvFrontLogo from "../../images/terminal-img.png";
import session from "../../../security/services/Session";
import useMediaQuery from '../../services/CustomMediaQuery.js';
import "./FrontPage.scss";

function FrontPage() {
  const { t } = useTranslation();
  const nav = useHistory();
  const mq = useMediaQuery();

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
    <div className="box-horizontal page-front box-align-center">
      <div className="page-container box-vertical box-align-between">
        <div className="page-front-logo">
          <img src={TpvLogo} alt="TpvLogo" />
        </div>


        <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }} className="page-front-content page-front-content-data">
          <Typography className="page-front-title page-front-font page-front-label-sm" >
            {t("front.title")}
          </Typography>
          <Typography className="page-front-subtitle">
            {t("front.subtitle")}
          </Typography>
          <Login />
        </Box>

        <div className="box-horizontal page-front-content">
          <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }} className="page-front-content-data">
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

          <div hidden={mq.in(['xs', 'sm'])} className="" >
            <img src={TpvFrontLogo} className="page-front-logoland" alt="TpvFrontLogo" />
          </div>
        </div>

        <div className="page-front-btns">
          <CadsBtn className="front-card-btn-icon" />
          <MenuLink data={links} className="page-front-menu-link" allowHide />
          <SocialBtn className="front-social-btn-icon" />
        </div>
      </div>

    </div>
  );
}

export default FrontPage;

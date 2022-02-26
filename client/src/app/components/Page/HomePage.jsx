import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import srvProfile from "../../../profile/services/ProfileSlice";

import { Grid } from "@mui/material";
import Button from "@material-ui/core/Button";
import AvatarName from "../Avatar/AvatarName";
import ContentHeader from "../Header/ContentHeader";
import QRCode from "../QRcode/QRCode";
import './HomePage.scss';

function HomePage() {
  const { t } = useTranslation();
  const nav = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(srvProfile.selector.data);
  const error = useSelector(srvProfile.selector.error);
  const shortUrl = useSelector(srvProfile.selector.url);

  useEffect(() => {
    if (!profile && !error) {
      dispatch(srvProfile.action.load());
    }
  });
  
  return (
    <div className="page-margin page-padding">
      <Grid container >
        <Grid item xs={12} className="box box-align-center">
          <AvatarName name={profile ? profile.name : "TS"} />
        </Grid>

        <Grid item xs={12} className="box box-align-center page-home-name">
          <ContentHeader  
            classNameTitle="box-label-bold"
            classNameSubtitle="page-home-subtitle"
            title={profile ? profile.name : "Gest"}
            subtitle={profile ? profile.email : "gest@tropipay.com"}
          />
        </Grid>
        
        <Grid item xs={12} className="box box-align-center">
          <div className="box box-align-center page-home-qr note-bg">
            <QRCode url={shortUrl} size={200} />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            className="btn-full-width"
            size="large"
            style={{ marginTop: "2.5rem" }}
            onClick={() => nav.push("/payment")}
            color="primary"
          >
            {t("home.btn.payment")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            className="btn-full-width"
            size="large"
            style={{ marginTop: "2rem" }}
            onClick={() => nav.push("/movement")}
            color="secondary"
          >
            {t("home.btn.movement")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;

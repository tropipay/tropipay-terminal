import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import srvProfile from '../../security/services/ProfileSlice';

import { Grid } from "@mui/material";
import Button from "@material-ui/core/Button";
import AvatarName from "./Avatar/AvatarName"

function HomePage() {
  const { t } = useTranslation();
  const nav = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(srvProfile.selector.data);

  useEffect(() => {
    if (!profile) {
      dispatch(srvProfile.action.load());
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AvatarName name={profile ? profile.name : "TS"} />
      </Grid>

      <Grid item xs={12} sx={{ alignItems: 'center' }}>
        {profile ? profile.name : null}
      </Grid>

      <Grid item xs={12}>
        {profile ? profile.email : null}
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          className="btn-full-width"
          size="large"
          style={{ marginTop: "2rem" }}
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
  );
}

export default HomePage;

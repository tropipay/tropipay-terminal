import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loadProfile, selectProfile } from "../../security/services/AuthSlice";
import { Grid } from "@mui/material";

function HomePage() {
  const { t } = useTranslation();
  const nav = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (!profile) {
      dispatch(loadProfile());
    }
  });

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        {profile ? profile.name : null}
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

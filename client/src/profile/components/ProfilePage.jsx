import React, { useEffect } from "react";

//import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import srvProfile from "../../security/services/ProfileSlice";
import AvatarName from "../../app/components/Avatar/AvatarName";

function ProfilePage() {
  //const { t } = useTranslation();
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

      <Grid item xs={12} sx={{ alignItems: "center" }}>
        {profile ? profile.name : null}
      </Grid>

      <Grid item xs={12}>
        {profile ? profile.email : null}
      </Grid>
    </Grid>
  );
}

export default ProfilePage;

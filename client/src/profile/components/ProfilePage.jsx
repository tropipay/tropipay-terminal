import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile, selectProfile } from "../../security/services/AuthSlice";

function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (!profile) {
      dispatch(loadProfile());
    }
  });

  return <div className="Demo">
    {profile ? profile.name : null}
  </div>;
}

export default ProfilePage;

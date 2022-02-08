import React, { useEffect } from "react";

import { useLocation } from "react-router-dom"; 
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import srvProfile from "../services/ProfileSlice";
import List from "@material-ui/core/List";
import MenuItem from "./MenuItem";

import AvatarName from "../../app/components/Avatar/AvatarName";
import HelpIcon from 'mdi-react/LifebuoyIcon';
import LogoutIcon from 'mdi-react/LogoutIcon';
import SendIcon from 'mdi-react/SendIcon';
import HomeIcon from 'mdi-react/HomeIcon';

function ProfilePage() {
  const nav = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector(srvProfile.selector.data);
  const menu = [
    {
      className: "",
      label: "menu.home",
      to: "/home",
      icon: <HomeIcon />
    },
    {
      label: "menu.contact",
      className: "",
      to: "https://help.tropipay.com/contact",
      icon: <LogoutIcon />
    },
    {
      label: "menu.help",
      className: "",
      to: "https://help.tropipay.com",
      icon: <HelpIcon />
    },
    {
      label: "menu.logout",
      className: "out",
      icon: <LogoutIcon />,
      onClick: () => {
        dispatch(srvProfile.action.delete);
        nav.push('/');
      }
    }
  ];

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

      <Grid item xs={12}>
        <List className="list marginB2">
          {menu.length > 1
            ? menu.map(item => <MenuItem model={item} />)
            : null}
        </List>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;

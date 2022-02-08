import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@material-ui/core";
import srvProfile from "../../../profile/services/ProfileSlice";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "./MenuItem";

import AvatarName from "../Avatar/AvatarName";
import HelpIcon from "mdi-react/LifebuoyIcon";
import LogoutIcon from "mdi-react/LogoutIcon";
import HomeIcon from "mdi-react/HomeIcon";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "mdi-react/AccountCircleIcon";
import ContentHeader from "../Header/ContentHeader";

function MenuPage() {
  const dispatch = useDispatch();
  const profile = useSelector(srvProfile.selector.data);

  const [openDrawer, setDrawerMenu] = React.useState();
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerMenu(open);
  };

  const options = [
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
        window.location.href = "/";
      }
    }
  ];

  useEffect(() => {
    if (!profile) {
      dispatch(srvProfile.action.load());
    }
  });

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconButton onClick={toggleDrawer(false)}>
              <AccountCircleIcon />}
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <AvatarName name={profile ? profile.name : "TS"} />
          </Grid>

          <Grid item xs={12} sx={{ alignItems: "center" }}>
            <ContentHeader
              title={profile ? profile.name : 'Gest'}
              subtitle={profile ? profile.email : 'gest@tropipay.com'}
            />
          </Grid>
        </Grid>

        <List className="list marginB2">
          {options.length > 1
            ? options.map(item => <MenuItem model={item} />)
            : null}
        </List>
      </Drawer>
    </div>
  );
}

export default MenuPage;

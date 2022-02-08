import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import srvProfile from "../../../profile/services/ProfileSlice";

import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "./MenuItem";

import HelpIcon from "mdi-react/LifebuoyIcon";
import LogoutIcon from "mdi-react/LogoutIcon";
import SendIcon from "mdi-react/SendIcon";
import AccountCircleIcon from "mdi-react/AccountCircleIcon";
import MenuHeader from "./MenuHeader";

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
    /*{
      label: "menu.home",
      to: "/home",
      icon: <HomeIcon />
    },
    {
      label: "menu.contact",
      className: "",
      to: "https://help.tropipay.com/contact",
      icon: <LogoutIcon />
    },*/
    {
      label: "menu.comunity",
      to: "https://t.me/joinchat/SeivjhsA4ekFEZc4aNR26Q",
      icon: <SendIcon />
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
        <div className="box box-vertical">

          <MenuHeader model={profile} onClose={toggleDrawer(false)} />

          <List className="page-padding ">
            {options.length > 1
              ? options.map(item => <MenuItem model={item} />)
              : null}
          </List>

        </div>
      </Drawer>
    </div>
  );
}

export default MenuPage;

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
import MenuLink from "./MenuLink";
import MenuHeader from "./MenuHeader";
import links from "../../models/menu.link";
import "./MenuPage.scss";

function MenuPage() {
  const dispatch = useDispatch();
  const profile = useSelector(srvProfile.selector.data);
  const [openDrawer, setDrawerMenu] = React.useState();
  const [menuLinks, setMenuLinks] = React.useState([]);
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
        srvProfile.destroy();
      }
    }
  ];

  useEffect(() => {
    if (!profile) {
      dispatch(srvProfile.action.load());
    }
    if(!menuLinks || menuLinks.length < 1) {
      setMenuLinks(links.reverse());
    }
  }, [profile, menuLinks, dispatch]);

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
        <div className="box box-vertical box-align-between menu-page-content">
          <div>
            <MenuHeader model={profile} onClose={toggleDrawer(false)} />

            <List className="page-padding ">
              {options.length > 1
                ? options.map((item, i) => <MenuItem model={item} key={i} className="box-padding" />)
                : null}
            </List>
          </div>

          <MenuLink
            data={menuLinks}
            align="vertical"
            className="box-padding label-small menu-page-link"
          />
        </div>
      </Drawer>
    </div>
  );
}

export default MenuPage;

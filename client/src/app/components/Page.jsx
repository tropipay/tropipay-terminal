import React from "react";
import { useSelector } from "react-redux";
//import { Route, Redirect } from "react-router-dom";
import Menu from './Menu';

export default function Page({ children, ...rest }) {
    //const profile = useSelector(selectProfile);
    return (
        <div>
            <Menu />
            { (children) }
        </div>
    );
  }
  
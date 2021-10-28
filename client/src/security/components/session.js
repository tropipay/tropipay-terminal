

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { updateSession, selectSession, loadProfile } from "../services/AuthSlice";
import db from "../services/localdb";

export default function Session(props) {
    const dispatch = useDispatch();
    //const session = useSelector(selectSession);
    const session = db.get('session');
    const from = session && session.from ? session.from.pathname : '/'; 

    console.log("Redirect", from);
  
    useEffect(() => {
      dispatch(updateSession());
      dispatch(loadProfile());
    });
  
    return <Redirect to={from} />;
}
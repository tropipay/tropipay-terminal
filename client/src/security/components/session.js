

import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSession, loadProfile } from "../services/AuthSlice";
import db from "../services/localdb";

export default function Session(props) {
    const dispatch = useDispatch();
    //const session = useSelector(selectSession);
    const session = db.get('session');
    const from = session && session.from ? session.from.pathname : '/'; 
  
    useEffect(() => {
      dispatch(updateSession());
      dispatch(loadProfile());
    });
  
    return <Redirect to={from} />;
}
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSession, loadProfile } from "../services/AuthSlice";
import session from "../services/session";

export default function Session(props) {
    const dispatch = useDispatch();
    const sess = session.get();
    const from = sess && sess.from ? sess.from.pathname : '/'; 
  
    useEffect(() => {
      dispatch(updateSession());
      dispatch(loadProfile());
    });
  
    return <Redirect to={from} />;
}
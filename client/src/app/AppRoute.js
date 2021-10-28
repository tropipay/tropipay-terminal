
import React, { useEffect } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateSession, updateProfile } from "../security/services/AuthSlice";

import "./App.scss";
import './services/lang';

import Demo from "../demo/Demo.jsx";
import { ProvideAuth, RoutePrivate } from '../security/services/auth';
import Login from '../security/components/login';
import Session from '../security/components/session';
import Menu from '../menu/menu';

export default function AppRoute() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(updateSession());
    dispatch(updateProfile());
  });

  return (
    <ProvideAuth>
        <Menu />
        <Switch>
            <Route exact path='/' render={(props) => (<Demo />)}/>
            <Route exact path="/public">
                <h3>Public</h3>
            </Route>
            <RoutePrivate exact path="/private">
                <h3>Private</h3>
            </RoutePrivate>

            <Route exact path="/login"> <Login /> </Route>
            <Route exact path="/auth/session"> <Session /> </Route>

            <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
        </Switch>
    </ProvideAuth>
  );
}
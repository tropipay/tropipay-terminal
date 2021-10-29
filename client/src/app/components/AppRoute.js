
import React, { useEffect } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateSession, updateProfile } from "../../security/services/AuthSlice";

import ProvideAuth from '../../security/components/provide.auth';
import RoutePrivate from '../../security/components/route.private';
import Login from '../../security/components/login';
import Session from '../../security/components/session';

import Menu from '../../menu/menu';
import Demo from "../../demo/Demo.jsx";

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

import React, { useEffect } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { useDispatch } from "react-redux";
import srvAuth from "../../security/services/AuthSlice";
import srvProfile from "../../security/services/ProfileSlice";

import ProvideAuth from '../../security/components/provide.auth';
import RoutePrivate from '../../security/components/route.private';
import Login from '../../security/components/login';
import Session from '../../security/components/session';

import MovementPage from '../../movement/components/MovementPage';
import PaymentPage from '../../payment/components/PaymentPage';
import ProfilePage from '../../profile/components/ProfilePage';
import FrontPage from "./FrontPage.jsx";
import HomePage from "./HomePage.jsx";
import Page from "./Page.jsx";

export default function AppRoute() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(srvAuth.action.update());
    dispatch(srvProfile.action.update());
  });

  return (
    <ProvideAuth>
        <Switch>
            <Route exact path="/public"> <h3>Public</h3> </Route>
            <RoutePrivate exact path="/private"> <h3>Private</h3> </RoutePrivate>

            <Route exact path="/login"> <Login /> </Route>
            <Route exact path="/auth/session"> <Session /> </Route>
            
            <RoutePrivate exact path="/home"> <Page>  <HomePage /> </Page> </RoutePrivate>
            <Route exact path="/movement"> <Page> <MovementPage />  </Page> </Route>
            <Route exact path="/payment"> <Page> <PaymentPage /> </Page> </Route>
            <Route exact path="/profile"> <ProfilePage /> </Route>

            <Route exact path='/' render={() => (<FrontPage />)}/>
            <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
        </Switch>
    </ProvideAuth>
  );
}
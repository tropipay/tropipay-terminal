
import React, { useEffect } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateSession, updateProfile } from "../../security/services/AuthSlice";

import ProvideAuth from '../../security/components/provide.auth';
import RoutePrivate from '../../security/components/route.private';
import Login from '../../security/components/login';
import Session from '../../security/components/session';

import MovementPage from '../../movement/components/MovementPage';
import PaymentPage from '../../payment/components/PaymentPage';
import ProfilePage from '../../profile/components/ProfilePage';

//import Menu from '../../menu/menu';
import Home from "./Home.jsx";

export default function AppRoute() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(updateSession());
    dispatch(updateProfile());
  });

  return (
    <ProvideAuth>
        <Switch>
            <Route exact path='/' render={(props) => (<Home />)}/>
            <Route exact path="/public">
                <h3>Public</h3>
            </Route>
            <RoutePrivate exact path="/private">
                <h3>Private</h3>
            </RoutePrivate>

            <Route exact path="/login"> <Login /> </Route>
            <Route exact path="/auth/session"> <Session /> </Route>
            
            <Route exact path="/movement"> <MovementPage /> </Route>
            <Route exact path="/payment"> <PaymentPage /> </Route>
            <Route exact path="/profile"> <ProfilePage /> </Route>

            <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
        </Switch>
    </ProvideAuth>
  );
}
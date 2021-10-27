import React, { useContext, createContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { updateSession, selectSession } from './AuthSlice';
import { useSelector, useDispatch } from 'react-redux';

import db from './localdb';

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// handler login/logout from useAuth
export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (history, from) => {
    db.set('session', JSON.stringify({ from }));
    return new Promise((resolve, reject) => {
      resolve(url_login);
    });
  };

  const signout = from => {
    return new Promise((resolve, reject) => {
      db.del('session');
      setUser(null);
      resolve(null);
    });
  };

  return {
    user,
    signin,
    signout
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function RoutePrivate({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export function sessionUpdate (props){
  const dispatch = useDispatch();
  dispatch(updateSession());
  const session = useSelector(selectSession);
  return <Redirect to={session.from} />;
}
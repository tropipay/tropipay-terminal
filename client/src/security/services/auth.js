import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSession, selectSession, selectProfile, loadProfile } from "./AuthSlice";

import db from "./localdb";

const url_terminal = "http://localhost:3002";
const url_login = url_terminal + "/api/v1/security/user/connected_view";

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Constext Selector
export function useAuth() {
  return useContext(AuthContext);
}

// Constext Handler used for useAuth
export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (history, from) => {
    //db.set({ from }, "session");
    return new Promise((resolve, reject) => {
      resolve(url_login);
    });
  };

  const signout = (from) => {
    return new Promise((resolve, reject) => {
      db.del("session");
      setUser(null);
      resolve(null);
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function RoutePrivate({ children, ...rest }) {
  //let auth = useAuth();
  const profile = useSelector(selectProfile);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        profile ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function SessionUpdate(props) {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  useEffect(() => {
    dispatch(updateSession());
    dispatch(loadProfile());
  });

  return <Redirect to={session.from} />;
}


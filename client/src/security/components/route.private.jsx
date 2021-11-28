import React from "react";
import { Route, Redirect } from "react-router-dom";
import session from "../services/session";

export default function RoutePrivate({ children, ...rest }) {
  const loginPath = "/";
  return (
    <Route
      {...rest}
      render={({ location }) =>
        session.isValid() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: loginPath,
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}

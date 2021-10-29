import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectProfile } from "../services/AuthSlice";

export default function RoutePrivate({ children, ...rest }) {
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
  
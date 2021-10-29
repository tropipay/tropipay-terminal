import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
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
  
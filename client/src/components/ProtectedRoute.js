import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import auth from "./auth";


export const ProtectedRoute = () => {
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" /> ;
}

// default ProtectedRoute;

/*
export const protectedRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
          if(auth.isAuthenticated()){
              return <Component {...props} />;

          }else{
              return <Navigate to={`/`}
              replace
              state={ props.location }
               />
          }
      }}
    />
  );
};
*/
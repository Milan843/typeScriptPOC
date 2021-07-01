import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "./redux/reducers";
import { checkAuth } from "./services";

export type ProtectedRouteProps = {
  component: React.ComponentType<any>;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector(({ auth }: IRootState) => auth.isAuth);

  return isAuthenticated || checkAuth() ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;

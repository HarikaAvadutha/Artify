import React from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component, path }) => {
// debugger
  const isLoggedIn = useSelector(state => state.auth.token);
  return isLoggedIn ? <Route component={component} path={path} /> : <Redirect to="/" />;
};

ProtectedRoute.propTypes = {
  component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;

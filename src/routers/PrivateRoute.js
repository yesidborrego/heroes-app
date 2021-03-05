import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
  const lastPatch = (rest.location.search.length === 0) ? rest.location.pathname : `${rest.location.pathname}${rest.location.search}`;
  localStorage.setItem('lastPatch', lastPatch);
  return (
    <Route {...rest} component={
      (props) => (
        (isLogged)
          ? ( <Component {...props} /> )
          : ( <Redirect to="/login" /> )
      )
    } />
  )
}

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}
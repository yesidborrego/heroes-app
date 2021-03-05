import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const {user} = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Switch>
          {/*<Route exact path="/login" component={LoginScreen} />*/}
          <PublicRoute
            exact
            path="/login"
            isLogged={user.logged}
            component={LoginScreen}
          />
          {/*<Route path="/" component={DashboardRoutes} />*/}
          <PrivateRoute
            path="/"
            isLogged={user.logged}
            component={DashboardRoutes} />
        </Switch>
      </div>
    </Router>
  )
}

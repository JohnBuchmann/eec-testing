/**
 *
 * AppWithRouterAccess.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import OktaLogin from 'containers/Launch/Login';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SitesDashboard from 'containers/SitesPage/Loadable';
import ReportingPage from 'containers/ReportingPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import SitesDetailsPage from 'containers/SitesPage/SiteDetails/Loadable';
import DeviceDetailsPage from 'containers/SitesPage/DeviceDetails/Loadable';
import TermsAndConditionsPage from 'containers/Launch/Login/Legal/TermsAndConditions/Loadable';
import { oktaAuthClient, oktaSignInConfig } from 'system/auth';
import { initializeHttpInterceptors } from 'system/httpHelper';

/**
 * AppWithRouterAccess Method is executed to load all the components in place
 * and run the application.
 * It also includes the routes declaration.
 */
const AppWithRouterAccess = () => {
  const oktaAuth = oktaAuthClient;
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  initializeHttpInterceptors();

  /**
   * Displays terms and conditions page
   */
  const termsAndConditionsPage = () => (
    // TODO: change this 'false' value with the value in reducer
    <TermsAndConditionsPage openModal={false} />
  );

  return (
    <Switch>
      <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
        <SecureRoute exact path="/" component={SitesDashboard} />
        <SecureRoute exact path="/reporting" component={ReportingPage} />
        <SecureRoute exact path="/settings" component={SettingsPage} />
        <SecureRoute
          exact
          history={history}
          path="/sites/:siteId/details/:tabName?"
          component={SitesDetailsPage}
        />
        <SecureRoute
          exact
          path="/sites/:siteId/group/:deviceGroupId/device/:deviceId/details"
          component={DeviceDetailsPage}
        />
        <SecureRoute
          exact
          path="/legal/terms-and-conditions"
          component={termsAndConditionsPage}
        />
        <SecureRoute exact path="/404/" component={NotFoundPage} />
        <Route
          path="/login"
          render={() => <OktaLogin config={oktaSignInConfig} />}
        />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </Switch>
  );
};

export default AppWithRouterAccess;

/*
 * Login Component
 *
 * This contains Login
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { postUserSessionLoginEvent } from 'Store/User/actions';
import { connect } from 'react-redux';
import OktaSignInWidget from './OktaSignInWidget';

/* eslint-disable no-console */
/**
 * Login
 * @param {*} config Okta Widget configuration
 */
const OktaLogin = (props) => {
  const { authState, oktaAuth } = useOktaAuth();
  const { userSessionEventDispatch, config } = props;

  let loginComponent = null;

  /**
   * @method handleOktaSuccess
   * Handles success from okta sign in widget callback.
   * and Redirect the user to the dashboard.
   * @param tokens The tokens received from okta to authorize the user.
   */
  const handleOktaSuccess = (tokens) => {
    if (oktaAuth) {
      userSessionEventDispatch();
      oktaAuth.handleLoginRedirect(tokens);
    }
  };

  /**
   * @method handleOktaError
   * Handles error from okta sign in widget callback.
   * TODO: Add the error handler.
   * @param err The error status object with all the
   * information to understand what happened.
   * @return {void}
   */
  const handleOktaError = (err) => {
    console.log('error logging in', err);
  };

  if (!authState.isPending) {
    loginComponent = authState.isAuthenticated ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <OktaSignInWidget
        data-testid="oktaSignInWidget"
        config={config}
        onSuccess={handleOktaSuccess}
        onError={handleOktaError}
      />
    );
  }

  return loginComponent;
};

OktaLogin.propTypes = {
  config: PropTypes.object,
  userSessionEventDispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  userSessionEventDispatch: () => dispatch(postUserSessionLoginEvent()),
});

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  null,
  mapDispatchToProps
)(OktaLogin);
/* eslint-enable */

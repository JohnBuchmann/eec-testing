/*
 * HomePage
 * This is the homepage container reserved to validate the user authentication and redirect
 * to dashboard or display the login
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

/**
 * HomePage creates the container to
 * display the login form
 */
export default function HomePage() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  );
}

/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

export function LanguageProvider(props) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => {
  const { locale } = state.language;
  return { locale };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageProvider);
/* eslint-enable */

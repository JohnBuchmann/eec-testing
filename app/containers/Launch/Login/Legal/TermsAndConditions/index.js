/*
 * Terms and conditions login page
 *
 * This contains terms and condition
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { FeatTheme } from 'Theme';
import ConsentManagementModal from './ConsentManagementModal';

/**
 * Displays terms and conditions page
 */
const TermsAndConditionsPage = ({
  injectFirst = true,
  theme = FeatTheme,
  openModal = false,
  pdfFile = null,
  effectiveDate = '',
}) => (
  <StylesProvider injectFirst={injectFirst}>
    <MuiThemeProvider theme={theme}>
      <ConsentManagementModal
        openModal={openModal}
        pdf={pdfFile}
        effectiveDate={effectiveDate}
      />
    </MuiThemeProvider>
  </StylesProvider>
);

TermsAndConditionsPage.propTypes = {
  injectFirst: PropTypes.bool,
  theme: PropTypes.object,
  openModal: PropTypes.bool,
  pdfFile: PropTypes.string,
  effectiveDate: PropTypes.string,
};

export default TermsAndConditionsPage;

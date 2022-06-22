/*
 * Support
 *
 * This contains Support
 */
import { Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import Panel from 'Components/Panel';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { propertyExist } from 'Utils/propertyValidation';
import { formatPhoneNumber } from 'Utils/propertyHelpers';
import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
    width: '574px',
  },
  labelSubTitle: {
    fontWeight: 'bold',
    color: Colors.mountainMeadow,
    width: '73px',
    textTransform: 'uppercase',
  },
  placeholder: {
    color: Colors.dustGray,
    opacity: '0.6',
    display: 'block',
    margin: '10px 0',
  },
  notAvailableDataRow: {
    color: Colors.dustGray,
    opacity: '0.6',
    display: 'block',
    margin: '0',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  rowName: {
    color: Colors.mountainMeadow,
    width: '73px',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    fontWeight: 'bolder',
    lineHeight: '1.75 !important',
    letterSpacing: 'normal !important',
  },
  section: {
    margin: '20px 0',
  },
  firstSection: {
    marginBottom: '20px',
  },
});

/**
 * Support creates the container to display all information,
 * @param {any} props Contains i18n (internationalization) properties
 */
function Support(props) {
  const { siteState } = props;
  const { formatMessage } = props.intl;
  const classes = useStyles();
  const supportTitle = formatMessage(messages.supportTitle);

  const {
    icianName,
    externalIcianId,
    secondaryIcianName,
    secondaryIcianId,
    icianPhoneNumber,
    secondaryIcianPhoneNumber,
  } = siteState || {};
  const notAvailableData = (
    <span className={classes.placeholder}>
      {formatMessage(messages.siteInformationNotAvailable)}
    </span>
  );
  const notAvailableDataRow = (
    <span className={classes.notAvailableDataRow}>
      {formatMessage(messages.siteInformationNotAvailable)}
    </span>
  );
  const mailToUrl = 'https://outlook.office.com/?path=/mail/action/compose&to=';
  const salesContactInformation = {
    phone: '920-225-6737',
    url: 'Energybyentech.com',
    email: 'entechsolutions@faithtechinc.com',
  };
  const emergencyPhone = '800-992-7749';
  const formattedIcianName = propertyExist(() => icianName)
    ? icianName
    : notAvailableData;
  const formattedSecondaryIcianName = propertyExist(() => secondaryIcianName)
    ? secondaryIcianName
    : notAvailableData;
  /**
   * @property {String} contactMobilePhone Stores contact mobile phone data or not available data placeholder.
   */
  const contactMobilePhone = (phoneNumber) =>
    formatPhoneNumber(phoneNumber, notAvailableDataRow);

  /**
   * Returns mail to format
   * @param {string} createMailtoLink
   */
  const createMailtoLink = (email) => `${mailToUrl}${email}`;

  /**
   * @property {String} contactEmail Stores contact email data or not available data placeholder.
   */
  const contactEmail = (email) =>
    propertyExist(() => email) ? (
      <a
        data-testid="link-mailto"
        href={createMailtoLink(email)}
        target="_blank"
      >
        {email}
      </a>
    ) : (
      notAvailableDataRow
    );

  /**
   * @property {String} contactUrl Stores url data or not available data placeholder.
   */
  const contactUrl = (url) =>
    propertyExist(() => url) ? (
      <a data-testid="link-url" href={`${'http://www.'}${url}`} target="_blank">
        {url}
      </a>
    ) : (
      notAvailableDataRow
    );

  /**
   * @property {String} dataRow Stores row data for eahc conatact information.
   */
  const dataRow = (rowName, rowData) => (
    <div className={classes.row}>
      <Typography
        variant="body1"
        data-testid="contact-name"
        className={classes.rowName}
      >
        {rowName}
      </Typography>

      <Typography variant="body1" data-testid="contact-name">
        {rowData}
      </Typography>
    </div>
  );

  const contentBody = (
    <>
      <div className={classes.firstSection}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.primaryIcian)}
        </Typography>
        <Typography variant="body1" data-testid="primary-ician-name">
          {formattedIcianName}
        </Typography>
      </div>
      {dataRow(formatMessage(messages.email), contactEmail(externalIcianId))}
      {dataRow(
        formatMessage(messages.mobile),
        contactMobilePhone(icianPhoneNumber)
      )}

      <div className={classes.section}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.secondaryIcian)}
        </Typography>
        <Typography variant="body1" data-testid="secondary-ician-name">
          {formattedSecondaryIcianName}
        </Typography>
      </div>
      {dataRow(formatMessage(messages.email), contactEmail(secondaryIcianId))}
      {dataRow(
        formatMessage(messages.mobile),
        contactMobilePhone(secondaryIcianPhoneNumber)
      )}

      <div className={classes.section}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.salesAndGeneralQuestions)}
        </Typography>
      </div>
      {dataRow(
        formatMessage(messages.email),
        contactEmail(salesContactInformation.email)
      )}
      {dataRow(
        formatMessage(messages.phone),
        contactMobilePhone(salesContactInformation.phone)
      )}
      {dataRow(
        formatMessage(messages.website),
        contactUrl(salesContactInformation.url)
      )}

      <div className={classes.section}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.emergencyService)}
        </Typography>
      </div>
      {dataRow(
        formatMessage(messages.phone),
        contactMobilePhone(emergencyPhone)
      )}
    </>
  );
  return (
    <div className={classes.wrapper}>
      <Panel title={supportTitle} content={contentBody} />
    </div>
  );
}

Support.propTypes = {
  intl: PropTypes.any.isRequired,
  siteState: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { site: siteState } = state.sites;
  return { siteState };
};

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
  export default injectIntl(connect(mapStateToProps)(Support));
  /* eslint-enable */

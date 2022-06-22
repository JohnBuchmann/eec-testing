/**
 *
 * HeaderSiteDetails.js
 * Header content for site details
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import images from 'Assets/images';
import Breadcrumbs from '../Breadcrumbs';
import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    minHeight: '93px',
    padding: '17px 24px 17px 24px',
  },
  upperWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  lowerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    alignItems: 'center',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px !important',
    fontFamily: 'Inter, sans-serif !important',
    fontWeight: '600 !important',
    letterSpacing: '0.01em !important',
  },
  subtitle: {
    fontSize: '14px !important',
    fontStretch: 'normal',
    fontWeight: '500 !important',
    fontStyle: 'normal',
    lineHeight: 'normal !important',
    letterSpacing: '-0.08px !important',
    color: Colors.mountainMeadow,
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emulatedSite: {
    borderBottom: `3px solid ${Colors.pacificBlue}`,
  },
  emulatedSubTitle: {
    color: Colors.pacificBlue,
  },
  emulatedContainer: {
    marginTop: '8px',
  },
  emulatedIcon: {
    marginRight: '5px',
  },
});

/**
 * HeaderSiteDetails
 * @param {string} title Title to show
 * @param {string} subtitle Subtitle to show
 * @param {object} breadcrumbs Breadcrumbs to show
 */
const HeaderSiteDetails = (props) => {
  const {
    title = '',
    siteheaders = [],
    breadcrumbs = [],
    isSiteLive = false,
    isRendered = false,
  } = props;
  const { formatMessage } = props.intl;
  const classes = useStyles();

  let siteEmulated = !isSiteLive && isRendered ? classes.emulatedSite : '';
  let headerTitle = isRendered ? title : '';

  useEffect(() => {
    // cleaning data after component is destroyed.
    const cleanData = () => {
      siteEmulated = '';
      headerTitle = '';
    };
    return () => {
      cleanData();
    };
  }, []);

  return (
    <div
      className={`${classes.wrapper} ${siteEmulated}`}
      data-testid="header-site"
    >
      <Box className={classes.upperWrapper}>
        <Box className={classes.titleWrapper}>
          <Box className={classes.statusWrapper} data-testid="header-title">
            <Typography className={`${classes.leftSeparator} ${classes.title}`}>
              {headerTitle}
            </Typography>
          </Box>
          {/* eslint-disable */}
          <Typography className={`${classes.leftSeparator} ${classes.subtitle}`}>
            {siteheaders}
          </Typography>
          {/* eslint-enable */}
        </Box>
      </Box>
      <div className={classes.lowerWrapper}>
        {isRendered && (
          <div className={classes.emulatedContainer}>
            {!isSiteLive && (
              <Typography
                data-testid="emulated-subtitle"
                className={`${classes.leftSeparator} ${classes.subtitle} ${
                  classes.emulatedSubTitle
                }`}
              >
                <img
                  className={classes.emulatedIcon}
                  src={images.iconEmulator}
                  alt={formatMessage(messages.emulatedSubtitle)}
                />
                {formatMessage(messages.emulatedSubtitle)}
              </Typography>
            )}
          </div>
        )}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </div>
  );
};

HeaderSiteDetails.propTypes = {
  intl: PropTypes.any.isRequired,
  title: PropTypes.string,
  siteheaders: PropTypes.array,
  breadcrumbs: PropTypes.array,
  isSiteLive: PropTypes.bool,
  isRendered: PropTypes.bool,
};
export default injectIntl(HeaderSiteDetails);

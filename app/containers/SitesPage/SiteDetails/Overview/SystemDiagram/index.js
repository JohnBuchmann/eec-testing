import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Colors } from 'Theme';
import images from 'Assets/images';
import Panel from 'Components/Panel';
import { getSiteOverview } from 'Store/Sites/actions';
import { SiteTypesId } from 'Utils/enums/siteTypes';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';
import { getValueIfExists } from 'Utils/propertyValidation';
import { displaySystemDiagram } from 'Utils/systemDiagram';
import messages from './messages';
import SystemDiagram from './SystemDiagram';

/**
 * useStyles
 * Method to get bus band styles
 */
const useStyles = makeStyles({
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '65px',
    padding: '12px 16px',
    backgroundColor: Colors.nandor,
  },
  headerTitle: {
    fontWeight: 600,
    textTransform: 'uppercase',
    color: Colors.surfCrest,
  },
  headerLastReceived: {
    color: Colors.white,
  },
  headerLastReceivedValue: {
    paddingLeft: '5px',
  },
  contentStyle: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Colors.nandor,
  },
  logo: {
    position: 'absolute',
    left: '0px',
    marginTop: '24px',
    marginLeft: '40px',
  },
});

const SystemOverview = (props) => {
  const classStyle = useStyles();
  const { systemOverview: systemOverviewMessages } = messages;
  const { siteId } = useParams();
  const { dCentrIQPowerCentral, xCapePowerCentral } = images;
  const { overview, getSiteOverviewData } = props;

  const siteTypeId = getValueIfExists(() => overview.siteType.siteTypeId);

  const lastDataReceivedDate = getValueIfExists(
    () => overview.lastDataReceived,
    ''
  );

  useEffect(() => {
    getSiteOverviewData(siteId);
    const isRefreshing = true;
    // Disabling set Intervals as Codacy does not know how to handle them.
    /* eslint-disable */
    const interval = setInterval(() => {
      getSiteOverviewData(siteId, isRefreshing);
    }, SET_INTERVAL_PULLING_DATA);
    return () => clearInterval(interval);
    /* eslint-enable */
  }, []);

  /**
   * getSiteLogo
   * Retrieve logo information
   * @returns {Object} An object with logo information
   */
  const getSiteLogo = () => {
    let logo;
    let description;

    switch (siteTypeId) {
      case SiteTypesId.Ignition:
        logo = dCentrIQPowerCentral;
        description = 'DCentrIQ Power Central Logo';
        break;
      case SiteTypesId.Xcape:
        logo = xCapePowerCentral;
        description = 'Xcape Logo';
        break;
      default:
        logo = '';
        description = '';
        break;
    }

    return { logo, description };
  };

  const panelHeaderContent = (
    <Box
      className={classStyle.headerWrapper}
      data-testid="content-headerContent"
    >
      <Box>
        <FormattedMessage {...systemOverviewMessages.title}>
          {(title) => (
            <Typography variant="caption" className={classStyle.headerTitle}>
              {title}
            </Typography>
          )}
        </FormattedMessage>
      </Box>
      {displaySystemDiagram(overview) && (
        <Box>
          <FormattedMessage {...systemOverviewMessages.lastDataReceived}>
            {(lastDataReceived) => (
              <Typography
                variant="caption"
                className={classStyle.headerLastReceived}
              >
                {lastDataReceived}
                <span className={classStyle.headerLastReceivedValue}>
                  {lastDataReceivedDate}
                </span>
              </Typography>
            )}
          </FormattedMessage>
        </Box>
      )}
    </Box>
  );

  const panleBodyContent = (
    <>
      <Box className={classStyle.logo}>
        <img
          alt={getSiteLogo().description}
          src={getSiteLogo().logo}
          data-testid="content-systemDiagramLogo"
        />
      </Box>
      <SystemDiagram siteOverview={overview} />
    </>
  );

  return (
    <Panel
      headerContent={panelHeaderContent}
      headerStyle={classStyle.panelHeader}
      content={panleBodyContent}
      contentStyle={classStyle.contentStyle}
    />
  );
};

SystemOverview.propTypes = {
  overview: PropTypes.object,
  getSiteOverviewData: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { overview } = state.sites.site;
  return { overview };
};

const mapDispatchToProps = (dispatch) => ({
  getSiteOverviewData: (siteId, isRefreshing) =>
    dispatch(getSiteOverview(siteId, isRefreshing)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemOverview);
/* eslint-enable */

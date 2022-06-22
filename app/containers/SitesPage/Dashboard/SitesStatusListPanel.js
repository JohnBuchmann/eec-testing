/**
 * Sites Status Overview panel
 * This is the component to display the site status overview information.
 */
import { IconButton, makeStyles, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import images from 'Assets/images';
import LocationPin from 'Components/LocationPin';
import Panel from 'Components/Panel';
import SelectCustomOptions from 'Components/Select/SelectMultiple';
import Switch from 'Components/Switch';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Colors } from 'Theme';
import {
  allOptions,
  getFilterAvailableOptions,
  allCustomerOptions,
  allAreaOptions,
  allLocationOptions,
} from 'Utils/enums/site';
import { getValueIfExists } from 'Utils/propertyValidation';
import SiteCard from '../SiteCard';
import messages from './messages';

const { googleMapsKey } = window.env;

const useStyles = makeStyles({
  mapContainer: { height: '100vh', width: '100%', position: 'relative' },
  buttonCenterModal: {
    backgroundColor: Colors.white,
    borderRadius: 0,
    position: 'absolute',
    zIndex: 99999,
    right: '10px',
    bottom: '120px',
    width: '40px',
  },
  showEmulatedLabel: {
    float: 'left',
    margin: '0 8px',
    lineHeight: '2.5',
  },
  showEmulatedSwitch: {
    float: 'left',
    margin: '0 16px',
  },
  contentActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  switchButtons: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginLeft: '5px',
      marginRight: '5px',
    },
  },
  selectOptions: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: '10px',
      marginLeft: '10px',
    },
    '& > div': {
      marginBottom: '16px',
    },
  },
  clearFilter: {
    marginRight: '8rem',
  },
});

/**
 * Sites Status Overview panel
 * Creates the overview panel to display the site status overview information.
 */
const SitesStatusListPanel = (props) => {
  const {
    sites,
    dropdownChange,
    title,
    showEmulatedSitesChange,
    switchViewChange,
    isReadyToLoad = true,
    switchView = false,
    showEmulatedSites = false,
    customerOptions,
    areasOptions,
    sitesOptions,
    isAreaDropwonDisabled,
    resetFilters,
    filters,
  } = props;

  const [displayCard, setDisplayCard] = React.useState(null);

  const defaultProps = {
    center: {
      lat: 38.49,
      lng: -103.46,
    },
    zoom: 5,
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const [
    defaultStatusMultipleValue,
    setDefaultStatusMultipleValue,
  ] = React.useState([allOptions]);

  const [
    defaultCustomerMultipleValue,
    setDefaultCustomerMultipleValue,
  ] = React.useState([allCustomerOptions]);

  const [defaultArealtipleValue, setDefaultArealtipleValue] = React.useState([
    allAreaOptions,
  ]);

  const [
    defaultLocationMultipleValue,
    setDefaultLocationMultipleValue,
  ] = React.useState([allLocationOptions]);

  React.useEffect(() => {
    if (filters.status.length === 0) {
      setDefaultStatusMultipleValue([]);
    }

    if (filters.customer.length === 0) {
      setDefaultCustomerMultipleValue([]);
    }

    if (filters.area.length === 0) {
      setDefaultArealtipleValue([]);
    }

    if (filters.location.length === 0) {
      setDefaultLocationMultipleValue([]);
    }
  }, [filters]);

  const defaultMapCenter = defaultProps.center;
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const classes = useStyles();

  /**
   * Restore Map to center.
   */
  const recenterMap = () => {
    const restoreMapCenter = [0, 0];
    setMapCenter(restoreMapCenter);
    // Disabling eslint on this block to allow setTimeout.
    /* eslint-disable */
    setTimeout(() => {
      setMapCenter(defaultMapCenter);
    }, 10);
    /* eslint-enable */
  };

  const contentBody = (
    <>
      {sites.map((site) => (
        <SiteCard
          data-testid="content-siteCard"
          site={site}
          key={`site-card-${site.siteId}`}
        />
      ))}
    </>
  );

  const contentMap = (
    <>
      <div className={classes.mapContainer}>
        <IconButton
          data-testid="button-center-map"
          size="small"
          onClick={recenterMap}
          className={classes.buttonCenterModal}
        >
          <img
            src={images.mapLocate}
            alt=""
            className={classes.mapButtonIcon}
          />
        </IconButton>
        <GoogleMapReact
          data-testid="content-SitesMap"
          bootstrapURLKeys={{
            key: googleMapsKey,
          }}
          defaultZoom={defaultProps.zoom}
          center={mapCenter}
          options={{
            fullscreenControl: false,
            zoomControl: true,
            scrollwheel: false,
            disableDoubleClickZoom: true,
          }}
          onChildClick={(event) => {
            setDisplayCard(event);
          }}
        >
          {sites.map((site) => {
            const address = getValueIfExists(() => site.address, {});
            const latitude = Number.isNaN(Number.parseFloat(address.latitude))
              ? 0
              : Number.parseFloat(address.latitude);

            const longitude = Number.isNaN(Number.parseFloat(address.longitude))
              ? 0
              : Number.parseFloat(address.longitude);

            return (
              latitude &&
              longitude && (
                <LocationPin
                  data-testid="content-locationPin"
                  key={`site-pin-${site.siteId}`}
                  lat={latitude}
                  lng={longitude}
                  site={site}
                  displayCard={displayCard}
                />
              )
            );
          })}
        </GoogleMapReact>
      </div>
    </>
  );

  const filterOptions = getFilterAvailableOptions();

  const showEmulatedLabelOn = (
    <Typography>
      <FormattedMessage {...messages.showEmulatedOn} />
    </Typography>
  );

  const showEmulatedLabelOff = (
    <Typography>
      <FormattedMessage {...messages.showEmulatedOff} />
    </Typography>
  );

  const contentActions = (
    <>
      <div className={classes.contentActions}>
        <div className={classes.selectOptions}>
          <SelectCustomOptions
            data-testid="content-selectStatusList"
            placeholder="All"
            selectedObject={defaultStatusMultipleValue}
            selectData={filterOptions}
            onChange={dropdownChange}
            title="Status"
            className={classes.margins}
          />

          <SelectCustomOptions
            placeholder="All"
            selectedObject={defaultCustomerMultipleValue}
            selectData={customerOptions}
            onChange={dropdownChange}
            title="Customer"
            className={classes.margins}
          />

          <SelectCustomOptions
            placeholder="All"
            selectedObject={defaultArealtipleValue}
            selectData={areasOptions}
            onChange={dropdownChange}
            title="Area"
            className={classes.margins}
            disabled={isAreaDropwonDisabled}
          />
          <SelectCustomOptions
            placeholder="All"
            selectedObject={defaultLocationMultipleValue}
            selectData={sitesOptions}
            onChange={dropdownChange}
            title="Site"
            className={classes.margins}
            disabled={isAreaDropwonDisabled}
          />
          <Button
            className={classes.marginButton}
            variant="outlined"
            color="primary"
            onClick={handleResetFilters}
          >
            Clear Filters
          </Button>
        </div>

        <div className={classes.switchButtons}>
          <Switch
            leftOption={{
              value: false,
              label: showEmulatedLabelOff,
              icon: images.noEmulatedSites,
            }}
            rightOption={{
              value: true,
              label: showEmulatedLabelOn,
              icon: images.emulatedSites,
            }}
            value={showEmulatedSites}
            onChange={showEmulatedSitesChange}
          />
          <Switch
            leftOption={{
              value: false,
              label: 'List',
              icon: images.viewList,
            }}
            rightOption={{
              value: true,
              label: 'Map',
              icon: images.viewMap,
            }}
            value={switchView}
            onChange={switchViewChange}
          />
        </div>
      </div>
    </>
  );

  /**
   * contentPanelBody
   * Returns content with sites or map or returns place holder no records if there are no sites to display.
   */
  const contentPanelBody = () => {
    const displayPlaceHolder =
      !getValueIfExists(() => sites.length, 0) || !isReadyToLoad;
    if (!displayPlaceHolder) {
      return switchView ? contentMap : contentBody;
    }
    return (
      <Typography>
        <FormattedMessage {...messages.noRecords} />
      </Typography>
    );
  };

  return (
    <Panel
      title={title}
      data-testid="content-siteStatusPanel"
      actions={contentActions}
      content={contentPanelBody()}
    />
  );
};

SitesStatusListPanel.propTypes = {
  sites: PropTypes.array,
  customerOptions: PropTypes.array,
  areasOptions: PropTypes.array,
  sitesOptions: PropTypes.array,
  isAreaDropwonDisabled: PropTypes.bool,
  title: PropTypes.string,
  dropdownChange: PropTypes.func,
  switchViewChange: PropTypes.func,
  switchView: PropTypes.bool,
  showEmulatedSitesChange: PropTypes.func,
  showEmulatedSites: PropTypes.bool,
  isReadyToLoad: PropTypes.bool,
  resetFilters: PropTypes.func,
  filters: PropTypes.object,
};

export default SitesStatusListPanel;

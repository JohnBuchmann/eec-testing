/*
 * Site Information
 *
 * This contains Site Information
 */
import {
  Box,
  IconButton,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import images from 'Assets/images';
import ButtonComponent from 'Components/Button';
import LocationPin from 'Components/LocationPin';
import Panel from 'Components/Panel';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Colors } from 'Theme';
import { propertyExist, getValueIfExists } from 'Utils/propertyValidation';
import { formatPhoneNumber, stringToFloat } from 'Utils/propertyHelpers';
import { isCustomerRole } from 'Utils/roles';
import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
    width: '574px',
  },
  documentInformation: {
    backgroundColor: Colors.athensGray,
    fontSize: '14px',
    padding: '12px 0 12px 16px',
    marginTop: '20px',
    marginBottom: '24px',
    border: `1px solid ${Colors.mercury}`,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  documentTitle: {
    lineHeight: '36px',
  },
  documentView: {
    marginRight: '16px',
  },
  subTitle: {
    fontWeight: '700',
    color: Colors.mountainMeadow,
    textTransform: 'uppercase',
  },
  labelSubTitle: {
    fontWeight: '700',
    color: Colors.mountainMeadow,
    width: '73px',
    textTransform: 'uppercase',
  },
  cityStateZipWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  cityWrapper: {
    width: '155px',
  },
  stateWrapper: {
    width: '120px',
  },
  mapWrapper: {
    position: 'relative',
    height: '100px',
    marginTop: '15px',
  },
  siteDetailRowWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  controlWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '8px',
  },
  firstItemTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '19px',
  },
  secondaryItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locateMapButton: {
    height: '38px',
    width: '38px',
    position: 'absolute',
    top: '9px',
    right: '14px',
    zIndex: 999,
    backgroundColor: Colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  expandMapButton: {
    height: '38px',
    width: '38px',
    position: 'absolute',
    top: '54px',
    right: '14px',
    zIndex: 999,
    backgroundColor: Colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapButtonIcon: {
    height: '39px',
    width: '39px',
  },

  contactInformationWrapper: {
    height: '219px',
  },
  modalMapContainer: {
    position: 'relative',
    height: '70vh',
    width: '100%',
  },
  modalButton: {
    height: '38px',
    width: '150px',
  },
  buttonsModal: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
  },
  buttonCenterModal: {
    backgroundColor: Colors.white,
    borderRadius: 0,
    position: 'absolute',
    zIndex: 99999,
    right: '10px',
    bottom: '120px',
    width: '40px',
  },
  placeholder: {
    color: Colors.dustGray,
    opacity: '0.6',
    display: 'block',
    margin: '10px 0',
  },
});

/**
 * Site Information creates the container to display all information,
 * @param {any} props Contains i18n (internationalization) properties
 */
function SiteInformation(props) {
  const { formatMessage } = props.intl;
  const { googleMapsKey } = window.env;
  const classes = useStyles();

  const { siteState, permissions } = props;

  const [showMapModalStatus, setShowMapModalStatus] = React.useState(false);
  const [site, setSite] = React.useState(siteState);
  const deviceStatusTitle = formatMessage(messages.siteInformationTitle);

  const mailToUrl = 'https://outlook.office.com/?path=/mail/action/compose&to=';
  const { location, address, tariffStructure, sharepointUrl } = site || {};

  const { latitude, longitude } = address || {};
  const parsedLatitude = parseFloat(latitude) || 0;
  const parsedLongitude = parseFloat(longitude) || 0;

  const defaultZoom = 11;

  let defaultProps = {
    center: {
      lat: parsedLatitude,
      lng: parsedLongitude,
    },
    zoom: defaultZoom,
  };

  const [mapCenter, setMapCenter] = React.useState(defaultProps.center);

  /**
   * Restore Map to center.
   */
  const recenterMap = () => {
    const restoreMapCenter = [0, 0];
    setMapCenter(restoreMapCenter);
    /* eslint-disable */
    setTimeout(() => {
      setMapCenter(defaultProps.center);
    }, 10);
    /* eslint-enable */
  };

  useEffect(() => {
    setSite(siteState);
    const { latitude: latitudeValue, longitude: longitudeValue } =
      siteState.address || {};
    const setParsedLatitude = stringToFloat(latitudeValue);
    const setParsedLongitude = stringToFloat(longitudeValue);

    // Sets the default props after site's data is loaded to render the map.
    defaultProps = {
      center: {
        lat: setParsedLatitude,
        lng: setParsedLongitude,
      },
      zoom: defaultZoom,
    };
    recenterMap();
  }, [siteState]);

  /**
   * showMapModal
   * Show the Modal for the map
   */
  const showMapModal = () => {
    setShowMapModalStatus(true);
  };

  // Creates mapControl
  const mapControl = (
    <div className={classes.mapWrapper}>
      <>
        <div className={classes.locateMapButton}>
          <IconButton
            data-testid="button-center-map"
            size="small"
            onClick={recenterMap}
          >
            <img
              src={images.mapLocate}
              alt=""
              className={classes.mapButtonIcon}
            />
          </IconButton>
        </div>
        <div className={classes.expandMapButton}>
          <IconButton
            data-testid="button-show-map"
            size="small"
            onClick={showMapModal}
          >
            <img
              src={images.mapExpand}
              alt=""
              className={classes.mapButtonIcon}
            />
          </IconButton>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleMapsKey,
          }}
          defaultZoom={15}
          defaultCenter={[parsedLatitude, parsedLongitude]}
          center={mapCenter}
          options={{
            fullscreenControl: false,
            zoomControl: false,
          }}
        >
          <LocationPin site={site} lat={parsedLatitude} lng={parsedLongitude} />
        </GoogleMapReact>
      </>
    </div>
  );

  /**
   * hideMapModal
   * Hide the Modal for the map
   */
  const hideMapModal = () => {
    setShowMapModalStatus(false);
  };

  const renderMapModal = () => (
    <>
      {showMapModalStatus && parsedLatitude && parsedLongitude && (
        <Modal
          open
          title={formatMessage(messages.siteInformationMapModalTitle)}
        >
          <>
            <div className={classes.modalMapContainer}>
              <IconButton
                data-testid="button-center-map-modal"
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
                bootstrapURLKeys={{
                  key: googleMapsKey,
                }}
                defaultZoom={15}
                center={mapCenter}
                options={{
                  fullscreenControl: false,
                  zoomControl: true,
                }}
              >
                <LocationPin
                  site={site}
                  lat={parsedLatitude}
                  lng={parsedLongitude}
                />
              </GoogleMapReact>
            </div>
            <div className={classes.buttonsModal}>
              <ButtonComponent
                handleRoute={hideMapModal}
                data-testid="button-hide-modal"
              >
                {formatMessage(messages.siteInformationMapModalCloseButton)}
              </ButtonComponent>
            </div>
          </>
        </Modal>
      )}
    </>
  );

  // Creates Address Control
  const notAvailableData = (
    <span className={classes.placeholder}>
      {formatMessage(messages.siteInformationNotAvailable)}
    </span>
  );
  const mapNotAvailable = (
    <span className={classes.placeholder}>
      {formatMessage(messages.siteMapNotAvailable)}
    </span>
  );
  const {
    addressLine1 = notAvailableData,
    addressLine2,
    city = notAvailableData,
    state = notAvailableData,
    postalCode = notAvailableData,
  } = address || {};

  /**
   * @property {String} addressLine Stores address data or not available data placeholder.
   */
  const addressLine = propertyExist(() => addressLine2)
    ? `${addressLine1} ${addressLine2}`
    : addressLine1;

  /**
   * @property {String} area Stores area data or not available data placeholder.
   */
  const { area = notAvailableData } = location || {};
  const areaName =
    `${area}` === 'null' || `${area}` === 'Not Defined'
      ? notAvailableData
      : `${area}`;

  const addressControl = (
    <>
      <Typography variant="caption" className={classes.subTitle}>
        {formatMessage(messages.siteInformationArea)}
      </Typography>
      <Typography variant="body1">{areaName}</Typography>
      <Typography variant="caption" className={classes.subTitle}>
        {formatMessage(messages.siteInformationAddress)}
      </Typography>
      <Typography variant="body1">{addressLine}</Typography>
      <div className={classes.cityStateZipWrapper}>
        <div className={classes.cityWrapper}>
          <Typography variant="caption" className={classes.labelSubTitle}>
            {formatMessage(messages.siteInformationCity)}
          </Typography>
          <Typography variant="body1">{city}</Typography>
        </div>
        <div className={classes.stateWrapper}>
          <Typography variant="caption" className={classes.labelSubTitle}>
            {formatMessage(messages.siteInformationState)}
          </Typography>
          <Typography variant="body1">{state}</Typography>
        </div>
        <div>
          <Typography variant="caption" className={classes.labelSubTitle}>
            {formatMessage(messages.siteInformationZip)}
          </Typography>
          <Typography variant="body1">{postalCode}</Typography>
        </div>
      </div>
    </>
  );

  // Creates Contact information Control
  /**
   * Returns mail to format
   * @param {string} email
   */
  const createMailtoLink = (email) => `${mailToUrl}${email}`;

  const { customer } = location || {};
  const { primaryContact } = customer || { primaryContact: {} };
  const { firstName, lastName, email, mobilePhone, officePhone } =
    primaryContact || {};

  /**
   * @property {String} contactName Stores contact name data or not available data placeholder.
   */
  const contactName =
    propertyExist(() => firstName) && propertyExist(() => lastName)
      ? `${firstName} ${lastName}`
      : notAvailableData;

  /**
   * @property {String} contactEmail Stores contact email data or not available data placeholder.
   */
  const contactEmail = propertyExist(() => email) ? (
    <a data-testid="link-mailto" href={createMailtoLink(email)} target="_blank">
      {email}
    </a>
  ) : (
    notAvailableData
  );

  /**
   * @property {String} contactMobilePhone Stores contact mobile phone data or not available data placeholder.
   */
  const contactMobilePhone = formatPhoneNumber(mobilePhone, notAvailableData);

  /**
   * @property {String} contactOfficePhone Stores contact office phone data or not available data placeholder.
   */
  const contactOfficePhone = formatPhoneNumber(officePhone, notAvailableData);

  const contactInformationControl = (
    <div className={classes.controlWrapper}>
      <Typography variant="caption" className={classes.subTitle}>
        {formatMessage(messages.siteInformationPrimaryContact)}
      </Typography>
      <Typography variant="body1" data-testid="contact-name">
        {contactName}
      </Typography>
      <div className={classes.firstItemTextWrapper}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.siteInformationeMail)}
        </Typography>
        <Typography variant="body1">{contactEmail}</Typography>
      </div>
      <div className={classes.secondaryItemWrapper}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.siteInformationMobile)}
        </Typography>
        <Typography variant="body1">{contactMobilePhone}</Typography>
      </div>
      <div className={classes.secondaryItemWrapper}>
        <Typography variant="caption" className={classes.labelSubTitle}>
          {formatMessage(messages.siteInformationOffice)}
        </Typography>
        <Typography variant="body1">{contactOfficePhone}</Typography>
      </div>
    </div>
  );

  // Creates Documents Control
  const viewLinkAction = {
    onClick: () => {
      // eslint-disable-next-line
      window.open(sharepointUrl, '_blank');
    },
  };

  const documentsControl = !isCustomerRole(permissions) && (
    <Box className={classes.documentInformation}>
      <div className={classes.documentTitle}>
        {formatMessage(messages.siteInformationDocuments)}
      </div>
      <div className={classes.documentView}>
        {propertyExist(() => sharepointUrl) ? (
          <ButtonComponent data-testid="button-view" {...viewLinkAction}>
            {formatMessage(messages.siteInformationView)}
          </ButtonComponent>
        ) : (
          notAvailableData
        )}
      </div>
    </Box>
  );

  const tariffStructureControl = (utilityType, utilityData, tariffData) => {
    const NOT_AVAILABLE = 'Not Available';
    return (
      <div className={classes.controlWrapper}>
        <Typography variant="caption" className={classes.subTitle}>
          {utilityType === 'gas'
            ? formatMessage(messages.siteInformationGasTariffStructure)
            : formatMessage(messages.siteInformationElectricityTariffStructure)}
        </Typography>
        <div className={classes.firstItemTextWrapper}>
          <Typography variant="caption" className={classes.labelSubTitle}>
            {formatMessage(messages.siteInformationUtility)}
          </Typography>
          <Typography variant="body1" data-testid="utility-value">
            {utilityData === NOT_AVAILABLE || null
              ? notAvailableData
              : utilityData}
          </Typography>
        </div>
        <div className={classes.secondaryItemWrapper}>
          <Typography variant="caption" className={classes.labelSubTitle}>
            {formatMessage(messages.siteInformationTariff)}
          </Typography>
          <Typography variant="body1" data-testid="tariff-value">
            {tariffData === NOT_AVAILABLE || null
              ? notAvailableData
              : tariffData}
          </Typography>
        </div>
      </div>
    );
  };
  /**
   * @method locationHasCoordinates
   * Validates if map has valid coordinates to render.
   * @return {boolean}
   */
  const locationHasCoordinates = () =>
    getValueIfExists(() => defaultProps.center.lat, 0) !== 0 &&
    getValueIfExists(() => defaultProps.center.lng, 0) !== 0;

  // Creates Tariff Structure Control
  const {
    gasUtilityId = notAvailableData,
    gasUtilityTariff = notAvailableData,
    electricUtilityId = notAvailableData,
    electricUtilityTariff = notAvailableData,
  } = tariffStructure || {};
  // Wrap all controls to display them
  const contentBody = (
    <>
      <div className={classes.contactInformationWrapper}>
        {addressControl}
        {locationHasCoordinates() ? mapControl : mapNotAvailable}
      </div>
      <div className={classes.siteDetailRowWrapper}>
        {contactInformationControl}
      </div>
      {documentsControl}
      <div className={classes.siteDetailRowWrapper}>
        <span data-testid="gas">
          {tariffStructureControl('gas', gasUtilityId, gasUtilityTariff)}
        </span>
      </div>
      <div className={classes.siteDetailRowWrapper}>
        <span data-testid="electricity">
          {tariffStructureControl(
            'electricity',
            electricUtilityId,
            electricUtilityTariff
          )}
        </span>
      </div>
      {renderMapModal()}
    </>
  );

  return (
    <div className={classes.wrapper}>
      <Panel title={deviceStatusTitle} content={contentBody} />
    </div>
  );
}

SiteInformation.propTypes = {
  intl: PropTypes.any.isRequired,
  siteState: PropTypes.object,
  permissions: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { site: siteState } = state.sites;
  const { permissions } = state.user;
  return { siteState, permissions };
};

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(connect(mapStateToProps)(SiteInformation));
/* eslint-enable */

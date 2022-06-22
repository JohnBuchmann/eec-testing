import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import SiteCard from 'Containers/SitesPage/SiteCard';
import { getSiteMapPinIcon } from 'Utils/enums/site';

const LocationPin = (props) => {
  const { site, displayCard } = props;

  const useStyles = makeStyles({
    pinContainer: {
      height: '50px',
      width: '37px',
      marginLeft: '-18.5px',
      marginTop: '-50px',
      cursor: 'pointer',
      position: 'relative',
    },
    pinCardContainer: {
      marginLeft: '-18.5px',
      marginTop: '-150px',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 9999999,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.pinContainer}>
      {site && displayCard === `site-pin-${site.siteId}` && (
        <div className={classes.pinCardContainer}>
          <SiteCard
            data-testid="content-siteCard"
            site={site}
            key={`site-map-card-${site.siteId}`}
          />
        </div>
      )}
      <img src={getSiteMapPinIcon(site)} alt="" />
    </div>
  );
};

LocationPin.propTypes = {
  site: PropTypes.object,
  displayCard: PropTypes.string,
};

export default LocationPin;

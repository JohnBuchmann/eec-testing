/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import images from 'Assets/images';
import DrawerComponent from '../Drawer';

/**
 * NavigationDrawer it creates a naviation based on options
 * @param {Object} {location=''} Location to get the current pathname
 */
class NavigationDrawer extends Component {
  render() {
    const { version, location } = this.props;
    const currentPath = location.pathname;
    const options = [
      {
        id: 1,
        selected: currentPath === '/' || currentPath.startsWith('/sites'),
        icon: images.iconSites,
        url: '/',
      },
      {
        id: 2,
        selected: currentPath.startsWith('/reporting'),
        icon: images.reports,
        url: '/reporting',
      },
      {
        id: 3,
        selected: currentPath.startsWith('/settings'),
        icon: images.iconSettings,
        url: '/settings',
      },
    ];

    return <DrawerComponent options={options} version={version} />;
  }
}

NavigationDrawer.propTypes = {
  location: PropTypes.object,
  version: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { location } = state.router;
  return { location };
};
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  {}
)(NavigationDrawer);
/* eslint-enable */

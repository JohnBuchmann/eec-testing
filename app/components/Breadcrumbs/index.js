/**
 *
 * Bradcrumbs
 * Breadcrumb generator
 */

import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import history from 'Utils/history';

const useStyles = makeStyles({
  breadcrumbsWrapper: {
    marginLeft: 'auto !important',
    float: 'right !important',
    '& > ol': {
      display: 'block ruby',
    },
  },
  clickableLink: {
    cursor: 'pointer',
  },
});

/**
 * BreadcrumbsConfiguration wiht an array, last element is recommended to be selected.
 * @param {Object[]{id,name:'',selected}} breadcrumbs Array to display path on this component
 */
const BreadcrumbsComponent = ({ breadcrumbs = [] }) => {
  const classes = useStyles();
  const crumbs = [];
  /**
   * redirectBreadcrumbs
   * Disabled redirect from link and call history to push new route
   * @param {Object} evt receives events from click event
   * @param {String} link receives link for push on history
   */
  const redirectBreadcrumbs = (evt, link) => {
    evt.preventDefault();
    history.push(link);
  };

  if (Object.keys(breadcrumbs).length > 0) {
    Object.keys(breadcrumbs).forEach((crumb) => {
      const element = breadcrumbs[`${crumb}`];
      const { id, name, selected, link = '' } = element;
      const linkToRedirect = `/${link}`;
      let component = null;
      if (selected) {
        component = (
          <Typography key={id} color="inherit">
            {name}
          </Typography>
        );
      } else {
        component = (
          <Link
            key={id}
            onClick={(event) => redirectBreadcrumbs(event, linkToRedirect)}
            href={linkToRedirect}
            color="primary"
            className={classes.clickableLink}
            data-testid={id}
          >
            {name}
          </Link>
        );
      }
      crumbs.push(component);
    });
  }

  return (
    <Breadcrumbs className={classes.breadcrumbsWrapper}>{crumbs}</Breadcrumbs>
  );
};

BreadcrumbsComponent.propTypes = {
  breadcrumbs: PropTypes.array,
};

export default BreadcrumbsComponent;
